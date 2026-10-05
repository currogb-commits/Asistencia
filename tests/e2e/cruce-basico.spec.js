const { test, expect } = require('@playwright/test');
const fs = require('node:fs');
const path = require('node:path');
const { pathToFileURL } = require('node:url');

const HTML_PATH = path.resolve(__dirname, '../../Asistencia.html');
const APP_URL = pathToFileURL(HTML_PATH).href;

const CUADRANTE_PATH = path.resolve(__dirname, '../fixtures/caso-basico-cuadrante.txt');
const AVAYA_PATH = path.resolve(__dirname, '../fixtures/caso-basico-avaya.txt');

test.describe('Cruce Básico Avaya / Cuadrante', () => {
  test('debe procesar el caso básico y mostrar contadores y detalle esperados sin errores JS', async ({ page }) => {
    const pageErrors = [];
    const consoleErrors = [];

    // Capturar errores no controlados y mensajes de consola
    page.on('pageerror', (error) => {
      pageErrors.push(error.message || String(error));
    });

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    // 1. Asegurar estado limpio de localStorage antes de cargar y abrir Asistencia.html
    await page.addInitScript(() => {
      localStorage.clear();
    });

    await page.goto(APP_URL);

    // 2. Leer fixtures desde disco y rellenar textareas
    const cuadranteText = fs.readFileSync(CUADRANTE_PATH, 'utf8');
    const avayaText = fs.readFileSync(AVAYA_PATH, 'utf8');

    await page.locator('#raw-cuadrante').fill(cuadranteText);
    await page.locator('#raw-avaya').fill(avayaText);

    // 3. Fijar hora de consulta en 10:30 y marcar como manual
    await page.locator('#hora-consulta').fill('10:30');
    await page.locator('#hora-consulta').dispatchEvent('change');
    await expect(page.locator('#hora-consulta')).toHaveValue('10:30');

    // 4. Ejecutar cruce mediante el botón .btn-process
    await page.locator('.btn-process').click();

    // 5. Esperar fin del procesamiento asíncrono observando cambios en el DOM
    await expect(page.locator('#s-total')).toHaveText('4');
    await expect(page.locator('#tabla-res tbody tr')).toHaveCount(4);

    // VALIDACIONES DE CONTADORES
    await expect(page.locator('#s-total')).toHaveText('4');
    await expect(page.locator('#s-pres')).toHaveText('1');
    await expect(page.locator('#s-aus')).toHaveText('1');
    await expect(page.locator('#s-sup')).toHaveText('1');
    await expect(page.locator('#s-gts')).toHaveText('1');
    await expect(page.locator('#s-exc')).toHaveText('0');

    // VALIDACIÓN DE DETALLE
    // 1001 Ana Gestora: presente
    const filaAna = page.locator('#tabla-res tbody tr', { hasText: '1001' });
    await expect(filaAna).toContainText('Ana Gestora');
    await expect(filaAna).toContainText(/presente/i);

    // 1002 Luis Ausente: ausencia
    const filaLuis = page.locator('#tabla-res tbody tr', { hasText: '1002' });
    await expect(filaLuis).toContainText('Luis Ausente');
    await expect(filaLuis).toContainText(/ausencia/i);

    // 8809 Supervisora Uno: supervisor presente
    const filaSup = page.locator('#tabla-res tbody tr', { hasText: '8809' });
    await expect(filaSup).toContainText('Supervisora Uno');
    await expect(filaSup).toContainText(/supervisor/i);
    await expect(filaSup).toContainText(/logado/i);

    // 2001 Gema GTS: línea GTS
    const filaGts = page.locator('#tabla-res tbody tr', { hasText: '2001' });
    await expect(filaGts).toContainText('Gema GTS');
    await expect(filaGts).toContainText(/l[íi]nea gts/i);

    // ERRORES: verificación de ausencia de errores JavaScript inesperados
    expect(pageErrors, `Se detectaron errores no controlados (pageerror): ${pageErrors.join(' | ')}`).toEqual([]);
    expect(consoleErrors, `Se detectaron mensajes de error en consola: ${consoleErrors.join(' | ')}`).toEqual([]);
  });
});
