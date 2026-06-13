// ============================
// DATOS MOCK (reemplazar luego por fetch a api/disponibilidad.php)
// ============================
// Estructura: "YYYY-MM-DD": [ "09:00", "10:00", "11:30" ] o [] si no hay disponibilidad
const disponibilidadMock = {
    "2026-06-15": ["09:00", "10:00", "11:00"],
    "2026-06-16": [],
    "2026-06-17": ["14:00", "15:00"],
    "2026-06-18": ["09:00", "09:30", "10:00", "10:30"],
    "2026-06-22": ["13:00"],
};

// ============================
// ESTADO
// ============================
let fechaActual = new Date();

const meses = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

// ============================
// HELPERS
// ============================
function formatearFecha(year, month, day) {
    const mm = String(month + 1).padStart(2, "0");
    const dd = String(day).padStart(2, "0");
    return `${year}-${mm}-${dd}`;
}

function obtenerDisponibilidad(fechaStr) {
    // TODO: reemplazar por fetch real
    // return fetch(`/api/disponibilidad.php?fecha=${fechaStr}&profesional_id=${profesionalId}`)
    return disponibilidadMock[fechaStr] || null;
}

// ============================
// RENDER DEL CALENDARIO
// ============================
function renderCalendario() {
    const year = fechaActual.getFullYear();
    const month = fechaActual.getMonth();

    document.getElementById("calendario-titulo").textContent =
        `${meses[month]} ${year}`;

    const grid = document.getElementById("calendario-grid");
    grid.innerHTML = "";

    // Encabezados de días de la semana
    const diasSemana = ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"];
    diasSemana.forEach(dia => {
        const celda = document.createElement("div");
        celda.className = "celda-header";
        celda.textContent = dia;
        grid.appendChild(celda);
    });

    // Primer día del mes (0 = Domingo, ajustamos para que Lunes sea 0)
    const primerDia = new Date(year, month, 1);
    let diaSemanaInicio = primerDia.getDay() - 1;
    if (diaSemanaInicio < 0) diaSemanaInicio = 6; // Domingo -> 6

    const diasEnMes = new Date(year, month + 1, 0).getDate();

    // Celdas vacías antes del día 1
    for (let i = 0; i < diaSemanaInicio; i++) {
        const vacio = document.createElement("div");
        vacio.className = "celda-vacia";
        grid.appendChild(vacio);
    }

    // Celdas de los días del mes
    for (let dia = 1; dia <= diasEnMes; dia++) {
        const fechaStr = formatearFecha(year, month, dia);
        const slots = obtenerDisponibilidad(fechaStr);

        const celda = document.createElement("div");
        celda.className = "celda-dia";
        celda.textContent = dia;

        if (slots === null) {
            celda.classList.add("dia-sin-info");
        } else if (slots.length > 0) {
            celda.classList.add("dia-disponible");
            celda.addEventListener("click", () => mostrarSlots(fechaStr, slots));
        } else {
            celda.classList.add("dia-no-disponible");
        }

        grid.appendChild(celda);
    }
}

// ============================
// PANEL DE SLOTS
// ============================
function mostrarSlots(fechaStr, slots) {
    const panel = document.getElementById("slots-panel");
    const titulo = document.getElementById("slots-titulo");
    const lista = document.getElementById("slots-lista");

    titulo.textContent = `Horarios disponibles - ${fechaStr}`;
    lista.innerHTML = "";

    slots.forEach(hora => {
        const li = document.createElement("li");
        li.textContent = hora;
        li.addEventListener("click", () => {
            // TODO: aquí se abrirá el modal de confirmación (POST /api/turnos.php)
            alert(`Slot seleccionado: ${fechaStr} a las ${hora}`);
        });
        lista.appendChild(li);
    });

    panel.hidden = false;
}

// ============================
// NAVEGACIÓN ENTRE MESES
// ============================
document.getElementById("btn-mes-anterior").addEventListener("click", () => {
    fechaActual.setMonth(fechaActual.getMonth() - 1);
    renderCalendario();
});

document.getElementById("btn-mes-siguiente").addEventListener("click", () => {
    fechaActual.setMonth(fechaActual.getMonth() + 1);
    renderCalendario();
});

// ============================
// INICIO
// ============================
renderCalendario();