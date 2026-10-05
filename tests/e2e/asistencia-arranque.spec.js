const { test, expect } = require('@playwright/test');
const path = require('node:path');
const { pathToFileURL } = require('node:url');

const HTML_PATH = path.resolve(__dirname, '../../Asistencia.html');
const APP_URL = pathToFileURL(HTML_PATH).href;

test.describe('Arranque de la aplicación Asistencia', () => {
  test('debe cargar Asistencia.html correctamente sin errores JS y con elementos estructurales en el DOM', async ({ page }) => {
    const pageErrors = [];
    const consoleErrors = [];

    // Capturar errores de script / runtime
    page.on('pageerror', (error) => {
      pageErrors.push(error.message || String(error));
    });

    // Capturar mensajes de error en consola
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    // 1. Navegar a Asistencia.html mediante file://
    await page.goto(APP_URL);

    // 2. Comprobar que el título es exactamente: Control de Asistencia WFM v5.0
    await expect(page).toHaveTitle('Control de Asistencia WFM v5.0');

    // 3. Comprobar que el DOM de la aplicación se ha cargado
    await expect(page.locator('body')).toBeAttached();

    // 4. Comprobar existencia de elementos estructurales reales en el DOM
    await expect(page.locator('#modalAyuda')).toBeAttached();
    await expect(page.locator('#manual-title')).toBeAttached();
    await expect(page.locator('#modalDiarioOperativo')).toBeAttached();
    await expect(page.locator('#modalIncidencias')).toBeAttached();

    // 5. Verificar ausencia de errores de JavaScript o de consola durante el arranque
    expect(pageErrors, `Se detectaron errores no controlados (pageerror): ${pageErrors.join(' | ')}`).toEqual([]);
    expect(consoleErrors, `Se detectaron mensajes de error en consola: ${consoleErrors.join(' | ')}`).toEqual([]);
  });
});
