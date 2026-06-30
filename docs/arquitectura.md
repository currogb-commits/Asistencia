## Diario Operativo

El Diario Operativo será el objeto central de datos del proyecto Asistencia.

Su objetivo es reunir en una única estructura toda la información generada por el cruce diario entre Avaya, cuadrante e incidencias.

Este objeto será la base para:

- Exportación Excel.
- Informes diarios.
- Cuadro de Mandos.
- Histórico de asistencia.

### Estructura prevista

```javascript
const diarioOperativo = {
  metadata: {
    fecha: "",
    horaGeneracion: "",
    version: "v6",
    origen: "Asistencia"
  },

  resumen: {
    planificados: 0,
    presentes: 0,
    ausencias: 0,
    ausenciasJustificadas: 0,
    ausenciasNoJustificadas: 0,
    supervisoresPlanificados: 0,
    supervisoresPresentes: 0,
    supervisoresAusentes: 0,
    gtsPlanificados: 0,
    gtsPresentes: 0,
    logadosFueraTurno: 0
  },

  detalle: [],

  incidenciasDia: [],

  entradas: [],

  salidas: [],

  ocupacion: [],

  snapshot: {
    avaya: null,
    cuadrante: null
  }
};