# Dependencias de utilidades puras

Documento de preparacion para el sprint V6.3A. Su objetivo es dejar identificadas las dependencias de las funciones candidatas a utilidades puras antes de extraerlas de `Asistencia.html`.

No implica cambios de codigo ni modifica el comportamiento actual.

---

## Criterio de riesgo

- **Bajo:** funcion aislada, sin estado global, sin DOM y con dependencias simples.
- **Medio:** funcion pura en su logica, pero usada por funciones criticas o dependiente de otra utilidad.
- **Alto:** funcion candidata que participa directamente en flujos criticos o cuya pureza depende del contexto actual.

---

## Mapa de dependencias

| Orden | Funcion | Quien la llama | De que depende | Usos detectados | Riesgo |
|---:|---|---|---|---:|---|
| 1 | `horaAMinutos` | `incidenciaActivaEnFranja` | Ninguna utilidad | 3 | Bajo |
| 2 | `timeToMins` | `evaluarTurno`, `procesarCruce`, `calcularOcupacionIndiv` | Ninguna utilidad | 7 | Bajo |
| 3 | `normalizarHoraCruce` | `buscarValorPorHora`, `extraerRangoTurnoDesdeHorario`, `obtenerInicioTurnoDesdeHorario`, `generarControlDiario` | Ninguna utilidad | 5 | Bajo |
| 4 | `generarSlotsControlDiarioPlantilla` | `construirDetalleAusenciasOperacionPorFranja`, `generarControlDiario` | Ninguna utilidad | 2 | Bajo |
| 5 | `redondearHoraAFranjaControlDiario` | `construirDetalleAusenciasOperacionPorFranja` | Ninguna utilidad | 1 | Bajo |
| 6 | `formatearHoraCortaControlDiario` | `formatearDetalleAusenciaOperacionControlDiario` | Ninguna utilidad | 2 | Bajo |
| 7 | `escapeHTML` | `renderPlantillaOperativa`, `renderTiposAusenciaUI`, `renderIncidenciaCard` | Ninguna utilidad | 15 | Bajo |
| 8 | `formatearIncidenciaParaEstado` | `procesarCruce` | Ninguna utilidad | 2 | Medio |
| 9 | `obtenerEstadoIncidencia` | `clasificarIncidenciasAgenda` | Ninguna utilidad | 1 | Bajo |
| 10 | `buscarValorPorHora` | `generarControlDiario` | `normalizarHoraCruce` | 3 | Medio |
| 11 | `extraerRangoTurnoDesdeHorario` | `formatearDetalleAusenciaOperacionControlDiario`, `construirDetalleAusenciasOperacionPorFranja` | `normalizarHoraCruce` | 2 | Medio |
| 12 | `obtenerInicioTurnoDesdeHorario` | `construirDetalleAusenciasOperacionPorFranja` | `normalizarHoraCruce` | 1 | Medio |
| 13 | `evaluarTurno` | `procesarCruce` | `timeToMins` | 1 | Medio |
| 14 | `incidenciaActivaEnFranja` | `generarControlDiario` | `horaAMinutos` | 1 | Medio |
| 15 | `formatearDetalleAusenciaOperacionControlDiario` | `construirDetalleAusenciasOperacionPorFranja` | `extraerRangoTurnoDesdeHorario`, `formatearHoraCortaControlDiario` | 1 | Medio |

---

## Detalle por funcion

### `horaAMinutos`

- **Responsabilidad:** convertir una hora `HH:mm` en minutos.
- **La llaman:** `incidenciaActivaEnFranja`.
- **Depende de:** ninguna utilidad.
- **Riesgo:** Bajo.
- **Orden recomendado:** 1.

### `timeToMins`

- **Responsabilidad:** convertir una hora `HH:mm` en minutos para calculos de turnos y ocupacion.
- **La llaman:** `evaluarTurno`, `procesarCruce`, `calcularOcupacionIndiv`.
- **Depende de:** ninguna utilidad.
- **Riesgo:** Bajo.
- **Orden recomendado:** 2.

### `normalizarHoraCruce`

- **Responsabilidad:** normalizar una hora a franja `HH:00` o `HH:30`.
- **La llaman:** `buscarValorPorHora`, `extraerRangoTurnoDesdeHorario`, `obtenerInicioTurnoDesdeHorario`, `generarControlDiario`.
- **Depende de:** ninguna utilidad.
- **Riesgo:** Bajo.
- **Orden recomendado:** 3.

### `generarSlotsControlDiarioPlantilla`

- **Responsabilidad:** generar las franjas horarias esperadas para Control Diario.
- **La llaman:** `construirDetalleAusenciasOperacionPorFranja`, `generarControlDiario`.
- **Depende de:** ninguna utilidad.
- **Riesgo:** Bajo.
- **Orden recomendado:** 4.

### `redondearHoraAFranjaControlDiario`

- **Responsabilidad:** redondear una hora a la franja de Control Diario mas cercana.
- **La llaman:** `construirDetalleAusenciasOperacionPorFranja`.
- **Depende de:** ninguna utilidad.
- **Riesgo:** Bajo.
- **Orden recomendado:** 5.

### `formatearHoraCortaControlDiario`

- **Responsabilidad:** formatear una hora sin cero inicial innecesario.
- **La llaman:** `formatearDetalleAusenciaOperacionControlDiario`.
- **Depende de:** ninguna utilidad.
- **Riesgo:** Bajo.
- **Orden recomendado:** 6.

### `escapeHTML`

- **Responsabilidad:** escapar texto antes de insertarlo en HTML.
- **La llaman:** `renderPlantillaOperativa`, `renderTiposAusenciaUI`, `renderIncidenciaCard`.
- **Depende de:** ninguna utilidad.
- **Riesgo:** Bajo.
- **Orden recomendado:** 7.

### `formatearIncidenciaParaEstado`

- **Responsabilidad:** generar el texto de estado para una incidencia aplicada al cruce.
- **La llaman:** `procesarCruce`.
- **Depende de:** ninguna utilidad.
- **Riesgo:** Medio, porque se usa dentro del flujo critico del cruce.
- **Orden recomendado:** 8.

### `obtenerEstadoIncidencia`

- **Responsabilidad:** clasificar una incidencia segun fecha y hora.
- **La llaman:** `clasificarIncidenciasAgenda`.
- **Depende de:** ninguna utilidad.
- **Riesgo:** Bajo.
- **Orden recomendado:** 9.

### `buscarValorPorHora`

- **Responsabilidad:** recuperar un valor de un mapa horario usando una hora normalizada.
- **La llaman:** `generarControlDiario`.
- **Depende de:** `normalizarHoraCruce`.
- **Riesgo:** Medio, porque alimenta datos del Control Diario.
- **Orden recomendado:** 10.

### `extraerRangoTurnoDesdeHorario`

- **Responsabilidad:** extraer un rango de turno desde el texto de horario.
- **La llaman:** `formatearDetalleAusenciaOperacionControlDiario`, `construirDetalleAusenciasOperacionPorFranja`.
- **Depende de:** `normalizarHoraCruce`.
- **Riesgo:** Medio, porque afecta al detalle de ausencias.
- **Orden recomendado:** 11.

### `obtenerInicioTurnoDesdeHorario`

- **Responsabilidad:** obtener la hora de inicio de un turno desde el texto de horario.
- **La llaman:** `construirDetalleAusenciasOperacionPorFranja`.
- **Depende de:** `normalizarHoraCruce`.
- **Riesgo:** Medio, porque afecta a la franja donde se ubican ausencias.
- **Orden recomendado:** 12.

### `evaluarTurno`

- **Responsabilidad:** determinar si un turno esta activo, pasado o futuro.
- **La llaman:** `procesarCruce`.
- **Depende de:** `timeToMins`.
- **Riesgo:** Medio, porque participa directamente en el cruce principal.
- **Orden recomendado:** 13.

### `incidenciaActivaEnFranja`

- **Responsabilidad:** determinar si una incidencia esta activa dentro de una franja.
- **La llaman:** `generarControlDiario`.
- **Depende de:** `horaAMinutos`.
- **Riesgo:** Medio, porque afecta al Control Diario.
- **Orden recomendado:** 14.

### `formatearDetalleAusenciaOperacionControlDiario`

- **Responsabilidad:** construir el texto descriptivo de una ausencia para Control Diario.
- **La llaman:** `construirDetalleAusenciasOperacionPorFranja`.
- **Depende de:** `extraerRangoTurnoDesdeHorario`, `formatearHoraCortaControlDiario`.
- **Riesgo:** Medio, porque combina varias utilidades y afecta al detalle operativo.
- **Orden recomendado:** 15.

---

## Estrategia de extraccion compatible

1. Crear un archivo nuevo para utilidades puras, por ejemplo `js/utils.js`, sin modificar aun la logica de negocio.
2. Extraer una sola funcion por cambio, respetando exactamente nombre, parametros, retorno y comportamiento.
3. Cargar el archivo de utilidades antes del script principal para mantener las funciones disponibles en el ambito global.
4. No convertir inicialmente las funciones a modulos ES ni cambiar llamadas existentes.
5. Tras cada extraccion, ejecutar el caso manual de `tests/fixtures` y comprobar que el cruce basico mantiene los mismos resultados.
6. Para funciones usadas por `procesarCruce`, verificar tambien presentes, ausencias, supervisores, GTS y logados fuera de turno.
7. Para funciones usadas por Control Diario, verificar la apertura del modal, el JSON generado y la copia de tabla Excel.
8. Solo cuando todas las utilidades esten fuera y estables, valorar encapsularlas en un namespace o migrarlas a modulos.

---

## Funciones dudosas como utilidades puras

Las siguientes funciones son puras en su cuerpo actual, pero su contexto de uso exige cautela:

- `formatearIncidenciaParaEstado`: no toca DOM ni estado global, pero su salida se inserta directamente en el estado visual del cruce. Es candidata valida a utilidad, con riesgo medio.
- `obtenerEstadoIncidencia`: no toca DOM ni estado global, pero forma parte de la clasificacion de agenda de incidencias. Es candidata valida a utilidad, con riesgo bajo.
- `escapeHTML`: tecnicamente es una utilidad pura, aunque pertenece al area de interfaz porque prepara contenido para HTML. Es candidata valida a utilidad transversal.

No se detectan funciones de la lista que deban descartarse claramente como utilidades puras. Las funciones que dependen de `g_diarioOperativo`, `g_controlDiario`, `g_incidencias`, `g_tiposAusencia`, DOM o `localStorage` no se consideran utilidades puras para esta fase.
