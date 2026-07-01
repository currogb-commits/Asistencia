# AGENTS.md

## Objetivo del proyecto

Este proyecto debe mantenerse estable, legible y fácil de mantener.

La prioridad es NO romper funcionalidades existentes.

---

## Flujo obligatorio de trabajo

Para cualquier solicitud:

1. Analizar el proyecto y los archivos relevantes.
2. Explicar el plan antes de modificar código.
3. Esperar aprobación si el cambio afecta a varios archivos, introduce funcionalidad nueva, modifica arquitectura o puede alterar comportamiento existente.
4. Realizar cambios pequeños y controlados.
5. Verificar que la funcionalidad existente se mantiene.
6. Resumir los cambios realizados.
7. Mostrar el diff.
8. Esperar autorización antes de cualquier commit.

---

## Principio de mínima modificación

Ante varias soluciones válidas, se elegirá la que modifique menos código, afecte a menos archivos y conserve mejor la estructura existente.

---

## Forma de trabajar

Antes de modificar código:

1. Analiza los archivos necesarios.
2. Explica el plan de cambios.
3. Espera confirmación antes de modificar varios archivos.

---

## Cambios

- Realiza cambios pequeños.
- Modifica únicamente los archivos necesarios.
- Conserva el comportamiento existente salvo que se solicite lo contrario.
- No reestructures grandes bloques de código sin autorización.

---

## Calidad

Antes de terminar:

- Comprueba que el código mantiene la funcionalidad.
- Evita duplicar código.
- Mantén nombres descriptivos.
- Añade comentarios únicamente cuando aporten valor.

---

## Git

Nunca hagas commits automáticamente.

Al finalizar:

1. Resume los cambios.
2. Muestra el diff.
3. Espera confirmación antes de cualquier commit.

---

## Arquitectura

La arquitectura objetivo está documentada en:

- docs/arquitectura.md

Cualquier cambio importante debe respetar esa arquitectura.

---

## Documentación

Cuando se añada una funcionalidad nueva:

- Actualizar README.md si afecta al uso.
- Actualizar CHANGELOG.md.
- Documentar decisiones importantes en docs/.

---

## Regla principal

Si existe alguna duda sobre un cambio, preguntar antes de modificar.

---

## Flujo obligatorio

Para cualquier solicitud:

1. Analizar el proyecto.
2. Explicar el plan.
3. Esperar aprobación si el cambio es importante.
4. Realizar los cambios.
5. Verificar que no se rompe funcionalidad existente.
6. Mostrar un resumen.
7. Mostrar el diff.
8. Esperar autorización antes de cualquier commit.
