// Responsabilidad: renderizado, modales, eventos de interfaz y feedback visual.

function cerrarModal(id) { document.getElementById(id).style.display = 'none'; }

function mostrarToast(msg) {
const t = document.createElement('div');
t.className = 'toast'; t.innerText = msg;
document.body.appendChild(t);
setTimeout(() => t.remove(), 3000);
}

function copiarTexto(id) {
navigator.clipboard.writeText(document.getElementById(id).value).then(() => {
mostrarToast("✅ ¡Copiado al portapapeles!");
document.querySelectorAll('.modal-overlay').forEach(m => m.style.display='none');
});
}

function cerrarDiarioOperativo() {
    document.getElementById('modalDiarioOperativo').style.display = 'none';
}
