# Caso basico esperado

## Condiciones de ejecucion

- Hora del cruce: `10:30`.
- Sin incidencias registradas para las personas del caso.
- PIN `8809` incluido en la lista de supervisores.
- Los datos de cuadrante y Avaya se copian desde los fixtures de este directorio.

## Resultado esperado

- Total activos: 4.
- Presentes: 1.
- Ausencias: 1.
- Supervisores: 1.
- GTS: 1.
- Logados fuera de turno: 0.

## Detalle esperado

- `1001` Ana Gestora: presente.
- `1002` Luis Ausente: ausencia.
- `8809` Supervisora Uno: supervisor presente.
- `2001` Gema GTS: linea GTS.

## Notas

La persona GTS se considera Linea GTS durante la franja activa y no debe contar como ausencia aunque no aparezca logada en Avaya.
