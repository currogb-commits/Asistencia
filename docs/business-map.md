# Mapa del nucleo de negocio

Documento de analisis para el sprint V6.4.2. Su objetivo es identificar las funciones clasificadas como negocio, sus dependencias actuales y su ubicacion futura probable dentro de la arquitectura JavaScript.

No implica cambios de codigo ni movimiento de funciones.

---

## Criterio de riesgo

- **Bajo:** funcion pequena, con pocas dependencias y sin impacto directo sobre el cruce principal.
- **Medio:** funcion con estado global o usada por flujos relevantes, pero acotada.
- **Alto:** funcion critica, mezcla varias responsabilidades o afecta directamente al cruce, Control Diario o estructura central de datos.

---

## Resumen

| Funcion | Depende del DOM | Depende de localStorage | Riesgo | Archivo futuro |
|---|---|---|---|---|
| `construirDetalleAusenciasOperacionPorFranja` | No | No | Medio | `js/business.js` |
| `generarControlDiario` | Si | No | Alto | `js/business.js` |
| `buscarPersonaMaestro` | No | No | Medio | `js/business.js` |
| `editarPersonaMaestro` | No | Indirecta | Medio | `js/business.js` |
| `eliminarPersonaMaestro` | No | Indirecta | Medio | `js/business.js` |
| `construirRosterDesdeCuadrante` | No | No | Medio | `js/business.js` |
| `buscarEmpleadoAgenda` | No | No | Medio | `js/business.js` |
| `procesarCruce` | Si | No | Alto | `js/business.js` |
| `calcularOcupacionIndiv` | No | No | Medio | `js/business.js` |
| `guardarHistorial` | No | No | Medio | `js/business.js` |
| `construirMapaControlDiarioPorHora` | No | No | Medio | `js/business.js` |
| `prepararFilasControlDiarioParaExcel` | No | No | Medio | `js/business.js` |
| `analizarPlantillaControlDiario` | No | No | Medio | `js/business.js` |
| `detectarMapaPlantillaControlDiario` | No | No | Medio | `js/business.js` |
| `obtenerCodigoAusencia` | No | No | Bajo | `js/business.js` |
| `buscarIncidenciaActiva` | No | No | Medio | `js/business.js` |
| `clasificarIncidenciasAgenda` | No | No | Medio | `js/business.js` |

---

## Detalle por funcion

### `construirDetalleAusenciasOperacionPorFranja`

- **Responsabilidad:** agrupar ausencias de operacion por franja horaria para Control Diario.
- **Quien la llama:** `generarControlDiario`.
- **Variables globales:** `g_diarioOperativo`.
- **Funciones auxiliares:** `generarSlotsControlDiarioPlantilla`, `obtenerInicioTurnoDesdeHorario`, `redondearHoraAFranjaControlDiario`, `obtenerCodigoAusencia`, `extraerRangoTurnoDesdeHorario`, `formatearDetalleAusenciaOperacionControlDiario`.
- **Depende del DOM:** No.
- **Depende de localStorage:** No.
- **Riesgo:** Medio.
- **Archivo futuro:** `js/business.js`.

### `generarControlDiario`

- **Responsabilidad:** construir `g_controlDiario` a partir del Diario Operativo, ocupacion, entradas, salidas e incidencias.
- **Quien la llama:** `abrirModalControlDiario`.
- **Variables globales:** `g_diarioOperativo`, `g_controlDiario`, `g_incidencias`, `g_ocupacion`, `g_entradas`, `g_salidas`, `g_wp`.
- **Funciones auxiliares:** `normalizarHoraCruce`, `generarSlotsControlDiarioPlantilla`, `construirDetalleAusenciasOperacionPorFranja`, `obtenerCodigoAusencia`, `incidenciaActivaEnFranja`, `buscarValorPorHora`.
- **Depende del DOM:** Si, lee `hora-consulta` cuando no hay hora en `g_diarioOperativo`.
- **Depende de localStorage:** No.
- **Riesgo:** Alto.
- **Archivo futuro:** `js/business.js`, aunque antes conviene desacoplar la lectura del DOM.

### `buscarPersonaMaestro`

- **Responsabilidad:** buscar personas en la plantilla maestra por PIN o nombre.
- **Quien la llama:** `buscarEmpleadoAgenda`.
- **Variables globales:** `g_personalMaestro`.
- **Funciones auxiliares:** ninguna.
- **Depende del DOM:** No.
- **Depende de localStorage:** No.
- **Riesgo:** Medio.
- **Archivo futuro:** `js/business.js`.

### `editarPersonaMaestro`

- **Responsabilidad:** actualizar datos de una persona existente en la plantilla maestra.
- **Quien la llama:** no se detectan llamadas directas actuales en `Asistencia.html`.
- **Variables globales:** `g_personalMaestro`.
- **Funciones auxiliares:** `guardarPersonalMaestro`.
- **Depende del DOM:** No.
- **Depende de localStorage:** Indirectamente, mediante `guardarPersonalMaestro`.
- **Riesgo:** Medio.
- **Archivo futuro:** `js/business.js`.

### `eliminarPersonaMaestro`

- **Responsabilidad:** eliminar una persona de la plantilla maestra por PIN.
- **Quien la llama:** no se detectan llamadas directas actuales en `Asistencia.html`.
- **Variables globales:** `g_personalMaestro`.
- **Funciones auxiliares:** `guardarPersonalMaestro`.
- **Depende del DOM:** No.
- **Depende de localStorage:** Indirectamente, mediante `guardarPersonalMaestro`.
- **Riesgo:** Medio.
- **Archivo futuro:** `js/business.js`.

### `construirRosterDesdeCuadrante`

- **Responsabilidad:** parsear el texto del cuadrante y construir un roster operativo por PIN.
- **Quien la llama:** `abrirModalIncidencias`.
- **Variables globales:** `g_rosterByPin`, `g_rosterList`.
- **Funciones auxiliares:** ninguna.
- **Depende del DOM:** No.
- **Depende de localStorage:** No.
- **Riesgo:** Medio.
- **Archivo futuro:** `js/business.js`, y a futuro podria separarse como parser de cuadrante.

### `buscarEmpleadoAgenda`

- **Responsabilidad:** buscar empleados para la agenda combinando plantilla maestra y roster del cuadrante.
- **Quien la llama:** evento `oninput` del campo `inc-buscar-empleado`.
- **Variables globales:** `g_rosterByPin`, `g_rosterList`.
- **Funciones auxiliares:** `buscarPersonaMaestro`.
- **Depende del DOM:** No directamente, aunque se invoca desde un evento HTML inline.
- **Depende de localStorage:** No.
- **Riesgo:** Medio.
- **Archivo futuro:** `js/business.js`.

### `procesarCruce`

- **Responsabilidad:** ejecutar el cruce principal entre cuadrante y Avaya, calcular estados, contadores, filas de tabla y Diario Operativo.
- **Quien la llama:** `animarYCruzar`.
- **Variables globales:** `PIN_SUPERVISORES`, `g_wp`, `g_entradas`, `g_salidas`, `g_ocupacion`, `g_diarioOperativo`, `g_incidencias`.
- **Funciones auxiliares:** `timeToMins`, `calcularOcupacionIndiv`, `evaluarTurno`, `buscarIncidenciaActiva`, `formatearIncidenciaParaEstado`, `guardarHistorial`, `filtrar`, `mostrarToast`.
- **Depende del DOM:** Si, lee entradas, actualiza tabla, contadores, botones, buscador y texto de ultimo cruce.
- **Depende de localStorage:** No directamente.
- **Riesgo:** Alto.
- **Archivo futuro:** `js/business.js`, pero no debe moverse hasta aislar parsers, renderizado y estado.

### `calcularOcupacionIndiv`

- **Responsabilidad:** incrementar ocupacion por franjas para un turno individual.
- **Quien la llama:** `procesarCruce`.
- **Variables globales:** `g_ocupacion`.
- **Funciones auxiliares:** `timeToMins`.
- **Depende del DOM:** No.
- **Depende de localStorage:** No.
- **Riesgo:** Medio.
- **Archivo futuro:** `js/business.js`.

### `guardarHistorial`

- **Responsabilidad:** actualizar el historial reciente de cruces.
- **Quien la llama:** `procesarCruce`.
- **Variables globales:** `g_historial`.
- **Funciones auxiliares:** `renderHistorial`.
- **Depende del DOM:** No directamente, pero llama a una funcion de interfaz.
- **Depende de localStorage:** No.
- **Riesgo:** Medio.
- **Archivo futuro:** `js/business.js` o `js/ui.js`; por responsabilidad de estado operativo encaja inicialmente en `js/business.js`, aunque el render deberia separarse.

### `construirMapaControlDiarioPorHora`

- **Responsabilidad:** convertir las columnas del Control Diario en un mapa indexado por hora.
- **Quien la llama:** no se detectan llamadas directas actuales en `Asistencia.html`.
- **Variables globales:** `g_controlDiario`.
- **Funciones auxiliares:** `obtenerCodigoAusencia`, `mostrarToast`.
- **Depende del DOM:** No.
- **Depende de localStorage:** No.
- **Riesgo:** Medio.
- **Archivo futuro:** `js/business.js`, aunque `mostrarToast` deberia inyectarse o moverse fuera.

### `prepararFilasControlDiarioParaExcel`

- **Responsabilidad:** preparar una matriz de filas para copiar o exportar el Control Diario a Excel.
- **Quien la llama:** `copiarTablaExcelControlDiario`.
- **Variables globales:** `g_controlDiario`.
- **Funciones auxiliares:** `obtenerCodigoAusencia`.
- **Depende del DOM:** No.
- **Depende de localStorage:** No.
- **Riesgo:** Medio.
- **Archivo futuro:** `js/business.js` o futuro `js/export.js`; mientras no exista `export`, puede residir en `js/business.js`.

### `analizarPlantillaControlDiario`

- **Responsabilidad:** analizar un workbook Excel y seleccionar hoja/mapa de plantilla.
- **Quien la llama:** `construirMapaPlantillaControlDiario`.
- **Variables globales:** ninguna directa.
- **Funciones auxiliares:** `detectarMapaPlantillaControlDiario`.
- **Depende del DOM:** No.
- **Depende de localStorage:** No.
- **Riesgo:** Medio.
- **Archivo futuro:** `js/business.js` o futuro `js/export.js`.

### `detectarMapaPlantillaControlDiario`

- **Responsabilidad:** detectar cabeceras, columnas y filas horarias dentro de una hoja Excel.
- **Quien la llama:** `analizarPlantillaControlDiario`.
- **Variables globales:** ninguna directa.
- **Funciones auxiliares:** `XLSX.utils.decode_range`, `XLSX.utils.encode_cell`.
- **Depende del DOM:** No.
- **Depende de localStorage:** No.
- **Riesgo:** Medio.
- **Archivo futuro:** `js/business.js` o futuro `js/export.js`.

### `obtenerCodigoAusencia`

- **Responsabilidad:** resolver el codigo asociado a un tipo de ausencia.
- **Quien la llama:** `construirDetalleAusenciasOperacionPorFranja`, `generarControlDiario`, `abrirWhatsApp`, `construirMapaControlDiarioPorHora`, `prepararFilasControlDiarioParaExcel`, `clasificarIncidenciasAgenda`.
- **Variables globales:** `g_tiposAusencia`.
- **Funciones auxiliares:** ninguna.
- **Depende del DOM:** No.
- **Depende de localStorage:** No.
- **Riesgo:** Bajo.
- **Archivo futuro:** `js/business.js`.

### `buscarIncidenciaActiva`

- **Responsabilidad:** encontrar una incidencia aplicable a un PIN en fecha y hora concretas.
- **Quien la llama:** `procesarCruce`.
- **Variables globales:** `g_incidencias`.
- **Funciones auxiliares:** ninguna.
- **Depende del DOM:** No.
- **Depende de localStorage:** No.
- **Riesgo:** Medio.
- **Archivo futuro:** `js/business.js`.

### `clasificarIncidenciasAgenda`

- **Responsabilidad:** clasificar incidencias en activas, proximas, finalizadas, futuras y pasadas.
- **Quien la llama:** `renderIncidencias`.
- **Variables globales:** `g_incidencias`.
- **Funciones auxiliares:** `obtenerEstadoIncidencia`, `obtenerCodigoAusencia`.
- **Depende del DOM:** No.
- **Depende de localStorage:** No.
- **Riesgo:** Medio.
- **Archivo futuro:** `js/business.js`.

---

## Observaciones

- `procesarCruce` es la funcion de mayor riesgo y no deberia moverse hasta separar parseo, calculo y renderizado.
- `generarControlDiario` tambien mezcla negocio con una lectura puntual del DOM, por lo que conviene desacoplarla antes de extraerla.
- `construirRosterDesdeCuadrante` es negocio en el estado actual, pero a medio plazo encaja mejor como parser.
- `prepararFilasControlDiarioParaExcel`, `analizarPlantillaControlDiario` y `detectarMapaPlantillaControlDiario` podrian terminar en un futuro modulo de exportacion o Excel.
- Las primeras candidatas de negocio de menor riesgo son `obtenerCodigoAusencia`, `buscarPersonaMaestro`, `buscarIncidenciaActiva` y `calcularOcupacionIndiv`, siempre de una en una y validando con fixtures.
