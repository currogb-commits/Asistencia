// Responsabilidad: reglas de negocio, calculos y transformaciones del dominio.

function obtenerCodigoAusencia(tipo) {
    const found = g_tiposAusencia.find(item => item.tipo === tipo);
    return found ? found.codigo : tipo;
}

function buscarPersonaMaestro(query) {
    const q = String(query || '').toLowerCase().trim();
    if (!q) return [];
    const resultados = [];
    for (const persona of g_personalMaestro) {
        const pin = String(persona.pin || '');
        const nombre = String(persona.nombre || '').toLowerCase();
        if (pin.includes(q) || nombre.includes(q)) {
            resultados.push(persona);
        }
    }
    resultados.sort((a, b) => {
        if (a.activo !== b.activo) return a.activo ? -1 : 1;
        const cmp = a.nombre.localeCompare(b.nombre, 'es');
        return cmp !== 0 ? cmp : a.pin.localeCompare(b.pin, 'es');
    });
    return resultados.slice(0, 8);
}
