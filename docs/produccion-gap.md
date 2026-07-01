# Gap real para piloto

Diagnostico del sprint Produccion-01 orientado a poner Asistencia en produccion interna lo antes posible con 1 o 2 companeros.

Objetivo: identificar que ya sirve para piloto, que necesita ajuste minimo antes de compartir, que falta de forma imprescindible y que puede esperar hasta despues del piloto.

No se plantea una V7 perfecta. La prioridad es piloto funcional rapido sin generar deuda tecnica peligrosa.

---

## Criterio practico

- **Ya funciona para piloto:** puede usarse en una prueba interna controlada si se valida manualmente antes.
- **Funciona pero necesita ajuste antes de compartir:** existe y aporta valor, pero conviene corregir o acotar algo para evitar confusion o errores de uso.
- **Falta imprescindible para piloto:** sin esto no deberia compartirse con companeros.
- **Puede esperar hasta despues del piloto:** mejora util, pero no bloquea una prueba controlada.

---

## 1. Ya funciona para piloto

| Area | Estado | Motivo |
|---|---|---|
| Pegado de cuadrante | Ya funciona para piloto | El flujo basico permite pegar datos de PGPlanning en el area correspondiente. |
| Pegado de Avaya | Ya funciona para piloto | El flujo basico permite pegar datos de logados en Avaya. |
| Hora de consulta | Ya funciona para piloto | Permite usar hora real o ajustar manualmente antes del cruce. |
| Cruce Avaya/cuadrante | Ya funciona para piloto | Es la funcionalidad principal y ya tiene un fixture minimo de validacion manual. |
| Indicadores principales | Ya funciona para piloto | Presenta total, presentes, ausencias, supervisores, GTS, fuera de turno y finalizados. |
| Tabla de resultados | Ya funciona para piloto | Permite revisar persona a persona el estado calculado. |
| Filtros y buscador | Ya funciona para piloto | Ayudan a revisar ausencias, presentes, GTS, supervisores o una persona concreta. |
| Ordenacion de tabla | Ya funciona para piloto | Mejora la revision manual sin cambiar el calculo. |
| Gestion local de supervisores | Ya funciona para piloto | Permite adaptar los PINs de supervisores en el navegador del piloto. |
| Registro basico de incidencias | Ya funciona para piloto | Permite crear, editar y eliminar incidencias locales para validar el flujo. |
| Tipos de ausencia configurables | Ya funciona para piloto | Sirve para probar codigos y motivos, siempre que se acuerde una lista inicial. |
| Persistencia local | Ya funciona para piloto | Conserva datos en el navegador, suficiente para una prueba controlada en pocos equipos. |
| Exportacion CSV | Ya funciona para piloto | Puede usarse como salida auxiliar si se valida con un caso real. |
| Informe WhatsApp | Ya funciona para piloto | Puede probarse como salida de comunicacion, pendiente de validar formato real. |
| Ocupacion | Ya funciona para piloto | Puede consultarse y copiarse, siempre contrastando con el calculo manual actual. |
| Checklist piloto | Ya funciona para piloto | Existe una guia concreta para validar antes de compartir. |

---

## 2. Funciona pero necesita ajuste antes de compartir

| Area | Ajuste recomendado | Por que hacerlo antes del piloto |
|---|---|---|
| Ayuda integrada | Alinear textos/version con el estado actual o indicar que es ayuda provisional. | La interfaz muestra referencias antiguas y puede confundir a usuarios nuevos. |
| Version visible | Aclarar version candidata de piloto. | Evita dudas entre V5 visible, V6 documentado y estado real del piloto. |
| Manual de uso | Preparar una guia muy corta de piloto o enlazar el checklist. | Los companeros necesitan saber que probar y que no tocar. |
| Tipos de ausencia | Definir una lista inicial comun antes de entregar. | Evita que cada piloto cree codigos distintos y los resultados no sean comparables. |
| Supervisores | Cargar o revisar la lista inicial de PINs. | Una lista incorrecta altera contadores y confianza en el cruce. |
| Control Diario | Decidir si entra o no entra en el piloto. | Si se enseña sin validar plantilla real, puede generar falsas expectativas. |
| Diario Operativo | Presentarlo como vista tecnica/provisional si se muestra. | Todavia no es el contrato unico para todas las salidas. |
| Exportaciones | Validar CSV/WhatsApp con un caso real antes de pedir feedback. | El piloto debe centrarse en uso operativo, no en detectar formatos obvios. |
| Persistencia local | Avisar claramente que los datos viven en el navegador. | Evita perdida de datos o confusion si cambian de equipo/navegador. |
| Datos de prueba | Preparar 1 caso real anonimizado ademas del fixture basico. | El fixture minimo no cubre suficiente variedad operativa. |

---

## 3. Falta imprescindible para piloto

| Falta | Accion minima necesaria | Criterio de cierre |
|---|---|---|
| Validacion completa previa | Ejecutar `docs/checklist-piloto.md` con fixture y un caso real anonimizado. | Checklist pasado sin errores bloqueantes. |
| Caso real anonimizado | Preparar datos de cuadrante y Avaya de un dia real sin datos sensibles. | El cruce da resultados coherentes revisados manualmente. |
| Instrucciones de entrega | Escribir o comunicar 5-7 pasos claros para el piloto. | El companero puede abrir, pegar, cruzar y revisar sin asistencia constante. |
| Limites conocidos | Indicar que es local, no multiusuario y que usa `localStorage`. | Los pilotos entienden donde se guardan los datos y que no esta sincronizado. |
| Decidir salidas incluidas | Confirmar si se prueban WhatsApp, CSV, Control Diario y Diario Operativo. | No se evalua como fallo una salida que queda fuera del piloto. |
| Canal de feedback | Definir como reportar errores: captura, hora usada, datos pegados y resultado esperado. | Cada incidencia recibida es reproducible o al menos diagnosticable. |
| Copia limpia de entrega | Probar la carpeta/archivo que se va a compartir fuera del entorno de desarrollo. | La copia abre en navegador y carga CSS/JS correctamente. |
| Comprobacion de consola | Abrir con DevTools y confirmar que no hay errores al cargar ni al cruzar. | Sin errores JavaScript bloqueantes. |

---

## 4. Puede esperar hasta despues del piloto

| Area | Motivo para posponer |
|---|---|
| Refactorizacion grande de `procesarCruce()` | Es el nucleo estable; tocarlo ahora aumenta riesgo antes del piloto. |
| Refactorizacion de `generarControlDiario()` | Importante a medio plazo, pero no bloquea si Control Diario se acota o se valida manualmente. |
| Modularizacion completa V7 | No aporta valor inmediato al piloto y puede introducir regresiones. |
| Separacion completa de parsers | Deseable para mantenimiento, no imprescindible para probar con 1 o 2 usuarios. |
| Multiusuario | El piloto puede ser local y controlado. Compartir datos vendra despues si el flujo se valida. |
| Auditoria y roles | No necesarios para una prueba interna pequena. |
| Pruebas automaticas | Valiosas, pero el piloto rapido puede apoyarse en checklist y fixtures manuales. |
| Cuadro de mandos | Previsto por arquitectura, pero no necesario para validar el cruce diario. |
| Exportacion completa de paquete diario | Puede definirse despues de confirmar que salidas actuales son utiles. |
| Redisenar interfaz | Solo corregir textos/confusiones; no redisenar antes del piloto. |
| Importacion/exportacion completa de configuracion | Util para produccion amplia, pero puede esperar si el piloto usa 1 o 2 equipos preparados. |

---

## Las 10 tareas de mayor impacto para ponerlo en piloto cuanto antes

1. **Ejecutar el checklist piloto completo.** Usar `docs/checklist-piloto.md` y registrar si pasa o falla cada bloque.
2. **Validar con el fixture basico.** Confirmar hora `10:30`, total activos `4`, presentes `1`, ausencias `1`, supervisores `1`, GTS `1` y fuera de turno `0`.
3. **Validar con un caso real anonimizado.** Usar datos reales de cuadrante y Avaya para comprobar que el flujo sirve fuera del fixture.
4. **Preparar una copia limpia de entrega.** Abrirla fuera del entorno de desarrollo y confirmar que carga `css/` y `js/`.
5. **Definir el alcance exacto del piloto.** Indicar si se prueban solo cruce/incidencias o tambien WhatsApp, CSV, Control Diario y Diario Operativo.
6. **Ajustar la comunicacion de version/ayuda.** Como minimo, avisar que la ayuda integrada puede estar desactualizada si no se cambia antes.
7. **Preparar lista inicial de supervisores y tipos de ausencia.** Evita configuraciones distintas entre pilotos.
8. **Documentar limites conocidos en el mensaje de entrega.** Local, sin multiusuario, datos en navegador y formatos esperados de entrada.
9. **Definir plantilla de feedback.** Pedir hora usada, datos pegados, captura, resultado observado y resultado esperado.
10. **Congelar cambios de refactorizacion hasta terminar el piloto.** Solo corregir bugs bloqueantes o textos que impidan usar la herramienta.

---

## Riesgos principales

- **Resultados incorrectos por formato de entrada distinto.** Mitigacion: probar con un caso real anonimizado antes de compartir.
- **Confusion por version/textos antiguos.** Mitigacion: aclararlo en la entrega o actualizar textos antes del piloto.
- **Perdida o aislamiento de datos por `localStorage`.** Mitigacion: avisar que cada navegador guarda sus propios datos.
- **Supervisores o tipos mal configurados.** Mitigacion: entregar una configuracion inicial o instrucciones claras.
- **Control Diario no validado al 100%.** Mitigacion: dejarlo fuera del alcance o marcarlo como salida en validacion.
- **Feedback poco reproducible.** Mitigacion: usar una plantilla de reporte simple.
- **Introducir regresiones por seguir refactorizando.** Mitigacion: congelar cambios no necesarios durante el piloto.

---

## Criterios minimos para decir: se puede probar con 1 o 2 companeros

Se puede compartir como piloto si se cumplen todos estos puntos:

- [ ] La aplicacion abre en navegador sin errores visibles.
- [ ] No hay errores JavaScript bloqueantes al cargar.
- [ ] El fixture basico da los resultados esperados.
- [ ] Un caso real anonimizado da resultados coherentes segun revision manual.
- [ ] Se puede crear, editar y eliminar una incidencia de prueba.
- [ ] La aplicacion sigue funcionando tras recargar navegador.
- [ ] La salida incluida en el piloto funciona: WhatsApp, CSV, Control Diario o la que se decida.
- [ ] Los pilotos conocen las limitaciones: uso local, sin sincronizacion y datos en navegador.
- [ ] Hay una forma clara de reportar errores.
- [ ] No hay cambios de refactorizacion pendientes sin validar.

No deberia compartirse si ocurre cualquiera de estos puntos:

- El cruce no genera tabla con datos validos.
- Los contadores principales son incoherentes en el fixture basico.
- Las incidencias fallan al guardar o rompen el cruce.
- Hay errores JavaScript bloqueantes en carga o cruce.
- No esta claro que deben probar los companeros.

---

## Recomendacion de siguiente sprint

**Sprint Piloto-01: Cierre de candidata piloto.**

Alcance recomendado:

1. Ejecutar checklist piloto completo.
2. Validar fixture basico y un caso real anonimizado.
3. Preparar copia limpia de entrega.
4. Definir alcance del piloto y limites conocidos.
5. Ajustar solo textos o documentacion imprescindible para no confundir.
6. Congelar refactorizaciones hasta recibir feedback.

No incluir en este sprint:

- Reescritura de `procesarCruce()`.
- Reescritura de `generarControlDiario()`.
- Modularizacion grande.
- Nuevas funcionalidades no necesarias para probar el flujo real.

Conclusion: Asistencia esta cerca de poder probarse con 1 o 2 companeros. Lo que falta no es construir V7, sino cerrar validacion, alcance, comunicacion y entrega limpia.
