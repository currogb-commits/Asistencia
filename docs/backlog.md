# Backlog

Este documento recoge la hoja de ruta prevista para estabilizar Asistencia V6 y preparar la transición a V7.

---

## V6.1 - Estabilización

Objetivo: consolidar el estado actual sin modificar la lógica funcional.

- Documentar el funcionamiento básico para usuarios.
- Documentar el estado técnico actual de la aplicación.
- Registrar una hoja de ruta ordenada para la refactorización.
- Mantener `Asistencia.html` sin cambios funcionales.

---

## V6.2 - Extracción de CSS

Objetivo: separar los estilos del archivo principal sin cambiar el comportamiento.

- Crear una carpeta `css`.
- Extraer el bloque de estilos de `Asistencia.html` a un archivo CSS.
- Verificar que la interfaz mantiene el mismo aspecto.
- No modificar la lógica JavaScript.

---

## V6.3 - Utilidades puras

Objetivo: aislar funciones auxiliares que no dependen del DOM.

- Identificar funciones de fechas, horas, formato y normalización.
- Extraerlas de forma controlada cuando sea seguro hacerlo.
- Mantener las mismas entradas y salidas.
- Preparar casos de prueba manuales o fixtures simples.

---

## V6.4 - Parsers

Objetivo: separar el procesamiento de datos pegados desde Avaya y cuadrante.

- Documentar ejemplos reales anonimizados de entrada.
- Aislar el parser de cuadrante.
- Aislar el parser de Avaya.
- Validar que el cruce resultante no cambia.

---

## V6.5 - Diario Operativo

Objetivo: consolidar el Diario Operativo como estructura central de datos.

- Revisar la estructura definida en `docs/arquitectura.md`.
- Asegurar que el resumen, detalle, incidencias, entradas, salidas y ocupación se generan de forma coherente.
- Usar el Diario Operativo como base para informes y futuras exportaciones.

---

## V6.6 - Exportaciones

Objetivo: ordenar las salidas de datos sin duplicar lógica.

- Revisar exportación CSV.
- Revisar copiado para Excel.
- Revisar salidas relacionadas con Control Diario.
- Alimentar las exportaciones desde datos consolidados siempre que sea posible.

---

## V7 - Modularización

Objetivo: convertir Asistencia en una aplicación modular y mantenible.

- Reducir `Asistencia.html` a estructura HTML y carga de recursos.
- Separar JavaScript por responsabilidades.
- Centralizar estado y persistencia.
- Mantener el Diario Operativo como contrato interno principal.
- Conservar el comportamiento existente salvo cambios aprobados expresamente.
