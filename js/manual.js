const MANUAL_TEMAS = [
    '🚀 Primer uso',
    '🕒 Flujo del turno',
    '🖥 Pantalla principal',
    '🔄 Cruce de datos',
    '📋 Panel del turno',
    '👥 Gestión de ausencias',
    '🗂 Centro de incidencias',
    '👤 Plantilla de empleados',
    '💾 Trabajo compartido (BBDD)',
    '📱 WhatsApp',
    '📊 Diario Operativo',
    '📈 Control Diario',
    '❓ Preguntas frecuentes',
    'ℹ Acerca de'
];

let manualTemaActual = 0;

function abrirManual() {
    document.getElementById('modalAyuda').style.display = 'flex';
    renderManualTema(manualTemaActual);
}

function renderManualTema(index) {
    if (index < 0 || index >= MANUAL_TEMAS.length) return;
    manualTemaActual = index;

    const title = document.getElementById('manual-section-title');
    const text = document.getElementById('manual-section-text');
    const prev = document.getElementById('manual-prev');
    const next = document.getElementById('manual-next');

    if (title) title.innerText = MANUAL_TEMAS[index];
    if (text) text.innerText = 'Tema en construcción';
    if (prev) prev.disabled = index === 0;
    if (next) next.disabled = index === MANUAL_TEMAS.length - 1;

    document.querySelectorAll('.manual-menu-item').forEach((button, buttonIndex) => {
        button.classList.toggle('active', buttonIndex === index);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.manual-menu-item').forEach((button) => {
        button.addEventListener('click', () => {
            renderManualTema(Number(button.dataset.manualIndex));
        });
    });

    document.getElementById('manual-prev')?.addEventListener('click', () => {
        renderManualTema(manualTemaActual - 1);
    });

    document.getElementById('manual-next')?.addEventListener('click', () => {
        renderManualTema(manualTemaActual + 1);
    });

    renderManualTema(0);
});
