# Asistencia v6

## Descripción

Asistencia es una aplicación web desarrollada para facilitar el trabajo diario de supervisión en un Contact Center.

Su objetivo es automatizar el cruce entre la información de Avaya y el cuadrante de planificación, permitiendo detectar incidencias, controlar la ocupación y generar el Control Diario de forma rápida y fiable.

---

# Objetivos del proyecto

* Automatizar el cruce Avaya / Cuadrante.
* Gestionar incidencias de personal.
* Generar automáticamente el Control Diario.
* Reducir errores manuales.
* Mantener un histórico de incidencias.
* Facilitar la supervisión en tiempo real.

---

# Estado actual

Versión en desarrollo:

**V6 - Refactorización de arquitectura**

Estado:

* Cruce Avaya/Cuadrante: ✔
* Registro de incidencias: ✔
* Control Diario: En mejora continua
* Refactorización: En curso

---

## Estado actual del proyecto

### Arquitectura actual

Asistencia sigue siendo una aplicación web local centrada en `Asistencia.html`, con separación inicial de estilos y primeras utilidades.

Estado arquitectónico actual:

* `Asistencia.html` mantiene la estructura HTML y la lógica principal de JavaScript.
* `css/styles.css` contiene los estilos extraídos del antiguo bloque `<style>`.
* `js/utils.js` contiene la primera utilidad pura extraída: `escapeHTML()`.
* El Diario Operativo continúa siendo la estructura objetivo para consolidar los datos del cruce.
* La lógica funcional principal no se ha reescrito; se está preparando una refactorización incremental y controlada.

### Sprints completados

* **V6.1 - Estabilización:** documentación base, manuales y hoja de ruta.
* **V6.2 - Extracción de CSS:** estilos movidos a `css/styles.css` sin cambiar comportamiento.
* **V6.3A - Preparación de utilidades:** análisis de dependencias documentado en `docs/dependencias-utilidades.md`.
* **V6.3B - Primera extracción de utilidad:** `escapeHTML()` movida a `js/utils.js` manteniendo compatibilidad global.

### Pendiente

* Continuar la extracción gradual de utilidades puras.
* Separar parsers de Avaya y cuadrante.
* Consolidar el Diario Operativo como contrato interno principal.
* Revisar exportaciones para que dependan de datos consolidados.
* Modularizar JavaScript sin romper el flujo actual.
* Completar la validación manual antes de cada commit.

### Estructura actual de carpetas

```
Asistencia/
├── Asistencia.html
├── css/
│   └── styles.css
├── js/
│   └── utils.js
├── docs/
│   ├── arquitectura.md
│   ├── backlog.md
│   ├── dependencias-utilidades.md
│   ├── manual_tecnico.md
│   └── manual_usuario.md
├── tests/
│   └── fixtures/
│       ├── README.md
│       ├── caso-basico-avaya.txt
│       ├── caso-basico-cuadrante.txt
│       └── caso-basico-esperado.md
├── AGENTS.md
├── CHANGELOG.md
└── README.md
```

### Flujo de trabajo con OpenCode

* Leer primero `AGENTS.md` y la documentación relevante.
* Analizar antes de modificar.
* Explicar el plan antes de tocar código.
* Hacer cambios pequeños y controlados.
* No hacer commits automáticamente.
* Mostrar resumen y diff al terminar.
* Esperar autorización antes de cualquier commit.

### Metodología de desarrollo

* Priorizar estabilidad sobre velocidad.
* Mantener el comportamiento existente salvo petición explícita.
* Extraer una pieza cada vez.
* Evitar reestructuraciones grandes.
* Documentar decisiones importantes.
* Usar fixtures manuales para proteger el cruce antes de refactorizar.

### Validación antes de commit

Antes de hacer commit se debe comprobar:

1. Abrir `Asistencia.html` en navegador.
2. Confirmar que no hay errores en consola.
3. Ejecutar el caso manual de `tests/fixtures`.
4. Verificar que el cruce básico mantiene los resultados esperados.
5. Revisar funciones afectadas por el cambio.
6. Revisar `git diff` completo.
7. Confirmar que solo se han modificado los archivos previstos.
8. Hacer commit solo cuando la aplicación esté estable y autorizado.

### Pruebas automatizadas

* Infraestructura de pruebas con **Playwright 1.63.0**.
* Pruebas E2E ubicadas en `tests/e2e/`.
* Comandos disponibles:
  * `npm run test:e2e`
  * `npm run test:e2e:chrome`
  * `npm run test:e2e:edge`
* El primer test automático valida el arranque de `Asistencia.html` sin errores JS.
* Los fixtures manuales Avaya/Cuadrante continúan vigentes y todavía no han sido automatizados.

---

# Estructura del proyecto

```
Asistencia/

├── Asistencia.html
├── css/
├── js/
├── docs/
├── assets/
├── README.md
└── CHANGELOG.md
```

---

# Organización de la documentación

## README.md

Descripción general del proyecto.

## CHANGELOG.md

Historial de versiones.

## docs/manual_usuario.md

Manual de uso para supervisores.

## docs/manual_tecnico.md

Documentación técnica para mantenimiento.

## docs/backlog.md

Listado de tareas pendientes y futuras mejoras.

## docs/arquitectura.md

Descripción de la arquitectura interna.

---

# Normas de desarrollo

1. La aplicación debe funcionar al finalizar cada sesión.
2. Cada mejora irá acompañada de su documentación.
3. Todo cambio importante se realizará en una rama Git.
4. Se realizará un commit únicamente cuando la aplicación esté estable.
5. No se introducirán varias funcionalidades nuevas en un mismo commit.

---

# Próximos objetivos

* Finalizar Control Diario.
* Refactorizar el código en módulos.
* Actualizar el sistema de ayuda.
* Crear el Diario Operativo.
* Mejorar las exportaciones.

---

# Equipo del proyecto

Product Owner

* Curro GB

Arquitectura y asistencia al desarrollo

* ChatGPT

---

Última actualización: Junio de 2026.
