const MANUAL_TEMAS = [
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
    '❓ Preguntas frecuentes'
];

const MANUAL_PAGINAS = [
    {
        titulo: '🚀 Primer uso',
        objetivo: 'Poner en marcha Asistencia WFM al inicio del turno. Permite preparar la BBDD, cargar datos y obtener una primera visión operativa.',
        pasos: [
            'Pulsa Actualizar BBDD si trabajas con otros supervisores.',
            'Pega el cuadrante PGPlanning.',
            'Pega los logados de Avaya.',
            'Pulsa CRUZAR DATOS.',
            'Revisa el panel y las ausencias detectadas.'
        ],
        resultado: 'La aplicación muestra el estado del turno, ausencias, panel operativo, bandeja de franja, WhatsApp, Diario Operativo y Control Diario.',
        consejo: 'Antes de registrar incidencias, actualiza la BBDD para trabajar con la información más reciente.',
        errores: [
            'Cruzar datos sin pegar primero PGPlanning o Avaya.',
            'Empezar a justificar sin actualizar la BBDD compartida.',
            'Confundir datos antiguos con el estado actual del turno.'
        ],
        botones: ['Actualizar BBDD', 'CRUZAR DATOS', 'Panel del turno', 'WhatsApp', 'Control Diario']
    },
    {
        titulo: '🕒 Flujo del turno',
        objetivo: 'Seguir un orden de trabajo estable durante el turno. Reduce errores y mantiene la información compartida actualizada.',
        pasos: [
            'Actualiza la BBDD al comenzar.',
            'Pega PGPlanning y después Avaya.',
            'Pulsa Cruzar Datos.',
            'Revisa el Panel del Turno.',
            'Gestiona ausencias y envía WhatsApp si procede.',
            'Guarda la BBDD al terminar los cambios.'
        ],
        resultado: 'El turno queda revisado, comunicado y guardado con un flujo común para todos los supervisores.',
        consejo: 'Trabaja siempre en este orden: Actualizar BBDD, PGPlanning, Avaya, Cruzar, Revisar, Gestionar, WhatsApp y Guardar BBDD.',
        errores: [
            'Guardar sin haber actualizado al inicio.',
            'Enviar WhatsApp antes de revisar las ausencias.',
            'Modificar incidencias sin guardar después.'
        ],
        botones: ['Actualizar BBDD', 'CRUZAR DATOS', 'WhatsApp', 'Guardar BBDD']
    },
    {
        titulo: '🖥 Pantalla principal',
        objetivo: 'Conocer las zonas principales de trabajo. Desde esta pantalla se cargan datos, se revisan indicadores y se accede a las funciones del turno.',
        pasos: [
            'Usa los botones superiores para abrir herramientas.',
            'Comprueba el reloj antes de cruzar datos.',
            'Pega PGPlanning en la primera zona de texto.',
            'Pega Avaya en la segunda zona de texto.',
            'Revisa panel, tabla e indicadores tras cruzar.'
        ],
        resultado: 'La pantalla muestra datos cargados, situación de asistencia, indicadores y accesos rápidos de operación.',
        consejo: 'Si el resultado no cuadra, revisa primero la hora de consulta y vuelve a cruzar los datos.',
        errores: [
            'Pegar Avaya en la caja de PGPlanning.',
            'No mirar el reloj cuando se revisa una franja concreta.',
            'Interpretar indicadores antes de cruzar datos actualizados.'
        ],
        botones: ['Alarma', 'Incidencias', 'Plantilla de empleados', 'Oscuro', 'Manual']
    },
    {
        titulo: '🔄 Cruce de datos',
        objetivo: 'Comparar el cuadrante previsto con los logados reales. Ayuda a detectar presencia, ausencia y situaciones que requieren revisión.',
        pasos: [
            'Pega el cuadrante PGPlanning completo.',
            'Pega los logados de Avaya actualizados.',
            'Comprueba la hora de consulta.',
            'Pulsa CRUZAR DATOS.',
            'Lee la situación actual de cada empleado.'
        ],
        resultado: 'Cada empleado queda clasificado según su turno, estado Avaya y situación operativa.',
        consejo: 'Repite el cruce después de guardar incidencias importantes para revisar el efecto sobre el turno.',
        errores: [
            'Usar capturas o tablas incompletas.',
            'Cruzar con Avaya desactualizado.',
            'No revisar empleados con nombres o PIN no coincidentes.'
        ],
        botones: ['CRUZAR DATOS', 'Exportar CSV', 'Bandeja de franja']
    },
    {
        titulo: '📋 Panel del turno',
        objetivo: 'Resumir la situación operativa del turno. Sus tarjetas ayudan a priorizar ausencias, cobertura y acciones rápidas.',
        pasos: [
            'Cruza los datos antes de revisar el panel.',
            'Lee las tarjetas principales.',
            'Revisa alertas y contadores.',
            'Accede a acciones rápidas si hay incidencias.',
            'Vuelve a cruzar tras cambios relevantes.'
        ],
        resultado: 'El supervisor obtiene una visión rápida de cobertura, ausencias y puntos que requieren intervención.',
        consejo: 'Usa el panel como primera revisión antes de entrar al detalle de la tabla.',
        errores: [
            'Tomar decisiones con el panel sin actualizar.',
            'Ignorar tarjetas con avisos de ausencia.',
            'No revisar de nuevo tras justificar incidencias.'
        ],
        botones: ['CRUZAR DATOS', 'Panel del turno', 'Incidencias']
    },
    {
        titulo: '👥 Gestión de ausencias',
        objetivo: 'Registrar y justificar ausencias detectadas durante el turno. Permite trabajar con ausencias individuales, múltiples y futuras.',
        pasos: [
            'Localiza la ausencia en el resultado del cruce.',
            'Justifica una ausencia o selecciona varias.',
            'Indica tipo, horario y observaciones.',
            'Guarda la incidencia.',
            'Edita posteriormente si cambia la información.'
        ],
        resultado: 'La ausencia queda registrada y disponible para el panel, el histórico, WhatsApp y el Diario Operativo.',
        consejo: 'Para incidencias futuras, revisa bien fecha y hora fin antes de guardar.',
        errores: [
            'Guardar sin tipo de ausencia claro.',
            'Dejar incidencias abiertas sin seguimiento.',
            'Olvidar guardar BBDD después de justificar.'
        ],
        botones: ['Justificar', 'Justificar seleccionadas', 'Guardar incidencia', 'Guardar BBDD']
    },
    {
        titulo: '📂 Centro de incidencias',
        objetivo: 'Consultar y mantener todas las incidencias registradas. Facilita revisar activas, futuras, pasadas e histórico.',
        pasos: [
            'Abre el Centro de incidencias.',
            'Usa filtros por fecha, tipo o supervisor.',
            'Busca por PIN, nombre o tipo.',
            'Revisa incidencias activas y futuras.',
            'Edita o cierra registros cuando corresponda.'
        ],
        resultado: 'Las incidencias quedan ordenadas y localizables para seguimiento durante el turno.',
        consejo: 'Antes de crear una incidencia nueva, busca si ya existe una activa para la misma persona.',
        errores: [
            'Duplicar una incidencia ya registrada.',
            'No limpiar filtros al buscar otro caso.',
            'Confundir histórico con incidencias activas.'
        ],
        botones: ['Incidencias', 'Filtros', 'Buscar', 'Guardar incidencia']
    },
    {
        titulo: '👤 Plantilla de empleados',
        objetivo: 'Mantener la relación de empleados y PIN utilizada por la aplicación. Una plantilla correcta mejora los cruces y reduce errores.',
        pasos: [
            'Abre Plantilla de empleados.',
            'Sincroniza el CSV cuando haya cambios.',
            'Busca por PIN o nombre.',
            'Edita datos necesarios.',
            'Guarda el empleado.'
        ],
        resultado: 'La aplicación reconoce mejor empleados, PIN y datos de referencia durante el cruce.',
        consejo: 'El PIN es el dato clave: revísalo antes que el nombre si algo no aparece correctamente.',
        errores: [
            'Guardar un PIN incompleto.',
            'Duplicar empleados por diferencias de nombre.',
            'No sincronizar tras cambios en la plantilla fuente.'
        ],
        botones: ['Plantilla de empleados', 'Sincronizar plantilla', 'Guardar empleado', 'Limpiar']
    },
    {
        titulo: '💾 Trabajo compartido (BBDD)',
        objetivo: 'Coordinar el trabajo entre supervisores usando una BBDD común. Evita pérdida de cambios y mantiene incidencias compartidas.',
        pasos: [
            'Crea la BBDD si aún no existe.',
            'Conecta la BBDD compartida.',
            'Pulsa Actualizar BBDD al comenzar.',
            'Trabaja las incidencias necesarias.',
            'Pulsa Guardar BBDD al terminar.'
        ],
        resultado: 'Los cambios quedan disponibles para el resto de supervisores que trabajen con la misma BBDD.',
        consejo: 'Si aparece un conflicto, actualiza antes de continuar y revisa los cambios recientes.',
        errores: [
            'Trabajar sin BBDD conectada cuando hay varios supervisores.',
            'Olvidar guardar después de modificar incidencias.',
            'Sobrescribir sin actualizar ante un conflicto.'
        ],
        botones: ['Crear BBDD', 'Conectar BBDD', 'Actualizar BBDD', 'Guardar BBDD']
    },
    {
        titulo: '📲 WhatsApp',
        objetivo: 'Generar un resumen operativo listo para copiar y enviar. Sirve para comunicar información relevante del turno.',
        pasos: [
            'Cruza datos actualizados.',
            'Revisa ausencias e incidencias.',
            'Abre WhatsApp.',
            'Comprueba el texto generado.',
            'Copia y pega en el canal correspondiente.'
        ],
        resultado: 'Se obtiene un texto breve con la situación del turno preparado para comunicación.',
        consejo: 'Úsalo después de revisar incidencias para evitar enviar información incompleta.',
        errores: [
            'Copiar WhatsApp antes de actualizar datos.',
            'Enviar sin revisar ausencias justificadas.',
            'No regenerar el texto tras cambios importantes.'
        ],
        botones: ['WhatsApp', 'Copiar al portapapeles', 'Actualizar BBDD']
    },
    {
        titulo: '🕓 Bandeja de franja',
        objetivo: 'Revisar entradas, salidas y ausencias por franja horaria. Ayuda a detectar acciones inmediatas durante el turno.',
        pasos: [
            'Cruza datos con la hora correcta.',
            'Abre la Bandeja de franja.',
            'Revisa entradas previstas.',
            'Comprueba salidas y ausencias.',
            'Actúa sobre los casos pendientes.'
        ],
        resultado: 'La franja queda revisada con foco en presencia, ausencias y próximos movimientos.',
        consejo: 'Úsala antes de cambios de hora importantes para anticipar incidencias.',
        errores: [
            'Consultar la bandeja con una hora simulada incorrecta.',
            'No actualizar Avaya antes de revisar entradas.',
            'Dejar acciones inmediatas sin registrar.'
        ],
        botones: ['Bandeja de franja', 'CRUZAR DATOS', 'Incidencias']
    },
    {
        titulo: '📊 Diario Operativo',
        objetivo: 'Consultar un resumen estructurado del estado operativo. Está pensado para seguimiento y traspaso de información.',
        pasos: [
            'Cruza datos actualizados.',
            'Registra incidencias necesarias.',
            'Abre Diario Operativo.',
            'Revisa la información mostrada.',
            'Descarga el JSON si necesitas conservarlo.'
        ],
        resultado: 'Se muestra información operativa del turno en formato ordenado y reutilizable.',
        consejo: 'Genera el Diario Operativo después de las principales revisiones del turno.',
        errores: [
            'Abrirlo antes de registrar incidencias relevantes.',
            'Descargar una versión antigua.',
            'Usarlo como sustituto de la BBDD compartida.'
        ],
        botones: ['Diario Operativo', 'Descargar JSON', 'Cerrar']
    },
    {
        titulo: '📈 Control Diario',
        objetivo: 'Previsualizar y preparar información para control posterior. Puede usarse como base de trabajo en LibreOffice Calc.',
        pasos: [
            'Cruza datos actualizados.',
            'Abre Control Diario.',
            'Revisa la previsualización.',
            'Copia el JSON o la tabla.',
            'Pega la información en LibreOffice Calc si procede.'
        ],
        resultado: 'Se obtiene una salida preparada para revisión, copia y uso posterior en hoja de cálculo.',
        consejo: 'Comprueba ausencias e incidencias antes de copiar el Control Diario.',
        errores: [
            'Copiar datos antes del último cruce.',
            'No revisar la previsualización.',
            'Confundir JSON con tabla para Calc.'
        ],
        botones: ['Control Diario', 'Copiar JSON', 'Copiar tabla Excel', 'Analizar plantilla']
    },
    {
        titulo: '❓ Preguntas frecuentes',
        objetivo: 'Resolver dudas habituales durante el trabajo diario. Resume decisiones rápidas para evitar errores comunes.',
        pasos: [
            'Busca la duda en esta sección.',
            'Aplica la recomendación indicada.',
            'Actualiza BBDD si trabajan varios supervisores.',
            'Guarda BBDD después de cambios.',
            'Revisa incidencias si algo no aparece.'
        ],
        resultado: 'El supervisor puede resolver incidencias habituales sin detener el flujo del turno.',
        consejo: 'Ante dudas entre supervisores, actualiza primero y guarda solo cuando tengas claro el último estado.',
        errores: [
            'Si dos supervisores trabajan a la vez, ambos deben actualizar antes de cambiar y guardar al terminar.',
            'Si olvidas guardar la BBDD, tus cambios pueden quedar solo en tu sesión local.',
            'Para recuperar una copia anterior, revisa los backups o versiones disponibles del archivo compartido.',
            'Si no aparecen incidencias nuevas, actualiza la BBDD y revisa filtros activos.'
        ],
        botones: ['Actualizar BBDD', 'Guardar BBDD', 'Incidencias', 'Manual']
    }
];

let manualTemaActual = 0;

function abrirManual() {
    document.getElementById('modalAyuda').style.display = 'flex';
    renderManualTema(manualTemaActual);
}

function renderLista(items, ordered) {
    const tag = ordered ? 'ol' : 'ul';
    return `<${tag} class="manual-placeholder-list">${items.map(item => `<li>${item}</li>`).join('')}</${tag}>`;
}

function renderManualPagina(pagina) {
    return `
        <h3 id="manual-section-title">${pagina.titulo}</h3>
        <h4>Objetivo.</h4>
        <p>${pagina.objetivo}</p>
        <h4>Cómo utilizar esta función.</h4>
        ${renderLista(pagina.pasos, true)}
        <h4>Resultado esperado.</h4>
        <p>${pagina.resultado}</p>
        <h4>Consejo práctico.</h4>
        <p>${pagina.consejo}</p>
        <h4>Errores frecuentes.</h4>
        ${renderLista(pagina.errores, false)}
        <h4>Botones relacionados.</h4>
        ${renderLista(pagina.botones, false)}
    `;
}

function renderManualTema(index) {
    if (index < 0 || index >= MANUAL_TEMAS.length) return;
    manualTemaActual = index;

    const content = document.querySelector('.manual-content');
    const prev = document.getElementById('manual-prev');
    const next = document.getElementById('manual-next');

    if (content) content.innerHTML = renderManualPagina(MANUAL_PAGINAS[index]);
    if (prev) prev.disabled = index === 0;
    if (next) next.disabled = index === MANUAL_TEMAS.length - 1;

    document.querySelectorAll('.manual-menu-item').forEach((button, buttonIndex) => {
        if (MANUAL_TEMAS[buttonIndex]) button.innerText = MANUAL_TEMAS[buttonIndex];
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
