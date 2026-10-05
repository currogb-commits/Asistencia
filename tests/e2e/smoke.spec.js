const { test, expect } = require('@playwright/test');

test.describe('Playwright Smoke Test Sintético - DevStation', () => {
  test('debe inicializar el navegador y verificar contenido HTML en memoria', async ({ page }) => {
    // Prueba 100% sintética y aislada: sin acceso a red, sin backend externo, sin datos reales.
    await page.setContent(`
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <title>DevStation Playwright Smoke Test</title>
      </head>
      <body>
        <main>
          <h1>DevStation E2E Testing</h1>
          <p id="smoke-status">Entorno de pruebas operativo</p>
          <button id="btn-verificar">Verificar</button>
        </main>
      </body>
      </html>
    `);

    // Validar título del documento
    const title = await page.title();
    expect(title).toBe('DevStation Playwright Smoke Test');

    // Validar encabezado principal
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    await expect(heading).toHaveText('DevStation E2E Testing');

    // Validar estado del smoke test
    const status = page.locator('#smoke-status');
    await expect(status).toBeVisible();
    await expect(status).toHaveText('Entorno de pruebas operativo');

    // Validar elemento interactivo
    const button = page.locator('#btn-verificar');
    await expect(button).toBeVisible();
    await expect(button).toBeEnabled();
  });
});
