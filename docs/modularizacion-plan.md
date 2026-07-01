# Plan de modularizacion JavaScript

Documento de planificacion para el sprint V6.4.6. El objetivo es ordenar la migracion de las funciones que aun permanecen en `Asistencia.html` hacia los modulos JavaScript existentes.

No implica cambios de codigo ni movimiento de funciones.

---

## Criterio de clasificacion

- **Riesgo bajo:** funcion pequena, con dependencias claras y sin impacto directo sobre el cruce principal.
- **Riesgo medio:** funcion con estado global, dependencias de UI o uso en flujos relevantes.
- **Riesgo alto:** funcion critica, acoplada al DOM, al Diario Operativo, al Control Diario o al cruce principal.

---

## Mapa de funciones restantes

| Orden | Funcion | Modulo destino | Riesgo | Dependencias principales |
|---:|---|---|---|---|
| 1 | `horaAMinutos` | `utils.js` | bajo | Ninguna relevante. |
| 2 | `timeToMins` | `utils.js` | bajo | Ninguna relevante. |
| 3 | `normalizarHoraCruce` | `utils.js` | bajo | Ninguna relevante. |
| 4 | `generarSlotsControlDiarioPlantilla` | `utils.js` | bajo | Ninguna relevante. |
| 5 | `redondearHoraAFranjaControlDiario` | `utils.js` | bajo | Ninguna relevante. |
| 6 | `formatearHoraCortaControlDiario` | `utils.js` | bajo | Ninguna relevante. |
| 7 | `mostrarToast` | `ui.js` | bajo | DOM, `document.body`, `setTimeout`. |
| 8 | `actualizarReloj` | `ui.js` | bajo | DOM, `Date`. |
| 9 | `apagarAlarmaVisual` | `ui.js` | bajo | DOM. |
| 10 | `limpiarFormularioPlantilla` | `ui.js` | bajo | DOM. |
| 11 | `seleccionarEmpleadoSugerencia` | `ui.js` | bajo | DOM, `renderSugerenciasAgenda`. |
| 12 | `buscarTabla` | `ui.js` | bajo | DOM, tabla de resultados. |
| 13 | `copiarTexto` | `ui.js` | bajo | DOM, `navigator.clipboard`, `mostrarToast`. |
| 14 | `cerrarDiarioOperativo` | `ui.js` | bajo | DOM. |
| 15 | `formatearIncidenciaParaEstado` | `utils.js` | medio | Usada por `procesarCruce`. |
| 16 | `obtenerEstadoIncidencia` | `utils.js` | bajo | Ninguna relevante. |
| 17 | `buscarValorPorHora` | `utils.js` | medio | `normalizarHoraCruce`. |
| 18 | `extraerRangoTurnoDesdeHorario` | `utils.js` | medio | `normalizarHoraCruce`. |
| 19 | `obtenerInicioTurnoDesdeHorario` | `utils.js` | medio | `normalizarHoraCruce`. |
| 20 | `evaluarTurno` | `utils.js` | medio | `timeToMins`, usada por `procesarCruce`. |
| 21 | `incidenciaActivaEnFranja` | `utils.js` | medio | `horaAMinutos`, usada por `generarControlDiario`. |
| 22 | `formatearDetalleAusenciaOperacionControlDiario` | `utils.js` | medio | `extraerRangoTurnoDesdeHorario`, `formatearHoraCortaControlDiario`. |
| 23 | `iniciarReloj` | `ui.js` | medio | DOM, `actualizarReloj`, `relojInterval`. |
| 24 | `marcarManual` | `ui.js` | medio | DOM, `relojInterval`. |
| 25 | `toggleDarkMode` | `ui.js` | medio | DOM, `localStorage`. |
| 26 | `abrirModalSup` | `ui.js` | bajo | DOM, `renderSupTags`. |
| 27 | `renderSupTags` | `ui.js` | medio | DOM, `PIN_SUPERVISORES`. |
| 28 | `eliminarSupervisor` | `ui.js` | medio | `PIN_SUPERVISORES`, `guardarSupervisores`, `renderSupTags`. |
| 29 | `agregarSupervisor` | `ui.js` | medio | DOM, `PIN_SUPERVISORES`, `guardarSupervisores`, `mostrarToast`. |
| 30 | `iniciarAudio` | `ui.js` | medio | Web Audio API, `audioCtx`. |
| 31 | `hacerBip` | `ui.js` | medio | Web Audio API, `audioCtx`. |
| 32 | `actualizarCountdown` | `ui.js` | bajo | DOM, `alarmEnd`. |
| 33 | `limpiarCaja` | `ui.js` | medio | DOM, `guardarLocal`. |
| 34 | `abrirModalPlantilla` | `ui.js` | medio | DOM, `renderPlantillaOperativa`, `limpiarFormularioPlantilla`. |
| 35 | `editarPlantilla` | `ui.js` | medio | DOM, `g_personalMaestro`. |
| 36 | `renderSugerenciasAgenda` | `ui.js` | medio | DOM, `seleccionarEmpleadoSugerencia`. |
| 37 | `animarYCruzar` | `ui.js` | medio | DOM, `setTimeout`, `procesarCruce`. |
| 38 | `mostrarOcupacion` | `ui.js` | medio | DOM, `g_ocupacion`. |
| 39 | `copiarOcupacion` | `ui.js` | medio | `g_ocupacion`, `navigator.clipboard`, `mostrarToast`, `cerrarModal`. |
| 40 | `filtrar` | `ui.js` | medio | DOM, tabla de resultados. |
| 41 | `sortTable` | `ui.js` | medio | DOM, `sortDir`. |
| 42 | `renderHistorial` | `ui.js` | medio | DOM, `g_historial`. |
| 43 | `abrirModalControlDiario` | `ui.js` | medio | DOM, `generarControlDiario`, `g_controlDiario`. |
| 44 | `copiarTablaExcelControlDiario` | `ui.js` | medio | `prepararFilasControlDiarioParaExcel`, `navigator.clipboard`, `mostrarToast`. |
| 45 | `abrirDiarioOperativo` | `ui.js` | bajo | DOM, `renderDiarioOperativo`. |
| 46 | `renderTipoAusenciaSelect` | `ui.js` | medio | DOM, `g_tiposAusencia`. |
| 47 | `renderTiposAusenciaUI` | `ui.js` | medio | DOM, `g_tiposAusencia`, `escapeHTML`. |
| 48 | `editarTipoAusencia` | `ui.js` | bajo | DOM, `g_tiposAusencia`, `g_tipoAusenciaEditIndex`. |
| 49 | `cancelarEdicionTipo` | `ui.js` | bajo | DOM, `g_tipoAusenciaEditIndex`. |
| 50 | `limpiarFormularioIncidencia` | `ui.js` | bajo | DOM. |
| 51 | `editarIncidencia` | `ui.js` | medio | DOM, `g_incidencias`, `renderTipoAusenciaSelect`. |
| 52 | `renderIncidenciaCard` | `ui.js` | medio | `escapeHTML`, HTML string, callbacks inline. |
| 53 | `editarPersonaMaestro` | `business.js` | medio | `g_personalMaestro`, `guardarPersonalMaestro`. |
| 54 | `eliminarPersonaMaestro` | `business.js` | medio | `g_personalMaestro`, `guardarPersonalMaestro`. |
| 55 | `construirRosterDesdeCuadrante` | `business.js` | medio | `g_rosterByPin`, `g_rosterList`. |
| 56 | `buscarEmpleadoAgenda` | `business.js` | medio | `buscarPersonaMaestro`, `g_rosterByPin`, `g_rosterList`. |
| 57 | `calcularOcupacionIndiv` | `business.js` | medio | `g_ocupacion`, `timeToMins`, usada por `procesarCruce`. |
| 58 | `guardarHistorial` | `business.js` | medio | `g_historial`, `renderHistorial`. |
| 59 | `buscarIncidenciaActiva` | `business.js` | medio | `g_incidencias`, usada por `procesarCruce`. |
| 60 | `clasificarIncidenciasAgenda` | `business.js` | medio | `g_incidencias`, `obtenerEstadoIncidencia`, `obtenerCodigoAusencia`. |
| 61 | `prepararFilasControlDiarioParaExcel` | `business.js` | medio | `g_controlDiario`, `obtenerCodigoAusencia`. |
| 62 | `analizarPlantillaControlDiario` | `business.js` | medio | `detectarMapaPlantillaControlDiario`, workbook Excel. |
| 63 | `detectarMapaPlantillaControlDiario` | `business.js` | medio | `XLSX.utils`, hoja Excel. |
| 64 | `construirMapaControlDiarioPorHora` | `business.js` | medio | `g_controlDiario`, `obtenerCodigoAusencia`, `mostrarToast`. |
| 65 | `construirDetalleAusenciasOperacionPorFranja` | `business.js` | medio | `g_diarioOperativo`, utilidades de hora, `obtenerCodigoAusencia`. |
| 66 | `guardarPlantilla` | `ui.js` | alto | DOM, `g_personalMaestro`, `g_incidencias`, `guardarPersonalMaestro`, render. |
| 67 | `renderPlantillaOperativa` | `ui.js` | alto | DOM, `g_personalMaestro`, `escapeHTML`, callbacks inline. |
| 68 | `eliminarPlantilla` | `ui.js` | alto | DOM, `confirm`, `g_personalMaestro`, `g_incidencias`, storage. |
| 69 | `toggleAlarma` | `ui.js` | alto | DOM, timers, Web Audio, `mostrarToast`. |
| 70 | `abrirWhatsApp` | `ui.js` | alto | DOM, `g_wp`, `g_entradas`, `g_salidas`, `g_diarioOperativo`, `obtenerCodigoAusencia`. |
| 71 | `exportarCSV` | `ui.js` | medio | DOM, `Blob`, `URL`, descarga navegador, `mostrarToast`. |
| 72 | `leerPlantillaControlDiario` | `ui.js` | alto | DOM, `FileReader`, `XLSX`, `construirMapaPlantillaControlDiario`. |
| 73 | `construirMapaPlantillaControlDiario` | `ui.js` | medio | DOM, `g_mapaPlantillaControlDiario`, `analizarPlantillaControlDiario`. |
| 74 | `renderDiarioOperativo` | `ui.js` | medio | DOM, `g_diarioOperativo`. |
| 75 | `restaurarTiposAusenciaDefault` | `ui.js` | medio | `g_tiposAusencia`, `guardarTiposAusencia`, render, `mostrarToast`. |
| 76 | `agregarTipoAusencia` | `ui.js` | alto | DOM, `g_tiposAusencia`, `g_tipoAusenciaEditIndex`, storage, render. |
| 77 | `eliminarTipoAusencia` | `ui.js` | medio | `g_tiposAusencia`, `g_incidencias`, storage, render, `mostrarToast`. |
| 78 | `abrirModalIncidencias` | `ui.js` | alto | DOM, `construirRosterDesdeCuadrante`, renders, fecha actual. |
| 79 | `guardarIncidencia` | `ui.js` | alto | DOM, `g_incidencias`, storage, render, `mostrarToast`. |
| 80 | `eliminarIncidencia` | `ui.js` | medio | `confirm`, `g_incidencias`, storage, render, `mostrarToast`. |
| 81 | `renderIncidencias` | `ui.js` | medio | DOM, `clasificarIncidenciasAgenda`, `renderIncidenciaCard`. |
| 82 | `generarControlDiario` | `business.js` | alto | DOM parcial, `g_diarioOperativo`, `g_controlDiario`, `g_incidencias`, `g_wp`, ocupacion. |
| 83 | `procesarCruce` | `business.js` | alto | DOM, `PIN_SUPERVISORES`, `g_wp`, ocupacion, incidencias, Diario Operativo, UI. |

---

## Funciones que pueden migrarse en bloques

- Utilidades puras sin dependencias: `horaAMinutos`, `timeToMins`, `normalizarHoraCruce`, `generarSlotsControlDiarioPlantilla`, `redondearHoraAFranjaControlDiario`, `formatearHoraCortaControlDiario`.
- Utilidades de horario encadenadas tras migrar `normalizarHoraCruce`: `buscarValorPorHora`, `extraerRangoTurnoDesdeHorario`, `obtenerInicioTurnoDesdeHorario`.
- Interfaz simple de modales y formularios basicos: `actualizarReloj`, `apagarAlarmaVisual`, `limpiarFormularioPlantilla`, `seleccionarEmpleadoSugerencia`, `buscarTabla`, `copiarTexto`, `cerrarDiarioOperativo`.
- Tipos de ausencia de UI, una vez validados storage y render: `renderTipoAusenciaSelect`, `renderTiposAusenciaUI`, `editarTipoAusencia`, `cancelarEdicionTipo`.
- Excel/plantilla, si se decide mantenerlo junto antes de crear `export.js`: `analizarPlantillaControlDiario`, `detectarMapaPlantillaControlDiario`, `construirMapaPlantillaControlDiario`.

---

## Funciones que deben migrarse individualmente

- `formatearIncidenciaParaEstado`.
- `obtenerEstadoIncidencia`.
- `evaluarTurno`.
- `incidenciaActivaEnFranja`.
- `formatearDetalleAusenciaOperacionControlDiario`.
- `toggleDarkMode`.
- `renderSupTags`.
- `eliminarSupervisor`.
- `agregarSupervisor`.
- `iniciarAudio`.
- `hacerBip`.
- `limpiarCaja`.
- `abrirModalPlantilla`.
- `editarPlantilla`.
- `renderSugerenciasAgenda`.
- `animarYCruzar`.
- `mostrarOcupacion`.
- `copiarOcupacion`.
- `filtrar`.
- `sortTable`.
- `renderHistorial`.
- `abrirModalControlDiario`.
- `copiarTablaExcelControlDiario`.
- `abrirDiarioOperativo`.
- `editarPersonaMaestro`.
- `eliminarPersonaMaestro`.
- `construirRosterDesdeCuadrante`.
- `buscarEmpleadoAgenda`.
- `calcularOcupacionIndiv`.
- `guardarHistorial`.
- `buscarIncidenciaActiva`.
- `clasificarIncidenciasAgenda`.
- `prepararFilasControlDiarioParaExcel`.
- `construirMapaControlDiarioPorHora`.
- `construirDetalleAusenciasOperacionPorFranja`.
- `renderDiarioOperativo`.
- `restaurarTiposAusenciaDefault`.
- `eliminarTipoAusencia`.
- `eliminarIncidencia`.
- `renderIncidencias`.
- `renderIncidenciaCard`.

---

## Funciones que no deben tocarse todavia

- `procesarCruce`: funcion critica del cruce principal. Mezcla parseo, calculo, estado global, DOM, tabla y Diario Operativo.
- `generarControlDiario`: depende de estado global amplio y todavia lee el DOM para `hora-consulta`.
- `guardarPlantilla`: combina validacion, DOM, estado, persistencia y render.
- `renderPlantillaOperativa`: genera HTML complejo con callbacks inline y depende de `escapeHTML`.
- `eliminarPlantilla`: combina confirmacion, estado, persistencia y render.
- `toggleAlarma`: mezcla timers, audio, DOM y estado global.
- `abrirWhatsApp`: mezcla calculo operativo, estado global y render en modal.
- `leerPlantillaControlDiario`: combina DOM, lectura de archivos, `FileReader`, `XLSX` y feedback visual.
- `agregarTipoAusencia`: combina validacion, DOM, estado, persistencia y render.
- `abrirModalIncidencias`: orquesta cuadrante, roster, tipos, incidencias, fecha y modal.
- `guardarIncidencia`: combina validacion, DOM, estado, persistencia y render.

---

## Observaciones finales

- La migracion debe continuar de una funcion por cambio cuando exista cualquier dependencia con estado global o DOM.
- Los bloques solo deberian migrarse cuando todas sus funciones tengan riesgo bajo y no dependan de `procesarCruce` ni `generarControlDiario`.
- Antes de tocar funciones relacionadas con el cruce, deben usarse los fixtures de `tests/fixtures` como validacion manual obligatoria.
- La prioridad tecnica sigue siendo separar utilidades, UI simple y negocio auxiliar antes de mover funciones criticas.
