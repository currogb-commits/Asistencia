function escapeHTML(str) {
    if (!str) return "";
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function horaAMinutos(hora) {
    const [h, m] = String(hora).split(':').map(Number);
    return Number.isFinite(h) && Number.isFinite(m) ? h * 60 + m : 0;
}

function normalizarHoraCruce(hora) {
    const [h, m] = String(hora).split(':').map(Number);
    if (!Number.isFinite(h) || !Number.isFinite(m)) return String(hora).padStart(5, '0');
    const minutos = m < 30 ? 0 : 30;
    return `${String(h).padStart(2, '0')}:${String(minutos).padStart(2, '0')}`;
}

function generarSlotsControlDiarioPlantilla() {
    const slots = [];
    for (let minutos = 6 * 60; minutos <= 23 * 60 + 30; minutos += 30) {
        const h = Math.floor(minutos / 60);
        const m = minutos % 60;
        slots.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`);
    }
    return slots;
}

function redondearHoraAFranjaControlDiario(hora) {
    const match = String(hora || '').trim().match(/^(\d{1,2}):(\d{2})$/);
    if (!match) return null;

    const h = Number(match[1]);
    const m = Number(match[2]);
    if (!Number.isFinite(h) || !Number.isFinite(m)) return null;

    let minutos = h * 60 + m;
    const resto = minutos % 30;

    if (resto > 15) {
        minutos += (30 - resto);
    } else {
        minutos -= resto;
    }

    const hh = Math.floor(minutos / 60) % 24;
    const mm = minutos % 60;
    return `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`;
}

function formatearHoraCortaControlDiario(hora) {
    const match = String(hora || '').trim().match(/^0?(\d{1,2}):(\d{2})$/);
    if (!match) return String(hora || '').trim();
    return `${Number(match[1])}:${match[2]}`;
}

function timeToMins(tStr) {
const [h, m] = tStr.split(':').map(Number);
return h * 60 + m;
}
