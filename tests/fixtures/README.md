# Fixtures de pruebas manuales

Estos fixtures sirven como base minima para proteger el cruce Avaya / cuadrante antes de refactorizar la aplicacion.

No son pruebas automaticas. Son datos de referencia ficticios y anonimos para ejecutar una comprobacion manual en `Asistencia.html` y comparar el resultado visible con el resultado esperado.

## Como usarlos

1. Abrir `Asistencia.html` en el navegador.
2. Copiar el contenido de `caso-basico-cuadrante.txt` en el cuadro de cuadrante.
3. Copiar el contenido de `caso-basico-avaya.txt` en el cuadro de Avaya.
4. Ajustar la hora del cruce a `10:30`.
5. Procesar el cruce.
6. Comparar los indicadores y filas resultantes con `caso-basico-esperado.md`.

## Criterio de uso antes de refactorizar

Antes de extraer CSS, utilidades, parsers o logica de negocio, ejecutar este caso manualmente y confirmar que los resultados no cambian.

Si una refactorizacion altera estos resultados sin una decision funcional aprobada, debe considerarse una regresion.
