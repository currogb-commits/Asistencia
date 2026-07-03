const MANUAL_TEMAS = [
    '📘 Portada',
    '🚀 Primer uso',
    '🕒 Flujo del turno',
    '🖥 Pantalla principal',
    '🔄 Cruce de datos',
    '📋 Panel del turno',
    '👥 Gestión de ausencias',
    '📂 Centro de incidencias',
    '👤 Plantilla de empleados',
    '💾 Trabajo compartido (BBDD)',
    '📲 WhatsApp',
    '🕓 Bandeja de franja',
    '📊 Diario Operativo',
    '📈 Control Diario',
    '❓ Preguntas frecuentes',
    'ℹ Acerca de la aplicación'
];

const MANUAL_PDF = {
    portada: 'ASISTENCIA WFM - Guía de Usuario v1.0',
    indice: MANUAL_TEMAS,
    contenido: 'Manual interactivo integrado',
    pie: 'Asistencia WFM v1.0 - Servicio Salud Responde',
    acerca: 'Desarrollo funcional: Francisco García Blanco, Supervisor A'
};

const MANUAL_PAGINAS = [
    {
        titulo: 'ASISTENCIA WFM',
        portada: true,
        objetivo: 'Aplicación de control de asistencia diaria',
        version: 'Versión 1.0',
        autor: ['Desarrollo funcional', 'Francisco García Blanco', 'Supervisor A', 'Servicio Salud Responde', 'Julio 2026'],
        lema: 'Centraliza el control de asistencia del turno desde una única aplicación.'
    },
    {
        titulo: '🚀 Primer uso',
        objetivo: 'Asistencia WFM centraliza el control diario del turno: carga de datos, cruce PGPlanning/Avaya, incidencias y comunicación operativa.',
        hace: 'Permite iniciar el trabajo diario con los datos necesarios y una primera lectura del estado del turno.',
        pasos: ['Conecta la BBDD compartida o créala si es la primera vez.', 'Actualiza la BBDD para cargar cambios de otros supervisores.', 'Pega el cuadrante PGPlanning.', 'Pega los logados de Avaya.', 'Pulsa CRUZAR DATOS.', 'Revisa el Panel del Turno y gestiona las incidencias detectadas.'],
        resultado: 'Vista inicial del turno con estado, ausencias, panel, WhatsApp, Diario Operativo y Control Diario.',
        consejo: 'Actualiza la BBDD antes de registrar incidencias.',
        errores: ['Cruzar sin datos completos.', 'Justificar antes de actualizar la BBDD.', 'Olvidar guardar la BBDD tras registrar incidencias.'],
        botones: ['Conectar BBDD', 'Actualizar BBDD', 'CRUZAR DATOS', 'Panel del turno', 'Incidencias']
    },
    {
        titulo: '🕒 Flujo del turno',
        objetivo: 'Orden recomendado para trabajar de forma estable durante el turno y evitar conflictos entre supervisores.',
        hace: 'Marca la secuencia de trabajo más segura desde el inicio hasta el cierre de cambios.',
        diagrama: ['Conectar BBDD', 'Actualizar BBDD', 'Pegar PGPlanning', 'Pegar Avaya', 'Cruzar Datos', 'Revisar panel', 'Gestionar incidencias', 'Guardar BBDD'],
        pasos: ['Conecta o crea la BBDD compartida.', 'Actualiza BBDD al comenzar.', 'Pega PGPlanning y Avaya.', 'Cruza datos y revisa el Panel del Turno.', 'Gestiona incidencias, comunica si procede y guarda BBDD.'],
        resultado: 'Turno revisado, comunicado y guardado con información común.',
        consejo: 'Sigue siempre el mismo orden de trabajo.',
        errores: ['Guardar sin actualizar primero.', 'Enviar WhatsApp antes de revisar incidencias.'],
        botones: ['Conectar BBDD', 'Actualizar BBDD', 'CRUZAR DATOS', 'Incidencias', 'Guardar BBDD']
    },
    {
        titulo: '🖥 Pantalla principal',
        objetivo: 'Área central de trabajo para cargar datos, consultar el reloj, revisar indicadores y acceder a herramientas.',
        hace: 'Reúne los accesos principales, las zonas de carga y los indicadores operativos del turno.',
        pasos: ['Revisa la hora de consulta.', 'Usa los botones superiores para abrir herramientas.', 'Pega PGPlanning en su bloque.', 'Pega Avaya en su bloque.', 'Cruza y revisa indicadores.'],
        resultado: 'Datos cargados y situación del turno visible en una sola pantalla.',
        consejo: 'Si algo no cuadra, revisa la hora y vuelve a cruzar.',
        errores: ['Pegar Avaya en PGPlanning.', 'Leer indicadores antes de cruzar.'],
        botones: ['Alarma', 'Incidencias', 'Plantilla de empleados', 'Manual']
    },
    {
        titulo: '🔄 Cruce de datos',
        objetivo: 'Comparar el cuadrante previsto con los logados reales para detectar presencia, ausencia y situaciones pendientes.',
        hace: 'Analiza PGPlanning y Avaya para clasificar la situación de cada persona en el momento consultado.',
        pasos: ['Pega PGPlanning completo.', 'Pega Avaya actualizado.', 'Comprueba la hora de consulta.', 'Pulsa CRUZAR DATOS.', 'Revisa ausencias y estados detectados.'],
        resultado: 'Cada empleado queda clasificado por turno, estado Avaya y situación actual.',
        consejo: 'Repite el cruce tras cambios importantes.',
        errores: ['Usar datos incompletos.', 'Cruzar con Avaya antiguo.'],
        botones: ['CRUZAR DATOS', 'Exportar CSV', 'Bandeja de franja']
    },
    {
        titulo: '📋 Panel del turno',
        objetivo: 'Resumen operativo para priorizar cobertura, ausencias y acciones rápidas durante el turno.',
        hace: 'Resume la situación actual con contadores y avisos para detectar dónde actuar primero.',
        pasos: ['Cruza los datos.', 'Lee tarjetas y contadores.', 'Revisa avisos de cobertura y ausencias.', 'Abre incidencias si hay casos pendientes.', 'Vuelve a cruzar tras cambios importantes.'],
        resultado: 'Visión rápida de cobertura y puntos que requieren intervención.',
        consejo: 'Consulta el panel antes de entrar al detalle.',
        errores: ['Decidir con datos antiguos.', 'Ignorar avisos de ausencia.'],
        botones: ['CRUZAR DATOS', 'Panel del turno', 'Incidencias']
    },
    {
        titulo: '👥 Gestión de ausencias',
        objetivo: 'Registrar ausencias individuales, múltiples o futuras y mantenerlas disponibles para el seguimiento.',
        hace: 'Permite justificar ausencias detectadas y conservarlas como incidencias consultables.',
        pasos: ['Localiza la ausencia tras el cruce.', 'Justifica una ausencia o selecciona varias.', 'Indica tipo, horario y observaciones.', 'Guarda la incidencia.', 'Guarda la BBDD si trabajas en modo compartido.'],
        resultado: 'Ausencia registrada para panel, histórico, WhatsApp y Diario Operativo.',
        consejo: 'Revisa fecha y hora fin antes de guardar.',
        errores: ['Guardar sin tipo claro.', 'Dejar incidencias abiertas sin seguimiento.'],
        botones: ['Justificar', 'Justificar seleccionadas', 'Guardar incidencia', 'Guardar BBDD']
    },
    {
        titulo: '📂 Centro de incidencias',
        objetivo: 'Consultar, filtrar y mantener incidencias activas, futuras, pasadas e históricas.',
        hace: 'Centraliza la revisión, búsqueda, edición y seguimiento de las incidencias del servicio.',
        pasos: ['Abre Incidencias.', 'Filtra por fecha, tipo o supervisor.', 'Busca por PIN o nombre.', 'Revisa activas, futuras e histórico.', 'Edita o cierra si procede.'],
        resultado: 'Incidencias localizadas y ordenadas para seguimiento del turno.',
        consejo: 'Busca antes de crear una incidencia nueva.',
        errores: ['Duplicar registros.', 'Olvidar limpiar filtros.'],
        botones: ['Incidencias', 'Filtros', 'Buscar', 'Guardar incidencia']
    },
    {
        titulo: '👤 Plantilla de empleados',
        objetivo: 'Mantener empleados y PIN correctamente sincronizados para mejorar el cruce de datos.',
        hace: 'Gestiona la relación entre empleados y PIN para evitar errores de identificación.',
        pasos: ['Abre Plantilla de empleados.', 'Sincroniza CSV si procede.', 'Busca por PIN o nombre.', 'Edita los datos necesarios.', 'Guarda el empleado.'],
        resultado: 'Empleados reconocidos con mayor precisión en el cruce.',
        consejo: 'El PIN es el dato más importante.',
        errores: ['PIN incompleto.', 'Duplicar empleados por nombre distinto.'],
        botones: ['Plantilla de empleados', 'Sincronizar plantilla', 'Guardar empleado']
    },
    {
        titulo: '💾 Trabajo compartido (BBDD)',
        objetivo: 'Coordinar incidencias entre supervisores usando una BBDD común y evitando pérdida de cambios.',
        hace: 'Permite que varios supervisores trabajen con la misma información de incidencias.',
        diagrama: ['Crear o conectar', 'Actualizar', 'Registrar cambios', 'Guardar'],
        pasos: ['Crea la BBDD si es la primera vez.', 'Conecta la BBDD compartida.', 'Actualiza al comenzar para cargar cambios.', 'Registra o edita incidencias.', 'Guarda al terminar.'],
        resultado: 'Cambios disponibles para el resto de supervisores conectados.',
        consejo: 'Si hay conflicto, actualiza antes de seguir.',
        errores: ['Trabajar sin BBDD conectada.', 'Modificar y no guardar.'],
        botones: ['Crear BBDD', 'Conectar BBDD', 'Actualizar BBDD', 'Guardar BBDD']
    },
    {
        titulo: '📲 WhatsApp',
        objetivo: 'Generar un resumen operativo breve para copiar y enviar por el canal correspondiente.',
        hace: 'Prepara un texto de comunicación rápida con la situación operativa del turno.',
        pasos: ['Cruza datos actualizados.', 'Revisa ausencias e incidencias.', 'Abre WhatsApp.', 'Comprueba el texto generado.', 'Copia el texto.'],
        resultado: 'Mensaje preparado con la situación del turno.',
        consejo: 'Genéralo después de revisar ausencias.',
        errores: ['Enviar texto antiguo.', 'No revisar incidencias antes de copiar.'],
        botones: ['WhatsApp', 'Copiar al portapapeles']
    },
    {
        titulo: '🕓 Bandeja de franja',
        objetivo: 'Revisar entradas, salidas y ausencias por franja para actuar de forma inmediata.',
        hace: 'Ayuda a revisar movimientos próximos o recientes dentro de una franja horaria concreta.',
        pasos: ['Cruza con la hora correcta.', 'Abre la Bandeja de franja.', 'Revisa entradas, salidas y ausencias.', 'Actúa sobre casos pendientes.', 'Registra incidencias si procede.'],
        resultado: 'Franja revisada con foco en presencia y próximos movimientos.',
        consejo: 'Úsala antes de cambios de hora importantes.',
        errores: ['Consultar con hora incorrecta.', 'No actualizar Avaya.'],
        botones: ['Bandeja de franja', 'CRUZAR DATOS', 'Incidencias']
    },
    {
        titulo: '📊 Diario Operativo',
        objetivo: 'Consultar un resumen estructurado para seguimiento y traspaso de información del turno.',
        hace: 'Organiza la información operativa relevante para consulta, cierre o traspaso.',
        pasos: ['Cruza datos actualizados.', 'Registra incidencias relevantes.', 'Abre Diario Operativo.', 'Revisa la información mostrada.', 'Descarga JSON si necesitas conservarlo.'],
        resultado: 'Información operativa ordenada y reutilizable.',
        consejo: 'Genéralo tras las revisiones principales.',
        errores: ['Abrirlo antes de registrar cambios.', 'Descargar una versión antigua.'],
        botones: ['Diario Operativo', 'Descargar JSON']
    },
    {
        titulo: '📈 Control Diario',
        objetivo: 'Previsualizar y preparar datos para revisión posterior en LibreOffice Calc.',
        hace: 'Genera una salida preparada para control y revisión en hoja de cálculo.',
        pasos: ['Cruza datos actualizados.', 'Abre Control Diario.', 'Revisa la previsualización.', 'Copia JSON o tabla.', 'Usa la salida en LibreOffice Calc si procede.'],
        resultado: 'Salida lista para revisar o llevar a hoja de cálculo.',
        consejo: 'Comprueba incidencias antes de copiar.',
        errores: ['Copiar antes del último cruce.', 'Confundir JSON con tabla.'],
        botones: ['Control Diario', 'Copiar JSON', 'Copiar tabla Excel']
    },
    {
        titulo: '❓ Preguntas frecuentes',
        objetivo: 'Resolver dudas habituales sin detener el trabajo del turno.',
        hace: 'Recoge respuestas rápidas para los problemas más comunes durante la operación.',
        pasos: ['Si trabajan varios supervisores, actualiza antes de modificar.', 'Guarda BBDD tras registrar cambios.', 'Revisa filtros si no ves incidencias.', 'Vuelve a cruzar si cambian datos del turno.', 'Consulta backups si necesitas recuperar información.'],
        resultado: 'Decisiones rápidas y coherentes durante la operación.',
        consejo: 'Ante duda, actualiza antes de modificar.',
        errores: ['Dos supervisores editando sin actualizar.', 'Olvidar guardar la BBDD.'],
        botones: ['Actualizar BBDD', 'Guardar BBDD', 'Incidencias', 'Manual']
    },
    {
        titulo: 'ℹ Acerca de la aplicación',
        objetivo: 'Información general de la Guía de Usuario de Asistencia WFM.',
        hace: 'Muestra los datos básicos de autoría y versión del manual integrado.',
        pasos: ['Desarrollo funcional:', 'Francisco García Blanco', 'Supervisor A', 'Servicio Salud Responde', 'Julio 2026'],
        resultado: 'Manual preparado como guía oficial de uso de Asistencia WFM v1.0.',
        consejo: 'Consulta este apartado solo si necesitas datos de versión o créditos.',
        errores: ['Usar esta página como inicio operativo del turno.'],
        botones: ['Manual', 'Cerrar']
    }
];

let manualTemaActual = 0;

function abrirManual() {
    document.getElementById('modalAyuda').style.display = 'flex';
    renderManualTema(manualTemaActual);
}

function renderLista(items, ordered) {
    const tag = ordered ? 'ol' : 'ul';
    return `<${tag} class="manual-list">${items.map(item => `<li>${item}</li>`).join('')}</${tag}>`;
}

function renderDiagrama(items) {
    if (!items) return '';
    return `<div class="manual-diagram">${items.map(item => `<span>${item}</span>`).join('<b>↓</b>')}</div>`;
}

function renderFuncionesRelacionadas(items) {
    return `<div class="manual-related-buttons">${items.map(item => `<span>${item}</span>`).join('')}</div>`;
}

function renderPortadaManual(pagina) {
    return `
        <article class="manual-page manual-cover" data-pdf-section="portada" data-pdf-footer="${MANUAL_PDF.pie}">
            <p class="manual-cover-kicker">Guía de usuario</p>
            <h3 id="manual-section-title">${pagina.titulo}</h3>
            <p>${pagina.objetivo}</p>
            <p>${pagina.version}</p>
            <div class="manual-cover-divider"></div>
            <div class="manual-cover-author">
                ${pagina.autor.map(linea => `<p>${linea}</p>`).join('')}
            </div>
            <p class="manual-cover-quote">${pagina.lema}</p>
        </article>
    `;
}

function renderManualPagina(pagina, index) {
    if (pagina.portada) return renderPortadaManual(pagina);

    return `
        <article class="manual-page" data-pdf-section="contenido" data-pdf-footer="${MANUAL_PDF.pie}">
            <header class="manual-page-header">
                <h3 id="manual-section-title">${pagina.titulo}</h3>
                <p>${pagina.objetivo}</p>
            </header>
            <div class="manual-reading">
                <section class="manual-section">
                    <h4>Qué hace esta función</h4>
                    <p>${pagina.hace}</p>
                </section>
                ${renderDiagrama(pagina.diagrama)}
                <section class="manual-section">
                    <h4>Cómo utilizarla</h4>
                    ${renderLista(pagina.pasos, true)}
                </section>
                <section class="manual-section">
                    <h4>Resultado esperado</h4>
                    <p>${pagina.resultado}</p>
                </section>
                <section class="manual-section manual-tip">
                    <h4>Consejo</h4>
                    <p>${pagina.consejo}</p>
                </section>
                <section class="manual-section manual-warning">
                    <h4>Errores frecuentes</h4>
                    ${renderLista(pagina.errores, false)}
                </section>
                <section class="manual-section manual-related">
                    <h4>Funciones relacionadas</h4>
                    ${renderFuncionesRelacionadas(pagina.botones)}
                </section>
            </div>
        </article>
    `;
}

function renderManualTema(index) {
    if (index < 0 || index >= MANUAL_TEMAS.length) return;
    manualTemaActual = index;

    const content = document.querySelector('.manual-content');
    const prev = document.getElementById('manual-prev');
    const next = document.getElementById('manual-next');

    if (content) content.innerHTML = renderManualPagina(MANUAL_PAGINAS[index], index);
    if (prev) prev.disabled = index === 0;
    if (next) next.disabled = index === MANUAL_TEMAS.length - 1;

    document.querySelectorAll('.manual-menu-item').forEach((button, buttonIndex) => {
        if (MANUAL_TEMAS[buttonIndex]) button.innerText = MANUAL_TEMAS[buttonIndex];
        button.classList.toggle('active', buttonIndex === index);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('.manual-menu');
    if (menu) {
        MANUAL_TEMAS.forEach((tema, index) => {
            if (!menu.querySelector(`[data-manual-index="${index}"]`)) {
                const button = document.createElement('button');
                button.className = 'manual-menu-item';
                button.type = 'button';
                button.dataset.manualIndex = String(index);
                button.innerText = tema;
                menu.appendChild(button);
            }
        });
    }

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
