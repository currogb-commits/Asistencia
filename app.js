// ============================================================
// LISTA DE SUPERVISORES (editable desde UI, persistida en localStorage)
// ============================================================
const SUP_DEFAULT = ["8809","8802","8806","8804","8818","8805","8817","8822","8814","8819","8816","8815","8826","8811","8813","8807","8808","8810"];

function cargarSupervisores() {
const saved = localStorage.getItem("wfm_supervisores");
return saved ? JSON.parse(saved) : [...SUP_DEFAULT];
}
function guardarSupervisores(arr) {
localStorage.setItem("wfm_supervisores", JSON.stringify(arr));
}
let PIN_SUPERVISORES = cargarSupervisores();

// ============================================================
// ESTADO GLOBAL
// ============================================================
// ⚠️ CORRECCIÓN: Separamos totalmente los contadores GTS de los demás
let g_wp = { g_plan:0, g_real:0, g_aus:0, gts_plan:0, gts_real:0, s_plan:0, s_real:0, s_aus:0 };
let g_entradas = {}, g_salidas = {}, g_ocupacion = {};
let relojInterval = null, alarmTimer = null, countdownInterval = null;
let alarmEnd = null;
let audioCtx = null;
let sortDir = {}; // columna -> asc/desc
let g_historial = []; // últimos 3 cruces

// ============================================================
// RELOJ
// ============================================================
function iniciarReloj() {
actualizarReloj();
if (relojInterval) clearInterval(relojInterval);
relojInterval = setInterval(actualizarReloj, 10000);
document.getElementById('modo-tiempo').innerText = "Tiempo Real";
document.getElementById('box-tiempo').classList.remove('manual');
document.getElementById('btn-reloj').style.display = "none";
}
function actualizarReloj() {
const now = new Date();
document.getElementById('hora-consulta').value = String(now.getHours()).padStart(2,'0') + ':' + String(now.getMinutes()).padStart(2,'0');
}
function marcarManual() {
if (relojInterval) clearInterval(relojInterval);
document.getElementById('modo-tiempo').innerText = "Modo Manual";
document.getElementById('box-tiempo').classList.add('manual');
document.getElementById('btn-reloj').style.display = "inline-block";
}

// ============================================================
// DARK MODE
// ============================================================
function toggleDarkMode() {
const html = document.documentElement;
const isDark = html.getAttribute('data-theme') === 'dark';
html.setAttribute('data-theme', isDark ? 'light' : 'dark');
document.getElementById('btn-darkmode').innerText = isDark ? '☀️ Claro' : '🌙 Oscuro';
localStorage.setItem('wfm_theme', isDark ? 'light' : 'dark');
}

// ============================================================
// MODAL SUPERVISORES
// ============================================================
function abrirModalSup() {
renderSupTags();
document.getElementById('modalSup').style.display = 'flex';
}
function renderSupTags() {
const container = document.getElementById('sup-tags');
container.innerHTML = "";
PIN_SUPERVISORES.forEach(pin => {
const tag = document.createElement('div');
tag.className = 'sup-tag';
tag.innerHTML = `${pin} <button data-pin="${pin}" title="Eliminar">✖</button>`;
container.appendChild(tag);
});
}
function eliminarSupervisor(pin) {
PIN_SUPERVISORES = PIN_SUPERVISORES.filter(p => p !== pin);
guardarSupervisores(PIN_SUPERVISORES);
renderSupTags();
}
function agregarSupervisor() {
const input = document.getElementById('sup-new-pin');
const pin = input.value.trim().replace(/^0+/, "");
if (!pin || !/^\d{3,6}$/.test(pin)) { mostrarToast("⚠️ PIN inválido (3-6 dígitos)"); return; }
if (PIN_SUPERVISORES.includes(pin)) { mostrarToast("⚠️ Ese PIN ya existe"); return; }
PIN_SUPERVISORES.push(pin);
guardarSupervisores(PIN_SUPERVISORES);
renderSupTags();
input.value = "";
mostrarToast("✅ Supervisor añadido: " + pin);
}

// ============================================================
// ALARMA
// ============================================================
function iniciarAudio() {
if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
if (audioCtx.state === 'suspended') audioCtx.resume();
}
function hacerBip() {
if (!audioCtx) return;
const osc = audioCtx.createOscillator();
const gain = audioCtx.createGain();
osc.connect(gain); gain.connect(audioCtx.destination);
osc.type = 'square';
osc.frequency.setValueAtTime(440, audioCtx.currentTime);
osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.1);
gain.gain.setValueAtTime(0.5, audioCtx.currentTime);
gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.5);
osc.start(); osc.stop(audioCtx.currentTime + 0.5);
}
function toggleAlarma() {
const btn = document.getElementById('alarm-btn');
if (alarmTimer) {
clearInterval(alarmTimer); alarmTimer = null;
clearInterval(countdownInterval); countdownInterval = null;
alarmEnd = null;
btn.classList.remove('alarm-active');
document.getElementById('alarm-status-label').innerText = "Alarma";
document.getElementById('alarm-countdown').innerText = "";
mostrarToast("🔔 Alarma desactivada");
} else {
iniciarAudio(); hacerBip();
btn.classList.add('alarm-active');
document.getElementById('alarm-status-label').innerText = "";
alarmEnd = Date.now() + 30 * 60 * 1000;
actualizarCountdown();
countdownInterval = setInterval(actualizarCountdown, 1000);
alarmTimer = setInterval(() => {
hacerBip(); setTimeout(hacerBip, 600);
document.getElementById('modalAlarma').style.display = 'flex';
alarmEnd = Date.now() + 30 * 60 * 1000;
}, 30 * 60 * 1000);
mostrarToast("⏰ Alarma activada. Aviso en 30 minutos.");
}
}
function actualizarCountdown() {
if (!alarmEnd) return;
const restMs = alarmEnd - Date.now();
if (restMs <= 0) { document.getElementById('alarm-countdown').innerText = "00:00"; return; }
const m = Math.floor(restMs / 60000);
const s = Math.floor((restMs % 60000) / 1000);
document.getElementById('alarm-countdown').innerText = String(m).padStart(2,'0') + ':' + String(s).padStart(2,'0');
}
function apagarAlarmaVisual() {
document.getElementById('modalAlarma').style.display = 'none';
}

// ============================================================
// UTILIDADES
// ============================================================
function cerrarModal(modalId) { document.getElementById(modalId).style.display = 'none'; }
function mostrarToast(msg) {
const t = document.createElement('div');
t.className = 'toast'; t.innerText = msg;
document.body.appendChild(t);
setTimeout(() => t.remove(), 3000);
}
function limpiarCaja(id) {
document.getElementById(id).value = ""; // Se mantiene por ahora, pero se puede refactorizar
guardarLocal();
}
function guardarLocal() {
clearTimeout(guardarLocal._t);
guardarLocal._t = setTimeout(() => {
localStorage.setItem("wfm_cuadrante", document.getElementById("raw-cuadrante").value);
localStorage.setItem("wfm_avaya", document.getElementById("raw-avaya").value);
}, 400);
}

// ============================================================
// MOTOR TEMPORAL
// ============================================================
function timeToMins(tStr) {
const [h, m] = tStr.split(':').map(Number);
return h * 60 + m;
}

function evaluarTurno(horaActual, inicio, fin) {
let tNow = timeToMins(horaActual);
let tStart = timeToMins(inicio);
let tEnd = timeToMins(fin);

if (tStart < tEnd) {
if (tNow < tStart) return 'FUTURO';
if (tNow >= tEnd) return 'PASADO';
return 'ACTIVO';
} else {
if (tNow >= tStart || tNow < tEnd) return 'ACTIVO';
if (tNow >= tEnd && tNow < tStart) {
const midpoint = (tEnd + tStart) / 2;
return tNow < midpoint ? 'PASADO' : 'FUTURO';
}
return 'FUTURO';
}
}

// ============================================================
// CRUCE PRINCIPAL
// ============================================================
function animarYCruzar() {
const cont = document.getElementById('tabla-container');
cont.style.opacity = "0.2";
setTimeout(() => { procesarCruce(); cont.style.opacity = "1"; }, 150);
}

function procesarCruce() {
const txtCuadrante = document.getElementById('raw-cuadrante').value.trim();
const txtAvaya = document.getElementById('raw-avaya').value.trim();
const horaConsulta = document.getElementById('hora-consulta').value;
const minsActual = timeToMins(horaConsulta);

const boxC = document.getElementById('raw-cuadrante');
const boxA = document.getElementById('raw-avaya');
boxC.classList.remove('input-error'); boxA.classList.remove('input-error');

if (!txtCuadrante) { boxC.classList.add('input-error'); mostrarToast("⚠️ El cuadrante está vacío"); return; }
if (!txtAvaya) { boxA.classList.add('input-error'); mostrarToast("⚠️ Los datos de Avaya están vacíos"); return; }

// Reset de contadores
g_wp = { g_plan:0, g_real:0, g_aus:0, gts_plan:0, gts_real:0, s_plan:0, s_real:0, s_aus:0 };
g_entradas = {}; g_salidas = {}; g_ocupacion = {};

for (let h=0; h<24; h++) {
g_ocupacion[`${String(h).padStart(2,'0')}:00`] = 0;
g_ocupacion[`${String(h).padStart(2,'0')}:30`] = 0;
}

const avayaLogados = new Map();
txtAvaya.split('\n').forEach(linea => {
const matchPin = linea.match(/\b0*(\d{3,6})\b/);
if (matchPin) {
const celdas = linea.split(/[\t,;]/);
let nom = "";
if (celdas.length > 2) {
nom = (celdas[1]+' '+ (celdas[2] || "")).trim().replace(/["']/g,"");
} else {
nom = linea.replace(matchPin[0],"").replace(/[\t,;]/g,' ').trim();
}
avayaLogados.set(matchPin[1], nom || '(sin nombre)');
}
});

const cuadranteEsperados = new Map();
txtCuadrante.split('\n').forEach(linea => {
const matchPin = linea.match(/\b0*(\d{3,6})\b/);
if (matchPin) {
const pin = matchPin[1];
const idx = linea.indexOf(matchPin[0]);
let nombre = linea.substring(0, idx).replace(/[\t";]/g,' ').trim();
if (nombre.endsWith(',')) nombre = nombre.slice(0,-1).trim();

let desp = linea.substring(idx + matchPin[0].length);
let horario = desp.replace(/^[\t,;\s"]+/,"").trim();
const fin = horario.search(/[\t,;]/);
if (fin > -1) horario = horario.substring(0, fin).trim();
horario = horario.replace(/["']/g,"");

if (pin && horario && !horario.toLowerCase().includes("libre")) {
cuadranteEsperados.set(pin, { nombre, horario });
}
}
});

const tbody = document.querySelector('#tabla-res tbody');
tbody.innerHTML = "";

let cTotal=0, cPres=0, cAus=0, cGts=0, cExc=0, cInact=0, cSup=0;
const analizados = new Set();

cuadranteEsperados.forEach((datos, pin) => {
analizados.add(pin);
const logado = avayaLogados.has(pin);
const esSupervisor = PIN_SUPERVISORES.includes(pin);
const iconoAvaya = logado ? "✅ Logado" : "❌ Desconectado";

const esTurnoTrabajo = /\d{2}[:^\-]\d{2}/.test(datos.horario);
let esGTS = false;

if ((datos.horario.includes('^') || datos.horario.toUpperCase().includes('GTS')) && minsActual >= 480 && minsActual <= 1200) {
    esGTS = true;
}

let estadoHTML="", claseCSS="", filterGroup="";

if (esTurnoTrabajo) {
const m = datos.horario.match(/(\d{2}:\d{2})\s*[-\^]\s*(\d{2}:\d{2})/);
if (m) {
const inicio = m[1], fin = m[2];
if (!esSupervisor) {
g_entradas[inicio] = (g_entradas[inicio] || 0) + 1;
g_salidas[fin] = (g_salidas[fin] || 0) + 1;
calcularOcupacionIndiv(inicio, fin);
}

const sit = evaluarTurno(horaConsulta, inicio, fin);

if (sit === 'ACTIVO') {
cTotal++;

if (esSupervisor) {
    g_wp.s_plan++;
    if (logado) {
        estadoHTML='<span class="pill bg-sup">SUPERVISOR</span>';
        filterGroup='SUPERVISOR'; claseCSS='row-sup'; cSup++; g_wp.s_real++;
    } else {
        estadoHTML='<span class="pill bg-err">AUSENCIA SUP.</span>';
        claseCSS='row-absent'; filterGroup='AUSENCIA'; cAus++; g_wp.s_aus++;
    }
} else if (esGTS) {
    // ⚠️ EL PARCHE PARA GTS: LOS GTS ESTÁN SIEMPRE ACTIVOS EN SU LÍNEA Y NO PUEDEN SER AUSENCIAS
    g_wp.gts_plan++;
    g_wp.gts_real++; // Siempre lo damos por real dentro del WhatsApp y del cálculo
    cGts++;
    estadoHTML='<span class="pill bg-gts">LÍNEA GTS</span>';
    filterGroup='GTS'; 
} else {
    // RESTO DE GESTORES (Los normales que sí pasan por Avaya)
    g_wp.g_plan++;
    if (logado) {
        estadoHTML='<span class="pill bg-ok">PRESENTE</span>';
        filterGroup='PRESENTE'; cPres++; g_wp.g_real++;
    } else {
        estadoHTML='<span class="pill bg-err">AUSENCIA</span>';
        claseCSS='row-absent'; filterGroup='AUSENCIA'; cAus++; g_wp.g_aus++;
    }
}

} else {
if (logado) {
if (esSupervisor) {
estadoHTML='<span class="pill bg-sup">SUPERVISOR</span>';
filterGroup='SUPERVISOR'; claseCSS='row-sup'; cSup++; g_wp.s_real++;
} else {
estadoHTML='<span class="pill bg-warn">LOGADO F. TURNO</span>';
claseCSS='row-extra'; filterGroup='EXCESO'; cExc++;
}
} else {
const label = sit === 'PASADO' ? 'FINALIZADO' : 'POSTERIOR';
estadoHTML=`<span class="pill bg-gray">${label}</span>`;
claseCSS='row-inactive'; filterGroup='INACTIVO'; cInact++;
}
}
}
} else {
if (logado) {
estadoHTML='<span class="pill bg-warn">LOGADO EN PERMISO</span>';
claseCSS='row-extra'; filterGroup='EXCESO'; cExc++;
} else {
estadoHTML='<span class="pill bg-gray">JUSTIFICADO</span>';
claseCSS='row-inactive'; filterGroup='INACTIVO'; cInact++;
}
}

let rowsHtml = ''; // 1. Iniciar string vacío
cuadranteEsperados.forEach((datos, pin) => {
    // ... (toda la lógica de arriba)
    rowsHtml += `<tr data-type="${filterGroup}" data-pin="${pin}" data-nombre="${datos.nombre.toLowerCase()}" class="${claseCSS}">
<td><b>${pin}</b></td>
<td>${datos.nombre}</td>
<td><b>${datos.horario}</b></td>
<td>${iconoAvaya}</td>
<td>${estadoHTML}</td>
</tr>`;
});

avayaLogados.forEach((nombreAvaya, pin) => {
if (!analizados.has(pin)) {
const esSupervisor = PIN_SUPERVISORES.includes(pin);
let estadoHTML="", claseCSS="", filterGroup="";

if (esSupervisor) {
estadoHTML='<span class="pill bg-sup">SUPERVISOR (Extra)</span>';
filterGroup='SUPERVISOR'; claseCSS='row-sup'; cSup++; g_wp.s_real++;
} else {
estadoHTML='<span class="pill bg-warn">NO PLANIFICADO</span>';
filterGroup='EXCESO'; claseCSS='row-extra'; cExc++;
}

rowsHtml += `<tr data-type="${filterGroup}" data-pin="${pin}" data-nombre="${nombreAvaya.toLowerCase()}" class="${claseCSS}">
<td><b>${pin}</b></td>
<td>${nombreAvaya}</td>
<td><i>Sin cuadrante hoy</i></td>
<td>✅ Logado</td>
<td>${estadoHTML}</td>
</tr>`;
}
});

tbody.innerHTML = rowsHtml; // 2. Asignar el HTML de una sola vez

document.getElementById('s-total').innerText = cTotal;
document.getElementById('s-pres').innerText = cPres;
document.getElementById('s-sup').innerText = cSup;
document.getElementById('s-gts').innerText = cGts;
document.getElementById('s-aus').innerText = cAus;
document.getElementById('s-exc').innerText = cExc;
document.getElementById('s-inact').innerText = cInact;

document.getElementById('btn-whatsapp').style.display = 'flex';
document.getElementById('btn-ocup').style.display = 'flex';
document.getElementById('btn-export').style.display = 'flex';
document.getElementById('buscador').disabled = false;

const ahora = horaConsulta;
document.getElementById('last-cruce').innerText = `Último cruce: ${ahora} | ${cTotal} activos`;

guardarHistorial({ hora: ahora, total: cTotal, pres: cPres, aus: cAus, gts: cGts });
filtrar('ALL');
mostrarToast(`✅ Cruce completado - ${cTotal} registros activos`);
}

// ============================================================
// OCUPACIÓN
// ============================================================
function calcularOcupacionIndiv(ent, sal) {
let minEnt = timeToMins(ent);
let minSal = timeToMins(sal);

if (minSal <= minEnt) minSal += 24 * 60;

Object.keys(g_ocupacion).forEach(franja => {
let minF = timeToMins(franja);
if (minEnt >= 12 * 60 && minF < 12 * 60) minF += 24 * 60;
if (minF >= minEnt && minF < minSal) g_ocupacion[franja]++;
});
}

function mostrarOcupacion() {
let html = '<table class="table-ocup"><thead><tr><th>Franja</th><th>Gestores Planificados</th></tr></thead><tbody>';
Object.keys(g_ocupacion).sort().forEach(h => {
if (g_ocupacion[h] > 0 || (h >= "07:00" && h <= "23:30")) {
html += `<tr><td><b>${h}</b></td><td>${g_ocupacion[h]}</td></tr>`;
}
});
html += '</tbody></table>';
document.getElementById('ocup-container').innerHTML = html;
document.getElementById('modalOcup').style.display = 'flex';
}

function copiarOcupacion() {
let txt = "Hora\tPlanificados\n";
Object.keys(g_ocupacion).sort().forEach(h => {
if (g_ocupacion[h] > 0 || (h >= "07:00" && h <= "23:30")) txt += `${h.replace('.',',')}\t${g_ocupacion[h]}\n`;
});
navigator.clipboard.writeText(txt).then(() => {
mostrarToast("✅ Ocupación copiada"); cerrarModal('modalOcup');
});
}

// ============================================================
// BUSCADOR EN TIEMPO REAL
// ============================================================
function buscarTabla() {
const q = document.getElementById('buscador').value.toLowerCase().trim();
document.querySelectorAll('#tabla-res tbody tr').forEach(tr => {
const pin = (tr.getAttribute('data-pin') || "").toLowerCase();
const nombre = (tr.getAttribute('data-nombre') || "").toLowerCase();
const visible = !q || pin.includes(q) || nombre.includes(q);
tr.style.display = visible ? "" : 'none';
});
}

// ============================================================
// FILTRO POR CATEGORÍA
// ============================================================
function filtrar(tipo) {
document.querySelectorAll('.stat-box').forEach(b => b.classList.remove('active'));
const map = { ALL:'f-all', PRESENTE:'f-pres', SUPERVISOR:'f-sup', GTS:'f-gts', AUSENCIA:'f-aus', EXCESO:'f-exc', INACTIVO:'f-inact' };
document.getElementById(map[tipo]).classList.add('active');
document.getElementById('buscador').value = "";
document.querySelectorAll('#tabla-res tbody tr').forEach(f => { // BUGFIX: era 'f', debe ser 'tr'
f.style.display = (tipo === 'ALL' || f.getAttribute('data-type') === tipo) ? "" : 'none';
});
}

// ============================================================
// ORDENAR TABLA POR COLUMNA
// ============================================================
function sortTable(colIndex) {
const table = document.getElementById('tabla-res');
const tbody = table.querySelector('tbody');
const rows = Array.from(tbody.querySelectorAll('tr'));
const asc = !sortDir[colIndex];
sortDir = {}; 
sortDir[colIndex] = asc;

table.querySelectorAll('thead th').forEach((th, i) => {
th.classList.remove('sorted');
const icon = th.querySelector('.sort-icon');
if (icon) icon.innerText = '↕';
});

const thActive = table.querySelectorAll('thead th')[colIndex];
thActive.classList.add('sorted');
const iconActive = thActive.querySelector('.sort-icon');
if (iconActive) iconActive.innerText = asc ? '↑' : '↓';

rows.sort((a, b) => {
const aVal = (a.cells[colIndex]?.innerText || "").trim().toLowerCase();
const bVal = (b.cells[colIndex]?.innerText || "").trim().toLowerCase();
return asc ? aVal.localeCompare(bVal, 'es') : bVal.localeCompare(aVal, 'es');
});

rows.forEach(r => tbody.appendChild(r));
}

// ============================================================
// EXPORTAR CSV
// ============================================================
function exportarCSV() {
const rows = document.querySelectorAll('#tabla-res tr');
if (rows.length <= 1) { mostrarToast("⚠️ No hay datos para exportar"); return; }

let csv = "PIN;Empleado;Turno;Estado Avaya;Situacion\n";
rows.forEach((tr, i) => {
if (i === 0) return;
const celdas = Array.from(tr.cells).map(td => `"${(td.innerText || "").replace(/"/g, '""').replace(/\n/g, ' ')}"`);
csv += celdas.join(';') + '\n';
});

const bom = '\uFEFF'; 
const blob = new Blob([bom + csv], { type: 'text/csv;charset=utf-8;' });
const url = URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
const hora = document.getElementById('hora-consulta').value.replace(':','-');
a.download = `asistencia_WFM_${hora}.csv`;
a.click();
URL.revokeObjectURL(url);
mostrarToast("✅ CSV descargado correctamente");
}

// ============================================================
// HISTORIAL DE CRUCES
// ============================================================
function guardarHistorial(entry) {
g_historial.unshift(entry);
if (g_historial.length > 3) g_historial.pop();
renderHistorial();
}

function renderHistorial() {
const section = document.getElementById('historial-section');
const grid = document.getElementById('hist-grid');
if (!g_historial.length) { section.style.display = 'none'; return; }

section.style.display = 'block';
grid.innerHTML = "";
g_historial.forEach((h, i) => {
const card = document.createElement('div');
card.className = 'hist-card';
card.innerHTML = `
    <div class="hist-time">${h.hora}</div>
    <div class="hist-data">
        Activos: <b>${h.total}</b> &nbsp;|&nbsp; OK: <b style="color:var(--success)">${h.pres}</b><br>
        Ausencias: <b style="color:var(--danger)">${h.aus}</b> &nbsp;|&nbsp; GTS: <b style="color:var(--gts)">${h.gts}</b>
    </div>`;
grid.appendChild(card);
});
}

// ============================================================
// WHATSAPP (CORRECCIÓN MATEMÁTICA DEFINITIVA)
// ============================================================
function abrirWhatsApp() {
// Planificados = Todos los activos del cuadrante (Normales + GTS)
const totalPlanificados = g_wp.g_plan + g_wp.gts_plan;

// Reales = Todos los presentes (Normales + GTS)
const totalReales = g_wp.g_real + g_wp.gts_real;

// Ausencias = Sólo las ausencias de gestores normales (GTS NUNCA son ausencias)
const totalAusencias = g_wp.g_aus;

let txt = '* Gestores: \n';
txt += `- Planificados: ${totalPlanificados}\n`;
txt += `- Reales: ${totalReales}\n`;
txt += `- Ausencias: ${totalAusencias < 10 ? '0' + totalAusencias : totalAusencias}\n`;
txt += `- En formación: 0\n`;
txt += `- Línea GTS: ${g_wp.gts_real}\n`;
txt += `- Línea ayuda psicológica: 0\n\n`;

txt += '* Supervisores: \n';
txt += `- Planificados: ${g_wp.s_plan}\n`;
txt += `- Reales: ${g_wp.s_real}\n`;
txt += `- Ausencias: ${g_wp.s_aus}\n`;
txt += '==\n';
txt += '- En UOPI: 0\n- En tareas administrativas: 0\n- En formación: 0\n- Línea GTS: 0\n\n';

txt += '* Horas de entrada de turno y número de gestores que entran:\n';
Object.keys(g_entradas).sort().forEach(h => { txt += `${h} ${g_entradas[h]}\n`; });

txt += '\n* Horas de salida de turno y número de gestores que salen:\n';
Object.keys(g_salidas).sort().forEach(h => { txt += `${h} ${g_salidas[h]}\n`; });

txt += '\n*Tiempo en cola: \n*Llamadas en cola: ';

document.getElementById('wp-text').value = txt;
document.getElementById('modalWP').style.display = 'flex';
}

function copiarTexto(id) {
navigator.clipboard.writeText(document.getElementById(id).value).then(() => {
mostrarToast("✅ ¡Copiado al portapapeles!");
cerrarModal('modalWP');
});
}

// ============================================================
// INIT
// ============================================================
function addEventListeners() {
    // Cabecera
    document.getElementById('hora-consulta').addEventListener('change', marcarManual);
    document.getElementById('btn-reloj').addEventListener('click', iniciarReloj);
    document.getElementById('alarm-btn').addEventListener('click', toggleAlarma);
    document.getElementById('btn-open-sup').addEventListener('click', abrirModalSup);
    document.getElementById('btn-darkmode').addEventListener('click', toggleDarkMode);
    document.getElementById('btn-ayuda').addEventListener('click', () => document.getElementById('modalAyuda').style.display = 'flex');

    // Inputs
    document.querySelectorAll('[data-clear-id]').forEach(btn => {
        btn.addEventListener('click', (e) => limpiarCaja(e.currentTarget.dataset.clearId));
    });
    document.getElementById('raw-cuadrante').addEventListener('input', guardarLocal);
    document.getElementById('raw-avaya').addEventListener('input', guardarLocal);

    // Botones principales
    document.getElementById('btn-process').addEventListener('click', animarYCruzar);
    document.getElementById('btn-ocup').addEventListener('click', mostrarOcupacion);
    document.getElementById('btn-whatsapp').addEventListener('click', abrirWhatsApp);
    document.getElementById('btn-export').addEventListener('click', exportarCSV);

    // Stats y tabla
    document.querySelectorAll('.stat-box').forEach(box => {
        box.addEventListener('click', (e) => filtrar(e.currentTarget.dataset.filter));
    });
    document.getElementById('buscador').addEventListener('input', buscarTabla);
    document.querySelectorAll('#tabla-res thead th').forEach(th => {
        th.addEventListener('click', (e) => sortTable(parseInt(e.currentTarget.dataset.colIndex)));
    });

    // Modales
    document.querySelectorAll('[data-close-modal]').forEach(btn => {
        btn.addEventListener('click', (e) => cerrarModal(e.currentTarget.dataset.closeModal));
    });
    document.getElementById('btn-alarma-ok').addEventListener('click', apagarAlarmaVisual);
    document.getElementById('btn-wp-copy').addEventListener('click', () => copiarTexto('wp-text'));
    document.getElementById('btn-ocup-copy').addEventListener('click', copiarOcupacion);
    document.getElementById('btn-sup-add').addEventListener('click', agregarSupervisor);
    document.getElementById('sup-new-pin').addEventListener('input', (e) => e.target.value = e.target.value.replace(/\D/g, ''));
    document.getElementById('sup-tags').addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON' && e.target.dataset.pin) {
            eliminarSupervisor(e.target.dataset.pin);
        }
    });
}

window.addEventListener('load', () => {
addEventListeners();
iniciarReloj();
const theme = localStorage.getItem('wfm_theme') || 'light';
document.documentElement.setAttribute('data-theme', theme);
document.getElementById('btn-darkmode').innerText = theme === 'dark' ? '🌙 Oscuro' : '☀️ Claro';
if (localStorage.getItem("wfm_cuadrante")) document.getElementById("raw-cuadrante").value = localStorage.getItem("wfm_cuadrante");
if (localStorage.getItem("wfm_avaya")) document.getElementById("raw-avaya").value = localStorage.getItem("wfm_avaya");
});