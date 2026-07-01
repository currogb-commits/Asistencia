# Manual tecnico

## Estado actual

Asistencia se encuentra en una fase de refactorizacion V6. La aplicacion funciona como una herramienta web local orientada al cruce diario entre cuadrante, datos de Avaya e incidencias registradas por supervision.

Actualmente la aplicacion es monolitica: la estructura HTML, los estilos CSS y la logica JavaScript conviven en un unico archivo principal.

## Archivo principal

`Asistencia.html` es el archivo principal de la aplicacion.

En este archivo se concentran:

- La interfaz de usuario.
- Los estilos visuales.
- La logica de procesamiento.
- La gestion de modales y botones.
- La generacion de resultados y exportaciones.

Por estabilidad, cualquier cambio sobre este archivo debe ser pequeno, controlado y verificado.

## Persistencia local

La aplicacion utiliza `localStorage` para conservar informacion entre sesiones del navegador.

Entre los datos persistidos pueden encontrarse configuraciones, textos pegados, supervisores, tema visual, incidencias u otros datos operativos necesarios para el uso diario.

Antes de cambiar claves de `localStorage`, debe comprobarse si existen datos ya guardados por usuarios.

## Cruce de datos

La funcion `procesarCruce()` es una pieza central del flujo actual.

Su responsabilidad principal es procesar los datos pegados desde el cuadrante y Avaya, calcular estados de presencia, ausencias, logados fuera de turno y actualizar los resultados visibles.

No debe modificarse su comportamiento sin disponer antes de ejemplos de entrada y salida esperada.

## Incidencias

El sistema permite registrar incidencias asociadas a personas, fechas, horarios y tipos de ausencia.

Estas incidencias influyen en la interpretacion del cruce y en la informacion utilizada por el Control Diario y el Diario Operativo.

La gestion de incidencias debe tratarse como parte del dominio funcional, no solo como una pantalla auxiliar.

## Diario Operativo

El Diario Operativo es la estructura objetivo definida en `docs/arquitectura.md`.

Su finalidad es reunir en un unico objeto la informacion generada por el cruce diario: resumen, detalle, incidencias, entradas, salidas, ocupacion y snapshot de datos originales.

La evolucion hacia V7 debe usar el Diario Operativo como base para informes, exportaciones e historico.

## Criterio de mantenimiento

- Priorizar estabilidad sobre reestructuracion.
- Evitar cambios funcionales no solicitados.
- Separar primero documentacion y estilos antes de modificar logica.
- Mantener cambios pequenos y faciles de revisar.
