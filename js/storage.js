// Responsabilidad: persistencia local y acceso a localStorage.

function cargarSupervisores() {
    const saved = localStorage.getItem("wfm_supervisores");
    if (!saved) return [...SUP_DEFAULT];
    try {
        return JSON.parse(saved);
    } catch (err) {
        console.warn("wfm_supervisores corrupto, restaurando valores por defecto", err);
        localStorage.removeItem("wfm_supervisores");
        return [...SUP_DEFAULT];
    }
}
function guardarSupervisores(arr) {
    localStorage.setItem("wfm_supervisores", JSON.stringify(arr));
}

function guardarLocal() {
clearTimeout(guardarLocal._t);
guardarLocal._t = setTimeout(() => {
localStorage.setItem("wfm_cuadrante", document.getElementById("raw-cuadrante").value);
localStorage.setItem("wfm_avaya", document.getElementById("raw-avaya").value);
}, 400);
}

function cargarPersonalMaestro() {
    const guardado = localStorage.getItem('wfm_personal_maestro');
    if (!guardado) {
        g_personalMaestro = [];
        return;
    }
    try {
        const parsed = JSON.parse(guardado);
        if (Array.isArray(parsed)) {
            g_personalMaestro = parsed.map(persona => ({
                pin: String(persona.pin || '').trim(),
                nombre: String(persona.nombre || '').trim(),
                categoria: String(persona.categoria || 'Otros').trim(),
                activo: persona.activo !== false,
                observaciones: String(persona.observaciones || '').trim()
            })).filter(persona => persona.pin && persona.nombre);
        } else {
            g_personalMaestro = [];
        }
    } catch (e) {
        g_personalMaestro = [];
    }
}

function guardarPersonalMaestro() {
    localStorage.setItem('wfm_personal_maestro', JSON.stringify(g_personalMaestro));
}

function inicializarIncidencias() {
    const guardado = localStorage.getItem('wfm_incidencias_v6');
    if (guardado) {
        try { g_incidencias = JSON.parse(guardado); }
        catch(e) { g_incidencias = []; }
    }
}

function guardarIncidenciasLocales() {
    localStorage.setItem('wfm_incidencias_v6', JSON.stringify(g_incidencias));
}

function cargarTiposAusencia() {
    const saved = localStorage.getItem('wfm_tipos_ausencia');
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            if (Array.isArray(parsed) && parsed.every(item => item && typeof item.tipo === 'string' && typeof item.codigo === 'string')) {
                g_tiposAusencia = parsed;
            } else {
                throw new Error('Formato inválido');
            }
        } catch (e) {
            g_tiposAusencia = [...TIPOS_AUSENCIA_DEFAULT];
            guardarTiposAusencia();
        }
    } else {
        g_tiposAusencia = [...TIPOS_AUSENCIA_DEFAULT];
        guardarTiposAusencia();
    }
}

function guardarTiposAusencia() {
    localStorage.setItem('wfm_tipos_ausencia', JSON.stringify(g_tiposAusencia));
}
