const { defineConfig } = require('@playwright/test');

/**
 * Configuración de Playwright para proyectos de DevStation.
 *
 * Características:
 * - Pruebas E2E en ./tests/e2e
 * - Ejecución monohilo (workers: 1) para estabilidad y aislamiento
 * - Informes combinados: list (consola), html (playwright-report) y json (test-results/e2e-report.json)
 * - Captura de evidencias solo ante fallos (screenshot y trace)
 * - Uso de navegadores del sistema instalados en Windows (Chrome y Edge)
 */
module.exports = defineConfig({
  testDir: './tests/e2e',
  timeout: 30000,
  retries: 0,
  workers: 1,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['json', { outputFile: 'test-results/e2e-report.json' }]
  ],
  use: {
    headless: true,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    video: 'off'
  },
  projects: [
    {
      name: 'chrome',
      use: {
        channel: 'chrome'
      }
    },
    {
      name: 'edge',
      use: {
        channel: 'msedge'
      }
    }
  ]
});
