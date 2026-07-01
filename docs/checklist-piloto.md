# Checklist piloto interno

Checklist practico para validar si una version de Asistencia esta lista para ser usada por 1 o 2 companeros en piloto interno.

El objetivo es confirmar que el flujo principal funciona de forma estable. No sustituye una validacion completa de V7.

---

## 1. Preparacion antes de probar

- [ ] Abrir `Asistencia.html` en el navegador previsto para el piloto.
- [ ] Confirmar que la pantalla carga correctamente.
- [ ] Confirmar que no aparecen errores visibles al abrir la aplicacion.
- [ ] Abrir la consola del navegador y confirmar que no hay errores JavaScript al cargar.
- [ ] Tener preparados datos de cuadrante del dia a probar.
- [ ] Tener preparados datos de Avaya del mismo momento de consulta.
- [ ] Confirmar la hora exacta que se usara para el cruce.
- [ ] Si se usan fixtures, tener disponibles los archivos de `tests/fixtures`.
- [ ] Si el piloto debe empezar limpio, limpiar datos previos del navegador o usar un perfil limpio.

---

## 2. Prueba de pegado de cuadrante

- [ ] Pegar los datos del cuadrante en el cuadro correspondiente.
- [ ] Confirmar que el texto queda visible en el campo.
- [ ] Confirmar que el contenido corresponde al equipo y fecha correctos.
- [ ] Confirmar que no se borra al cambiar de campo.
- [ ] Confirmar que no aparecen errores en consola tras pegar.

---

## 3. Prueba de pegado de Avaya

- [ ] Pegar los datos de Avaya en el cuadro correspondiente.
- [ ] Confirmar que el texto queda visible en el campo.
- [ ] Confirmar que los datos corresponden al mismo momento del cuadrante.
- [ ] Confirmar que no se borra al cambiar de campo.
- [ ] Confirmar que no aparecen errores en consola tras pegar.

---

## 4. Prueba de cruce

- [ ] Revisar la hora de consulta antes de cruzar.
- [ ] Ajustar la hora manualmente si es necesario.
- [ ] Pulsar el boton de cruce.
- [ ] Confirmar que se actualizan los indicadores principales.
- [ ] Confirmar que aparece la tabla de resultados.
- [ ] Revisar al menos una persona presente.
- [ ] Revisar al menos una ausencia.
- [ ] Revisar supervisores si existen en el caso probado.
- [ ] Revisar GTS si existen en el caso probado.
- [ ] Revisar logados fuera de turno si existen en el caso probado.
- [ ] Confirmar que no aparecen errores en consola durante el cruce.

---

## 5. Prueba de incidencias

- [ ] Abrir el apartado de incidencias.
- [ ] Crear una incidencia con PIN, empleado, fecha y tipo.
- [ ] Guardar la incidencia.
- [ ] Confirmar que aparece en la lista de incidencias.
- [ ] Editar la incidencia creada.
- [ ] Guardar el cambio y confirmar que se refleja correctamente.
- [ ] Ejecutar de nuevo el cruce si la incidencia afecta al resultado.
- [ ] Confirmar que la incidencia se tiene en cuenta donde corresponda.
- [ ] Eliminar una incidencia de prueba si no debe conservarse.
- [ ] Confirmar que no aparecen errores en consola durante el flujo.

---

## 6. Prueba de exportacion/salida

- [ ] Probar la salida que se usara durante el piloto: WhatsApp, CSV, Control Diario, Diario Operativo o copia para Excel.
- [ ] Confirmar que el boton correspondiente responde.
- [ ] Si se copia texto, pegarlo en un editor externo y comprobar que el contenido es legible.
- [ ] Si se exporta CSV, abrir el archivo generado y comprobar que contiene filas del cruce.
- [ ] Si se usa Control Diario, abrirlo y confirmar que muestra datos coherentes con el cruce.
- [ ] Si se usa Diario Operativo, abrirlo y confirmar que contiene resumen y detalle.
- [ ] Confirmar que no aparecen errores en consola durante la exportacion o copia.

---

## 7. Prueba de recarga del navegador

- [ ] Recargar la pagina.
- [ ] Confirmar que la aplicacion vuelve a abrir sin errores visibles.
- [ ] Confirmar que no aparecen errores en consola tras recargar.
- [ ] Confirmar si los datos esperados se conservan segun el uso de `localStorage`.
- [ ] Confirmar que las incidencias guardadas siguen disponibles si deben persistir.
- [ ] Ejecutar de nuevo un cruce basico tras recargar.
- [ ] Confirmar que el resultado sigue siendo coherente.

---

## 8. Resultado esperado

Para considerar valida la prueba:

- [ ] La aplicacion abre correctamente en navegador.
- [ ] No hay errores JavaScript bloqueantes en consola.
- [ ] El cuadrante se puede pegar y conservar durante la sesion.
- [ ] Avaya se puede pegar y conservar durante la sesion.
- [ ] El cruce genera indicadores y tabla de resultados.
- [ ] Los resultados principales son coherentes con los datos usados.
- [ ] Las incidencias se pueden crear, editar y eliminar.
- [ ] Las salidas necesarias para el piloto funcionan.
- [ ] Tras recargar, la aplicacion sigue funcionando.
- [ ] El usuario piloto puede completar el flujo sin ayuda tecnica constante.

Si se usan los fixtures basicos, el resultado esperado es:

- Hora del cruce: `10:30`.
- Total activos: `4`.
- Presentes: `1`.
- Ausencias: `1`.
- Supervisores: `1`.
- GTS: `1`.
- Logados fuera de turno: `0`.

---

## 9. Criterio para decidir si la version piloto esta lista

La version piloto esta lista si se cumplen todas estas condiciones:

- [ ] El flujo principal de pegado, cruce y revision funciona sin errores bloqueantes.
- [ ] Las incidencias funcionan al menos en el caso basico de crear, editar y eliminar.
- [ ] La salida principal que usaran los pilotos funciona correctamente.
- [ ] La aplicacion sigue funcionando tras recargar el navegador.
- [ ] Las limitaciones conocidas estan claras para los usuarios piloto.
- [ ] No hay errores criticos en consola durante el uso normal.

No debe entregarse como piloto si ocurre cualquiera de estos casos:

- El cruce no genera resultados.
- La tabla de resultados queda vacia con datos validos.
- Los indicadores principales son incoherentes con el caso probado.
- Las incidencias no se guardan o provocan errores.
- La salida principal del piloto no funciona.
- Hay errores JavaScript que bloquean el uso normal.

Si aparece un problema no bloqueante, se puede entregar solo si queda documentado como limitacion conocida y no afecta al flujo principal del piloto.
