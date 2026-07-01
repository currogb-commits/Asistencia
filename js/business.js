// Responsabilidad: reglas de negocio, calculos y transformaciones del dominio.

function obtenerCodigoAusencia(tipo) {
    const found = g_tiposAusencia.find(item => item.tipo === tipo);
    return found ? found.codigo : tipo;
}
