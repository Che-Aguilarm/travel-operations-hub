/* ==========================================================================
   TRAVELOPS HUB - PLATAFORMA DE OPERACIONES - LÓGICA DE APLICACIÓN (JS)
   ========================================================================== */

// DATOS SEMILLA (MOCK DATA INITIALIZERS)
const INITIAL_SUPPLIERS = [
    { id: "S-001", nombre: "LATAM Airlines", tipo: "Vuelo", contacto: "Claudia Pizarro", email: "corporativo.pe@latam.com", telefono: "+51 1 2138200", detalles: "Descuento del 10% en vuelos nacionales. PNR inmediato." },
    { id: "S-002", nombre: "Iberia Líneas Aéreas", tipo: "Vuelo", contacto: "Manuel Torres", email: "agencias.es@iberia.com", telefono: "+34 901 111 500", detalles: "Tarifas especiales para vuelos transatlánticos a Europa." },
    { id: "S-003", nombre: "American Airlines", tipo: "Vuelo", contacto: "John Smith", email: "support.us@aa.com", telefono: "+1 800 433 7300", detalles: "Emisión express de boletos y ascensos a Business." },
    { id: "S-004", nombre: "Hilton Hotels Group", tipo: "Hotel", contacto: "Elena Rostova", email: "reservations.cusco@hilton.com", telefono: "+51 84 582000", detalles: "Hotel 5 estrellas Cusco. Descuento del 15% para clientes premium." },
    { id: "S-005", nombre: "Selina Hostels S.A.", tipo: "Hostal", contacto: "Mateo Silva", email: "reception.chanchamayo@selina.com", telefono: "+51 63 462100", detalles: "Hostal boutique para aventureros. Incluye desayuno continental." },
    { id: "S-006", nombre: "ibis Paris Tour Eiffel", tipo: "Hotel", contacto: "Sophie Martin", email: "h1400@accor.com", telefono: "+33 1 40 58 20 00", detalles: "Hotel 3 estrellas premium. Excelente ubicación con tarifas grupales." },
    { id: "S-007", nombre: "Riu Palace Cancún", tipo: "Hotel", contacto: "Carlos Gómez", email: "palace.cancun@riu.com", telefono: "+52 998 848 7800", detalles: "Resort todo incluido en zona hotelera. Tarifa convenio." }
];

const INITIAL_BOOKINGS = [
    {
        id: "T-0001",
        cliente: "Lenin Aguilar Mamani",
        email: "lenin@empresa.com",
        telefono: "+51 987 654 321",
        pasaporte: "PAS998877",
        destino: "Cuzco, Perú",
        pax: 2,
        fechaIda: "2026-06-15",
        fechaVuelta: "2026-06-22",
        precioVenta: 1500.00,
        moneda: "USD",
        notas: "Habitación matrimonial con vista a la plaza. Traslados incluidos.",
        vueloProv: "LATAM Airlines",
        vueloCodigo: "LA2015",
        vueloCosto: 350.00,
        hotelProv: "Hilton Hotels Group",
        hotelCodigo: "HL-88741",
        hotelCosto: 550.00,
        estadoPago: "Pagado",
        estadoFactura: "Facturado",
        estadoOp: "Confirmado",
        tours: [
            { id: "tr-1", fecha: "2026-06-16", titulo: "City Tour Cusco", hora: "09:00", operador: "Cusco Guides S.A." },
            { id: "tr-2", fecha: "2026-06-18", titulo: "Excursión Machu Picchu Clásico", hora: "05:30", operador: "Inca Rail S.A." }
        ]
    },
    {
        id: "T-0002",
        cliente: "Sofía Rodríguez",
        email: "sofia.rod@gmail.com",
        telefono: "+51 965 432 109",
        pasaporte: "PAS112233",
        destino: "París, Francia",
        pax: 1,
        fechaIda: "2026-09-10",
        fechaVuelta: "2026-09-25",
        precioVenta: 2400.00,
        moneda: "USD",
        notas: "Vuelo de noche preferiblemente. Desayuno buffet incluido.",
        vueloProv: "Iberia Líneas Aéreas",
        vueloCodigo: "IB6820",
        vueloCosto: 850.00,
        hotelProv: "ibis Paris Tour Eiffel",
        hotelCodigo: "",
        hotelCosto: 600.00,
        estadoPago: "Pendiente",
        estadoFactura: "Pendiente",
        estadoOp: "En Proceso",
        tours: [
            { id: "tr-3", fecha: "2026-09-12", titulo: "Crucero nocturno Sena", hora: "19:30", operador: "Paris Bateaux" },
            { id: "tr-4", fecha: "2026-09-15", titulo: "Visita Guiada Louvre", hora: "10:00", operador: "Paris City Vision" }
        ]
    },
    {
        id: "T-0003",
        cliente: "Carlos Mendoza",
        email: "carlos.m@outlook.com",
        telefono: "+51 941 852 963",
        pasaporte: "PAS445566",
        destino: "Chanchamayo, Perú",
        pax: 4,
        fechaIda: "2026-07-28",
        fechaVuelta: "2026-08-02",
        precioVenta: 750.00,
        moneda: "USD",
        notas: "Viaje terrestre contratado por su cuenta. Reservar solo hostal grupal.",
        vueloProv: "Ninguno",
        vueloCodigo: "Terrestre",
        vueloCosto: 0.00,
        hotelProv: "Selina Hostels S.A.",
        hotelCodigo: "",
        hotelCosto: 380.00,
        estadoPago: "Pagado",
        estadoFactura: "Pendiente",
        estadoOp: "Por Reservar",
        tours: [
            { id: "tr-5", fecha: "2026-07-29", titulo: "Trekking Catarata Bayoz", hora: "08:00", operador: "Selina Chanchamayo Guides" }
        ]
    },
    {
        id: "T-0004",
        cliente: "Emily Watson",
        email: "emily.w@travel.com",
        telefono: "+1 555 019 2834",
        pasaporte: "PAS882299",
        destino: "New York, USA",
        pax: 2,
        fechaIda: "2026-12-20",
        fechaVuelta: "2026-12-27",
        precioVenta: 3200.00,
        moneda: "USD",
        notas: "Paquete navideño. Solicitar city pass de atracciones.",
        vueloProv: "American Airlines",
        vueloCodigo: "AA952",
        vueloCosto: 950.00,
        hotelProv: "Pendiente",
        hotelCodigo: "",
        hotelCosto: 0.00,
        estadoPago: "Pagado",
        estadoFactura: "Facturado",
        estadoOp: "En Proceso",
        tours: []
    },
    {
        id: "T-0005",
        cliente: "Juan Pérez García",
        email: "jperez@peru.com",
        telefono: "+51 999 111 222",
        pasaporte: "PAS554433",
        destino: "Cancún, México",
        pax: 2,
        fechaIda: "2026-10-05",
        fechaVuelta: "2026-10-12",
        precioVenta: 2100.00,
        moneda: "USD",
        notas: "Hotel todo incluido frente al mar. Habitación doble.",
        vueloProv: "LATAM Airlines",
        vueloCodigo: "LA2411",
        vueloCosto: 480.00,
        hotelProv: "Riu Palace Cancún",
        hotelCodigo: "RIU-9921",
        hotelCosto: 920.00,
        estadoPago: "Pagado",
        estadoFactura: "Facturado",
        estadoOp: "Confirmado",
        tours: [
            { id: "tr-6", fecha: "2026-10-07", titulo: "Excursión Ruinas Chichén Itzá", hora: "07:00", operador: "Cancún Adventures" }
        ]
    }
];

// ESTADO CENTRALIZADO (APPLICATION STATE)
let state = {
    bookings: [],
    suppliers: [],
    currentView: "view-ventas",
    selectedCell: null,
    filterOp: "all",
    calendarYear: 2026,
    calendarMonth: 5, // Junio (0-indexed: 5 = Junio)
    selectedCalendarDate: "2026-06-15"
};

// ==========================================================================
// INICIALIZACIÓN
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
    initApp();
});

function initApp() {
    // Cargar desde localStorage o inicializar con mock data
    const localBookings = localStorage.getItem("travelOps_bookings");
    const localSuppliers = localStorage.getItem("travelOps_suppliers");

    if (localBookings) {
        state.bookings = JSON.parse(localBookings);
    } else {
        state.bookings = INITIAL_BOOKINGS;
        localStorage.setItem("travelOps_bookings", JSON.stringify(state.bookings));
    }

    // Asegurar que todas las reservas tengan el array de tours
    state.bookings.forEach(b => {
        b.tours = b.tours || [];
    });

    if (localSuppliers) {
        state.suppliers = JSON.parse(localSuppliers);
    } else {
        state.suppliers = INITIAL_SUPPLIERS;
        localStorage.setItem("travelOps_suppliers", JSON.stringify(state.suppliers));
    }

    // Inicializar Fechas del Formulario con fecha de mañana por defecto
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const formattedTomorrow = tomorrow.toISOString().split("T")[0];
    
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 8);
    const formattedNextWeek = nextWeek.toISOString().split("T")[0];

    document.getElementById("viaje-fecha-ida").value = formattedTomorrow;
    document.getElementById("viaje-fecha-vuelta").value = formattedNextWeek;

    // Configurar Event Listeners de Navegación, Formularios y Modales
    setupNavigation();
    setupForms();
    setupModals();
    setupSheetsActions();
    setupThemeToggle();
    setupCalendarListeners();

    // Renderizar vistas iniciales
    renderAllViews();
}

// GUARDAR ESTADO A STORAGE Y RE-RENDERIZAR
function updateStateAndSync() {
    localStorage.setItem("travelOps_bookings", JSON.stringify(state.bookings));
    localStorage.setItem("travelOps_suppliers", JSON.stringify(state.suppliers));
    renderAllViews();
    triggerSheetsSyncAnimation();
}

// ANIMACIÓN DE SINCRONIZACIÓN DE GOOGLE SHEETS
function triggerSheetsSyncAnimation() {
    const syncStatus = document.getElementById("sheets-save-status");
    const lastSyncTime = document.getElementById("last-sync-time");
    
    if (syncStatus) {
        syncStatus.innerHTML = "<span class='pulse-dot'></span> Guardando cambios en Google Drive...";
        syncStatus.classList.remove("text-success");
        syncStatus.style.color = "var(--color-warning)";
    }

    setTimeout(() => {
        const now = new Date();
        const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        
        if (syncStatus) {
            syncStatus.innerHTML = "✓ Sincronizado en tiempo real con Google Sheets";
            syncStatus.style.color = "var(--color-success)";
        }
        if (lastSyncTime) {
            lastSyncTime.innerText = formattedTime;
        }
    }, 1200);
}

// ==========================================================================
// RENDERIZADO DE LAS VISTAS DEL DASHBOARD
// ==========================================================================
function renderAllViews() {
    renderVentasView();
    renderSheetsView();
    renderOperacionesView();
    renderFinanzasView();
    renderProveedoresView();
    renderCalendarView();
    updateGlobalMetrics();
}

// ACTUALIZACIÓN DE MÉTRICAS GLOBALES
function updateGlobalMetrics() {
    // Ventas registradas hoy (simulado, muestra total actual del día)
    document.getElementById("stat-ventas-hoy").innerText = state.bookings.length;
    
    // Ingreso total estimado de hoy
    const sumVentas = state.bookings.reduce((sum, b) => sum + b.precioVenta, 0);
    document.getElementById("stat-ingreso-hoy").innerText = formatCurrency(sumVentas);
}

// 1. RENDERIZAR MÓDULO DE VENTAS (VENTAS)
function renderVentasView() {
    const listBody = document.getElementById("ventas-list-body");
    const totalBadge = document.getElementById("total-ventas-badge");
    listBody.innerHTML = "";

    totalBadge.innerText = `${state.bookings.length} Registros`;

    // Ordenar por ID descendente para mostrar las más nuevas primero
    const sortedBookings = [...state.bookings].reverse();

    sortedBookings.forEach(b => {
        const tr = document.createElement("tr");

        let sheetsIndicator = `
            <span class="badge bg-success flex-align" style="gap: 5px; width: fit-content;">
                <span class="pulse-dot"></span> Sincronizado
            </span>`;

        let statusClass = "bg-warning";
        if (b.estadoOp === "En Proceso") statusClass = "bg-info";
        if (b.estadoOp === "Confirmado") statusClass = "bg-success";

        tr.innerHTML = `
            <td>
                <div class="customer-cell">
                    <span class="customer-name">${escapeHTML(b.cliente)}</span>
                    <span class="customer-email">${escapeHTML(b.email)}</span>
                </div>
            </td>
            <td><b style="color: var(--text-primary);">${escapeHTML(b.destino)}</b></td>
            <td>
                <div style="font-size: 0.8rem; color: var(--text-secondary);">
                    <span>${b.fechaIda}</span> al <span>${b.fechaVuelta}</span>
                </div>
            </td>
            <td><span class="badge bg-info">${b.pax} pax</span></td>
            <td><b>${formatCurrency(b.precioVenta)}</b></td>
            <td>${sheetsIndicator}</td>
            <td><span class="badge ${statusClass}">${b.estadoOp}</span></td>
        `;

        listBody.appendChild(tr);
    });
}

// 2. RENDERIZAR MÓDULO DE GOOGLE SHEETS LIVE (HOJA DE CÁLCULO SIMULADA)
function renderSheetsView() {
    const gridBody = document.getElementById("sheets-grid-body");
    gridBody.innerHTML = "";

    state.bookings.forEach((b, index) => {
        const rowNum = index + 1;
        const tr = document.createElement("tr");
        
        tr.innerHTML = `
            <td class="row-num-cell">${rowNum}</td>
            <td data-field="id" data-row="${index}">${b.id}</td>
            <td data-field="cliente" data-row="${index}">${escapeHTML(b.cliente)}</td>
            <td data-field="destino" data-row="${index}">${escapeHTML(b.destino)}</td>
            <td data-field="fechaIda" data-row="${index}">${b.fechaIda}</td>
            <td data-field="precioVenta" data-row="${index}" class="text-right">${b.precioVenta.toFixed(2)}</td>
            <td data-field="costoTotal" data-row="${index}" class="text-right">${(b.vueloCosto + b.hotelCosto).toFixed(2)}</td>
            <td data-field="vueloProv" data-row="${index}">${escapeHTML(b.vueloProv)}</td>
            <td data-field="hotelProv" data-row="${index}">${escapeHTML(b.hotelProv)}</td>
            <td data-field="estadoPago" data-row="${index}">${b.estadoPago}</td>
            <td data-field="estadoFactura" data-row="${index}">${b.estadoFactura}</td>
        `;

        gridBody.appendChild(tr);
    });

    // Registrar Eventos para las Celdas del Sheet
    const cells = gridBody.querySelectorAll("td:not(.row-num-cell)");
    cells.forEach(cell => {
        cell.addEventListener("click", (e) => {
            selectSheetsCell(e.currentTarget);
        });

        cell.addEventListener("dblclick", (e) => {
            makeCellEditable(e.currentTarget);
        });
    });
}

// CONTROL DE SELECCIÓN DE CELDAS DE SHEETS
function selectSheetsCell(cell) {
    // Remover selección previa
    const prevSelected = document.querySelector(".sheets-table td.selected-cell");
    if (prevSelected) prevSelected.classList.remove("selected-cell");

    cell.classList.add("selected-cell");
    state.selectedCell = cell;

    // Actualizar barra de fórmulas y barra de estado
    const rowIdx = parseInt(cell.getAttribute("data-row")) + 1;
    const colIdx = cell.cellIndex;
    const colLetter = String.fromCharCode(64 + colIdx); // A, B, C...

    document.getElementById("selected-cell-label").innerText = `${colLetter}${rowIdx}`;
    document.getElementById("formula-bar-input").value = cell.innerText;
    document.getElementById("status-selected-row").innerText = `Fila ${rowIdx} (${state.bookings[rowIdx-1].cliente})`;
    document.getElementById("status-selected-cell").innerText = `${colLetter}${rowIdx}`;
}

// EDICIÓN EN LÍNEA TIPO HOJA DE CÁLCULO
function makeCellEditable(cell) {
    const field = cell.getAttribute("data-field");
    const rowIdx = parseInt(cell.getAttribute("data-row"));
    
    // No permitir editar el ID directamente de forma simple para no romper relaciones
    if (field === "id" || field === "costoTotal") return;

    // Crear elemento input
    const input = document.createElement("input");
    input.type = "text";
    input.className = "cell-editor";
    input.value = cell.innerText;

    cell.appendChild(input);
    input.focus();
    input.select();

    // Guardar cambios al presionar Enter o perder foco
    function saveChange() {
        const newVal = input.value.trim();
        
        // Remover el input
        if (input.parentNode === cell) {
            cell.removeChild(input);
        }

        if (newVal !== "") {
            // Actualizar en el estado central
            const booking = state.bookings[rowIdx];
            
            if (field === "precioVenta") {
                const num = parseFloat(newVal);
                booking.precioVenta = isNaN(num) ? booking.precioVenta : num;
            } else if (field === "fechaIda") {
                booking.fechaIda = newVal;
            } else {
                booking[field] = newVal;
            }

            // Actualizar y sincronizar
            cell.innerText = newVal;
            updateStateAndSync();
        }
    }

    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            saveChange();
        } else if (e.key === "Escape") {
            if (input.parentNode === cell) cell.removeChild(input);
        }
    });

    input.addEventListener("blur", () => {
        saveChange();
    });
}

// 3. RENDERIZAR MÓDULO DE OPERACIONES (KANBAN Y RESERVAS)
function renderOperacionesView() {
    const cardsPending = document.getElementById("cards-pending");
    const cardsProcess = document.getElementById("cards-process");
    const cardsConfirmed = document.getElementById("cards-confirmed");

    cardsPending.innerHTML = "";
    cardsProcess.innerHTML = "";
    cardsConfirmed.innerHTML = "";

    let countPending = 0;
    let countProcess = 0;
    let countConfirmed = 0;

    state.bookings.forEach(b => {
        // Filtrar según botón activo en la cabecera
        if (state.filterOp !== "all") {
            if (state.filterOp === "pending" && b.estadoOp !== "Por Reservar") return;
            if (state.filterOp === "process" && b.estadoOp !== "En Proceso") return;
            if (state.filterOp === "confirmed" && b.estadoOp !== "Confirmado") return;
        }

        const card = document.createElement("div");
        card.className = "op-card";
        card.setAttribute("data-id", b.id);
        
        // Detectar si los proveedores están completos
        const flightOk = b.vueloProv !== "Pendiente" && b.vueloCodigo !== "";
        const hotelOk = b.hotelProv !== "Pendiente" && b.hotelCodigo !== "";

        card.innerHTML = `
            <div class="op-card-header">
                <span class="op-card-id">${b.id}</span>
                <span class="badge ${b.estadoPago === 'Pagado' ? 'bg-success' : 'bg-warning'}" style="font-size: 0.65rem;">
                    ${b.estadoPago}
                </span>
            </div>
            <div class="op-card-dest">${escapeHTML(b.destino)}</div>
            <div class="op-card-client">${escapeHTML(b.cliente)}</div>
            
            <div class="op-card-details">
                <div class="op-detail-row">
                    <span class="op-detail-lbl">Fechas:</span>
                    <span class="op-detail-val" style="font-size: 0.72rem;">${b.fechaIda} al ${b.fechaVuelta}</span>
                </div>
                <div class="op-detail-row">
                    <span class="op-detail-lbl">Viajeros:</span>
                    <span class="op-detail-val">${b.pax} pax</span>
                </div>
            </div>

            <div class="provider-indicators">
                <span class="prov-tag ${flightOk ? 'active' : 'inactive'}">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="width:10px;height:10px;"><path d="M22 2 11 13M22 2l-7 20-4-9-9-4Z"/></svg>
                    Vuelo: ${flightOk ? 'Listo' : 'Pend.'}
                </span>
                <span class="prov-tag ${hotelOk ? 'active' : 'inactive'}">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="width:10px;height:10px;"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
                    Hosp.: ${hotelOk ? 'Listo' : 'Pend.'}
                </span>
            </div>
        `;

        // Añadir a la columna correspondiente
        if (b.estadoOp === "Por Reservar") {
            cardsPending.appendChild(card);
            countPending++;
        } else if (b.estadoOp === "En Proceso") {
            cardsProcess.appendChild(card);
            countProcess++;
        } else if (b.estadoOp === "Confirmado") {
            cardsConfirmed.appendChild(card);
            countConfirmed++;
        }

        // Agregar evento de click para abrir modal de operaciones
        card.addEventListener("click", () => {
            openOperationsModal(b.id);
        });
    });

    // Actualizar contadores de las cabeceras Kanban
    document.getElementById("count-pending").innerText = countPending;
    document.getElementById("count-process").innerText = countProcess;
    document.getElementById("count-confirmed").innerText = countConfirmed;
}

// 4. RENDERIZAR MÓDULO DE FINANZAS (FINANZAS Y CONTROL)
function renderFinanzasView() {
    const ledgerBody = document.getElementById("finance-ledger-body");
    ledgerBody.innerHTML = "";

    let totalVentas = 0;
    let totalCostos = 0;
    let totalPorCobrar = 0;

    state.bookings.forEach(b => {
        const totalCosto = b.vueloCosto + b.hotelCosto;
        const gananciaNeto = b.precioVenta - totalCosto;
        const margenPorcentaje = b.precioVenta > 0 ? (gananciaNeto / b.precioVenta) * 100 : 0;

        totalVentas += b.precioVenta;
        totalCostos += totalCosto;
        if (b.estadoPago === "Pendiente") {
            totalPorCobrar += b.precioVenta;
        }

        // Elegir clase de color para el margen %
        let marginClass = "margin-high";
        if (margenPorcentaje < 30 && margenPorcentaje >= 15) marginClass = "margin-mid";
        if (margenPorcentaje < 15) marginClass = "margin-low";

        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td><b>${b.id}</b></td>
            <td>
                <div class="customer-cell">
                    <span class="customer-name">${escapeHTML(b.cliente)}</span>
                    <span class="customer-email">${escapeHTML(b.destino)}</span>
                </div>
            </td>
            <td><b>${formatCurrency(b.precioVenta)}</b></td>
            <td>${formatCurrency(totalCosto)}</td>
            <td><b>${formatCurrency(gananciaNeto)}</b></td>
            <td><span class="${marginClass}">${margenPorcentaje.toFixed(1)}%</span></td>
            <td>
                <select class="status-select-table ${b.estadoPago === 'Pagado' ? 'pagado' : 'pendiente'}" data-id="${b.id}" data-type="pago">
                    <option value="Pagado" ${b.estadoPago === 'Pagado' ? 'selected' : ''}>Pagado</option>
                    <option value="Pendiente" ${b.estadoPago === 'Pendiente' ? 'selected' : ''}>Pendiente</option>
                </select>
            </td>
            <td>
                <select class="status-select-table ${b.estadoFactura === 'Facturado' ? 'facturado' : 'pendiente'}" data-id="${b.id}" data-type="factura">
                    <option value="Facturado" ${b.estadoFactura === 'Facturado' ? 'selected' : ''}>Facturado</option>
                    <option value="Pendiente" ${b.estadoFactura === 'Pendiente' ? 'selected' : ''}>Pendiente</option>
                </select>
            </td>
            <td>
                <button class="table-action-btn btn-view-invoice" data-id="${b.id}">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="width:12px;height:12px;margin-right:4px;display:inline;"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/></svg>
                    Factura
                </button>
            </td>
        `;

        ledgerBody.appendChild(tr);
    });

    // Actualizar KPIs de Finanzas
    document.getElementById("fin-total-ventas").innerText = formatCurrency(totalVentas);
    document.getElementById("fin-total-costos").innerText = formatCurrency(totalCostos);
    
    const gananciaTotal = totalVentas - totalCostos;
    const margenTotalPje = totalVentas > 0 ? (gananciaTotal / totalVentas) * 100 : 0;
    
    document.getElementById("fin-total-ganancia").innerText = formatCurrency(gananciaTotal);
    document.getElementById("fin-total-margen-pje").innerText = `${margenTotalPje.toFixed(1)}% Utilidad`;
    document.getElementById("fin-por-cobrar").innerText = formatCurrency(totalPorCobrar);

    // Registrar eventos para los selectores interactivos directos en la tabla
    const tableSelects = ledgerBody.querySelectorAll(".status-select-table");
    tableSelects.forEach(select => {
        select.addEventListener("change", (e) => {
            const selectEl = e.currentTarget;
            const bId = selectEl.getAttribute("data-id");
            const type = selectEl.getAttribute("data-type");
            const newVal = selectEl.value;

            const booking = state.bookings.find(b => b.id === bId);
            if (booking) {
                if (type === "pago") {
                    booking.estadoPago = newVal;
                } else if (type === "factura") {
                    booking.estadoFactura = newVal;
                }
                updateStateAndSync();
            }
        });
    });

    // Registrar eventos para ver facturas
    const viewInvoiceBtns = ledgerBody.querySelectorAll(".btn-view-invoice");
    viewInvoiceBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            const bId = e.currentTarget.getAttribute("data-id");
            openInvoiceModal(bId);
        });
    });
}

// 5. RENDERIZAR DIRECTORIO DE PROVEEDORES
function renderProveedoresView() {
    const gridContainer = document.getElementById("proveedores-grid-container");
    gridContainer.innerHTML = "";

    state.suppliers.forEach(s => {
        const card = document.createElement("div");
        card.className = "prov-card";
        
        let typeClass = "vuelo";
        let typeLabel = "Línea Aérea";
        if (s.tipo === "Hotel") { typeClass = "hotel"; typeLabel = "Hotel de Estadía"; }
        if (s.tipo === "Hostal") { typeClass = "hostal"; typeLabel = "Hostal Mochilero"; }

        card.innerHTML = `
            <div class="prov-card-header">
                <div class="prov-avatar ${typeClass}">${s.nombre.substring(0, 2).toUpperCase()}</div>
                <div class="prov-card-title">
                    <h3>${escapeHTML(s.nombre)}</h3>
                    <span>${typeLabel}</span>
                </div>
            </div>
            <div class="prov-card-body">
                <div class="prov-detail-item">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="prov-icon"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    <span><b>Contacto:</b> ${escapeHTML(s.contacto || 'Atención General')}</span>
                </div>
                <div class="prov-detail-item">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="prov-icon"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                    <span><b>Email:</b> ${escapeHTML(s.email)}</span>
                </div>
                <div class="prov-detail-item">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="prov-icon"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    <span><b>Teléfono:</b> ${escapeHTML(s.telefono)}</span>
                </div>
                <div class="prov-notes">
                    ${escapeHTML(s.detalles || 'Sin notas especiales de convenio.')}
                </div>
            </div>
        `;

        gridContainer.appendChild(card);
    });
}

// ==========================================================================
// FORMULARIOS DE ACCIÓN Y VALIDACIÓN
// ==========================================================================
function setupForms() {
    // FORMULARIO DE NUEVA VENTA (VENTAS)
    const ventaForm = document.getElementById("venta-form");
    ventaForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const cliente = document.getElementById("cliente-nombre").value.trim();
        const email = document.getElementById("cliente-email").value.trim();
        const telefono = document.getElementById("cliente-telefono").value.trim();
        const pasaporte = document.getElementById("cliente-pasaporte").value.trim();
        const destino = document.getElementById("viaje-destino").value.trim();
        const pax = parseInt(document.getElementById("viaje-pax").value);
        const fechaIda = document.getElementById("viaje-fecha-ida").value;
        const fechaVuelta = document.getElementById("viaje-fecha-vuelta").value;
        const precioVenta = parseFloat(document.getElementById("viaje-precio").value);
        const moneda = document.getElementById("viaje-moneda").value;
        const notas = document.getElementById("viaje-notas").value.trim();

        // Validar fechas
        if (new Date(fechaIda) > new Date(fechaVuelta)) {
            alert("⚠️ La fecha de salida no puede ser posterior a la fecha de retorno.");
            return;
        }

        // Generar ID correlativo
        const lastIdNum = state.bookings.length > 0 
            ? parseInt(state.bookings[state.bookings.length - 1].id.split("-")[1])
            : 0;
        const nextId = "T-" + String(lastIdNum + 1).padStart(4, "0");

        // Crear nueva reserva
        const newBooking = {
            id: nextId,
            cliente,
            email,
            telefono,
            pasaporte,
            destino,
            pax,
            fechaIda,
            fechaVuelta,
            precioVenta,
            moneda,
            notas: notas || "Ninguna preferencia anotada.",
            vueloProv: "Pendiente",
            vueloCodigo: "",
            vueloCosto: 0.00,
            hotelProv: "Pendiente",
            hotelCodigo: "",
            hotelCosto: 0.00,
            estadoPago: "Pendiente",
            estadoFactura: "Pendiente",
            estadoOp: "Por Reservar"
        };

        // Guardar en el estado y en localStorage
        state.bookings.push(newBooking);
        updateStateAndSync();

        // Limpiar formulario y restablecer valores iniciales
        ventaForm.reset();
        
        // Re-establecer fechas por defecto
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const nextWeek = new Date();
        nextWeek.setDate(nextWeek.getDate() + 8);
        document.getElementById("viaje-fecha-ida").value = tomorrow.toISOString().split("T")[0];
        document.getElementById("viaje-fecha-vuelta").value = nextWeek.toISOString().split("T")[0];
        document.getElementById("viaje-pax").value = 1;

        // Feedback sutil
        alert(`✅ Venta registrada con éxito para ${cliente}. Asignada bajo el ID: ${nextId}.`);
    });

    // FORMULARIO DE NUEVO PROVEEDOR
    const provForm = document.getElementById("proveedor-form");
    provForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const nombre = document.getElementById("p-nombre").value.trim();
        const tipo = document.getElementById("p-tipo").value;
        const contacto = document.getElementById("p-contacto").value.trim();
        const email = document.getElementById("p-email").value.trim();
        const telefono = document.getElementById("p-telefono").value.trim();
        const detalles = document.getElementById("p-detalles").value.trim();

        // Generar ID
        const lastProvNum = state.suppliers.length > 0
            ? parseInt(state.suppliers[state.suppliers.length - 1].id.split("-")[1])
            : 0;
        const nextId = "S-" + String(lastProvNum + 1).padStart(3, "0");

        const newSupplier = {
            id: nextId,
            nombre,
            tipo,
            contacto,
            email,
            telefono,
            detalles
        };

        state.suppliers.push(newSupplier);
        
        // Guardar y renderizar
        localStorage.setItem("travelOps_suppliers", JSON.stringify(state.suppliers));
        renderProveedoresView();
        
        // Limpiar formulario y cerrar modal
        provForm.reset();
        closeModal("modal-proveedor");
    });
}

// ==========================================================================
// MODALES Y ASIGNACIÓN DE RESERVAS (OPERACIONES DETALLE)
// ==========================================================================
function setupModals() {
    // Cerrar modales genéricos
    document.getElementById("btn-close-op-modal").addEventListener("click", () => closeModal("modal-operaciones-detalle"));
    document.getElementById("btn-cancel-op-modal").addEventListener("click", () => closeModal("modal-operaciones-detalle"));
    
    document.getElementById("btn-close-factura").addEventListener("click", () => closeModal("modal-factura"));
    document.getElementById("btn-close-factura-footer").addEventListener("click", () => closeModal("modal-factura"));

    document.getElementById("btn-close-prov-modal").addEventListener("click", () => closeModal("modal-proveedor"));
    document.getElementById("btn-cancel-prov-modal").addEventListener("click", () => closeModal("modal-proveedor"));

    // Registrar proveedor nuevo trigger
    document.getElementById("btn-new-proveedor").addEventListener("click", () => {
        openModal("modal-proveedor");
    });

    // Envío del Formulario de Operaciones en el Modal
    const opForm = document.getElementById("reserva-operaciones-form");
    opForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const bId = document.getElementById("m-booking-id").value;
        const vueloProv = document.getElementById("m-vuelo-prov").value;
        const vueloCodigo = document.getElementById("m-vuelo-codigo").value.trim();
        const vueloCosto = parseFloat(document.getElementById("m-vuelo-costo").value) || 0;
        
        const hotelProv = document.getElementById("m-hotel-prov").value;
        const hotelCodigo = document.getElementById("m-hotel-codigo").value.trim();
        const hotelCosto = parseFloat(document.getElementById("m-hotel-costo").value) || 0;
        
        const estadoOp = document.getElementById("m-op-estado").value;

        // Encontrar y actualizar booking
        const booking = state.bookings.find(b => b.id === bId);
        if (booking) {
            booking.vueloProv = vueloProv;
            booking.vueloCodigo = vueloCodigo;
            booking.vueloCosto = vueloCosto;

            booking.hotelProv = hotelProv;
            booking.hotelCodigo = hotelCodigo;
            booking.hotelCosto = hotelCosto;

            booking.estadoOp = estadoOp;

            updateStateAndSync();
            closeModal("modal-operaciones-detalle");
        }
    });

    // Recalcular utilidad en tiempo real dentro del modal de operaciones
    const vueloCostoInput = document.getElementById("m-vuelo-costo");
    const hotelCostoInput = document.getElementById("m-hotel-costo");
    
    function recalculateModalProfit() {
        const cobrado = parseFloat(document.getElementById("m-cobrado").innerText.replace(/[^0-9.-]+/g, "")) || 0;
        const vCosto = parseFloat(vueloCostoInput.value) || 0;
        const hCosto = parseFloat(hotelCostoInput.value) || 0;
        
        const costoTotal = vCosto + hCosto;
        const ganancia = cobrado - costoTotal;
        const pje = cobrado > 0 ? (ganancia / cobrado) * 100 : 0;

        const profitEl = document.getElementById("m-calculated-profit");
        profitEl.innerText = `${formatCurrency(ganancia)} (${pje.toFixed(1)}%)`;

        if (pje >= 30) {
            profitEl.style.color = "var(--color-success)";
        } else if (pje >= 15) {
            profitEl.style.color = "var(--color-warning)";
        } else {
            profitEl.style.color = "var(--color-danger)";
        }
    }

    vueloCostoInput.addEventListener("input", recalculateModalProfit);
    hotelCostoInput.addEventListener("input", recalculateModalProfit);
}

// ABRIR MODAL DE OPERACIONES PARA EDITAR
function openOperationsModal(bookingId) {
    const b = state.bookings.find(book => book.id === bookingId);
    if (!b) return;

    // Poblar campos básicos
    document.getElementById("m-booking-id").value = b.id;
    document.getElementById("modal-op-title").innerText = `Reservación de Viaje #${b.id}`;
    document.getElementById("modal-op-subtitle").innerText = `Cliente: ${b.cliente} | Destino: ${b.destino}`;
    
    document.getElementById("m-pax").innerText = b.pax;
    document.getElementById("m-salida").innerText = b.fechaIda;
    document.getElementById("m-retorno").innerText = b.fechaVuelta;
    document.getElementById("m-cobrado").innerText = formatCurrency(b.precioVenta);
    document.getElementById("m-notas").innerText = b.notas || "Ninguna preferencia especial anotada.";

    // Poblar dropdowns de proveedores según tipo
    const vueloSelect = document.getElementById("m-vuelo-prov");
    const hotelSelect = document.getElementById("m-hotel-prov");

    vueloSelect.innerHTML = `<option value="Ninguno">Ninguno (Vuelo no requerido)</option>`;
    hotelSelect.innerHTML = `<option value="Ninguno">Ninguno (Hospedaje no requerido)</option>`;

    state.suppliers.forEach(s => {
        const option = `<option value="${s.nombre}">${s.nombre}</option>`;
        if (s.tipo === "Vuelo") {
            vueloSelect.insertAdjacentHTML("beforeend", option);
        } else if (s.tipo === "Hotel" || s.tipo === "Hostal") {
            hotelSelect.insertAdjacentHTML("beforeend", option);
        }
    });

    // Agregar opciones por defecto pendientes
    vueloSelect.insertAdjacentHTML("afterbegin", `<option value="Pendiente">⚠️ Seleccionar Aerolínea...</option>`);
    hotelSelect.insertAdjacentHTML("afterbegin", `<option value="Pendiente">⚠️ Seleccionar Hospedaje...</option>`);

    // Cargar datos actuales del viaje en el formulario
    vueloSelect.value = b.vueloProv || "Pendiente";
    document.getElementById("m-vuelo-codigo").value = b.vueloCodigo || "";
    document.getElementById("m-vuelo-costo").value = b.vueloCosto || 0.00;

    hotelSelect.value = b.hotelProv || "Pendiente";
    document.getElementById("m-hotel-codigo").value = b.hotelCodigo || "";
    document.getElementById("m-hotel-costo").value = b.hotelCosto || 0.00;

    document.getElementById("m-op-estado").value = b.estadoOp || "Por Reservar";

    // RENDERIZAR TOURS DENTRO DEL MODAL DE FORMA INLINE
    function renderModalTours() {
        const toursList = document.getElementById("modal-tours-list");
        toursList.innerHTML = "";
        
        b.tours = b.tours || [];

        if (b.tours.length === 0) {
            toursList.innerHTML = `<span style="font-size:0.75rem; color:var(--text-muted); font-style:italic;">No hay actividades ni tours programados para este itinerario.</span>`;
            return;
        }
        
        b.tours.forEach((t, idx) => {
            const tourItem = document.createElement("div");
            tourItem.className = "modal-tour-tag";
            tourItem.innerHTML = `
                <div class="modal-tour-info">
                    <span class="modal-tour-title">${escapeHTML(t.titulo)}</span>
                    <span class="modal-tour-meta">📅 ${t.fecha} | ⏰ ${t.hora || '09:00'} | Op: ${escapeHTML(t.operador || 'Operador Local')}</span>
                </div>
                <button type="button" class="btn-delete-tour-inline" data-index="${idx}">&times;</button>
            `;
            toursList.appendChild(tourItem);
        });

        // Registrar eliminación inline
        toursList.querySelectorAll(".btn-delete-tour-inline").forEach(btn => {
            btn.addEventListener("click", (e) => {
                const idx = parseInt(e.currentTarget.getAttribute("data-index"));
                b.tours.splice(idx, 1);
                updateStateAndSync();
                renderModalTours();
            });
        });
    }

    renderModalTours();

    // Eliminar listener inline viejo del botón de agregar si existiera (por clonación)
    const addTourBtn = document.getElementById("btn-add-tour-inline");
    const newAddTourBtn = addTourBtn.cloneNode(true);
    addTourBtn.parentNode.replaceChild(newAddTourBtn, addTourBtn);

    newAddTourBtn.addEventListener("click", () => {
        const titleInput = document.getElementById("m-tour-title");
        const fechaInput = document.getElementById("m-tour-fecha");

        const titulo = titleInput.value.trim();
        const fecha = fechaInput.value;

        if (titulo === "" || fecha === "") {
            alert("⚠️ Por favor ingresa el título y la fecha para programar la actividad.");
            return;
        }

        const newTour = {
            id: "tr-" + Date.now(),
            fecha,
            titulo,
            hora: "09:00",
            operador: "Operador Convenio"
        };

        b.tours.push(newTour);
        updateStateAndSync();
        renderModalTours();

        titleInput.value = "";
        fechaInput.value = "";
    });

    // Disparar recálculo inicial de utilidad
    const cobrado = b.precioVenta;
    const costoTotal = b.vueloCosto + b.hotelCosto;
    const ganancia = cobrado - costoTotal;
    const pje = cobrado > 0 ? (ganancia / cobrado) * 100 : 0;
    
    const profitEl = document.getElementById("m-calculated-profit");
    profitEl.innerText = `${formatCurrency(ganancia)} (${pje.toFixed(1)}%)`;
    profitEl.style.color = pje >= 30 ? "var(--color-success)" : (pje >= 15 ? "var(--color-warning)" : "var(--color-danger)");

    openModal("modal-operaciones-detalle");
}

// ABRIR MODAL DE FACTURA E IMPRIMIR (FINANZAS)
function openInvoiceModal(bookingId) {
    const b = state.bookings.find(book => book.id === bookingId);
    if (!b) return;

    // Poblar cabecera de la factura
    document.getElementById("f-invoice-num").innerText = `F001-${b.id.split("-")[1].padStart(6, "0")}`;
    
    const today = new Date();
    document.getElementById("f-fecha").innerText = today.toLocaleDateString();

    const pagoBadge = document.getElementById("f-pago-estado");
    pagoBadge.innerText = b.estadoPago;
    pagoBadge.className = `badge ${b.estadoPago === 'Pagado' ? 'bg-success' : 'bg-danger'}`;

    // Poblar cliente e información de viaje
    document.getElementById("f-cliente-nombre").innerText = b.cliente;
    document.getElementById("f-cliente-email").innerText = b.email;
    document.getElementById("f-cliente-tel").innerText = b.telefono;
    document.getElementById("f-cliente-doc").innerText = b.pasaporte || "No especificado";

    document.getElementById("f-destino").innerText = b.destino;
    document.getElementById("f-pax").innerText = `${b.pax} Pasajeros / Pax`;
    document.getElementById("f-salida").innerText = b.fechaIda;
    document.getElementById("f-retorno").innerText = b.fechaVuelta;

    // Calcular valores financieros de factura (IGV 18% incluido en Perú)
    const totalCobrado = b.precioVenta;
    const subtotal = totalCobrado / 1.18;
    const impuesto = totalCobrado - subtotal;

    document.getElementById("f-item-pax").innerText = b.pax;
    document.getElementById("f-item-unitario").innerText = formatCurrency(totalCobrado / b.pax);
    document.getElementById("f-item-total").innerText = formatCurrency(totalCobrado);

    document.getElementById("f-subtotal").innerText = formatCurrency(subtotal);
    document.getElementById("f-impuesto").innerText = formatCurrency(impuesto);
    document.getElementById("f-total").innerText = formatCurrency(totalCobrado);

    openModal("modal-factura");
}

// FUNCIONES DE CONTROL DE MODALES
function openModal(modalId) {
    document.getElementById(modalId).classList.add("active-modal");
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove("active-modal");
}

// ==========================================================================
// ACTIONS DE GOOGLE SHEETS LIVE
// ==========================================================================
function setupSheetsActions() {
    // Botón de Sincronización Manual
    document.getElementById("btn-sync-sheets").addEventListener("click", () => {
        triggerSheetsSyncAnimation();
        alert("☁️ Conectando con Google Drive... Sincronizando datos de ventas y reservas con la hoja 'BD_Ventas_y_Reservas'. ¡Cambios reflejados en la nube con éxito!");
    });

    // Botón para Exportar CSV real
    document.getElementById("btn-export-csv").addEventListener("click", () => {
        exportToCSV(state.bookings, "BD_Ventas_y_Reservas.csv");
    });

    // Eventos para reportes financieros
    document.getElementById("btn-export-finance-report").addEventListener("click", () => {
        exportToCSV(state.bookings, "Reporte_Operaciones_Financieras.csv");
    });
}

// EXPORTACIÓN A ARCHIVO CSV REAL DESCARGABLE
function exportToCSV(dataList, filename) {
    if (dataList.length === 0) {
        alert("⚠️ No hay datos disponibles para exportar.");
        return;
    }

    // Cabeceras del CSV
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "ID,Cliente,Destino,Pax,Fecha Salida,Fecha Retorno,Precio Venta (USD),Costo Vuelo (USD),Proveedor Vuelo,Costo Hotel (USD),Proveedor Hotel,Estado Pago,Estado Operaciones\r\n";

    // Filas
    dataList.forEach(b => {
        let row = [
            b.id,
            `"${b.cliente.replace(/"/g, '""')}"`,
            `"${b.destino.replace(/"/g, '""')}"`,
            b.pax,
            b.fechaIda,
            b.fechaVuelta,
            b.precioVenta.toFixed(2),
            b.vueloCosto.toFixed(2),
            b.vueloProv,
            b.hotelCosto.toFixed(2),
            b.hotelProv,
            b.estadoPago,
            b.estadoOp
        ].join(",");
        csvContent += row + "\r\n";
    });

    // Crear link y gatillar descarga en navegador
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// ==========================================================================
// SISTEMA DE NAVEGACIÓN Y FILTROS
// ==========================================================================
function setupNavigation() {
    const menuItems = document.querySelectorAll(".menu-item");
    const views = document.querySelectorAll(".content-view");

    menuItems.forEach(item => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            const targetViewId = item.getAttribute("data-target");

            // Remover clase activa de todos los menús
            menuItems.forEach(mi => mi.classList.remove("active"));
            // Agregar activa al actual
            item.classList.add("active");

            // Ocultar todas las vistas
            views.forEach(v => v.classList.remove("active-view"));
            // Mostrar la seleccionada
            document.getElementById(targetViewId).classList.add("active-view");

            // Guardar vista actual en el estado
            state.currentView = targetViewId;
        });
    });

    // Filtros de Operaciones (Kanban buttons)
    const filterButtons = document.querySelectorAll(".header-filters .btn");
    filterButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            filterButtons.forEach(b => b.classList.remove("active-filter"));
            btn.classList.add("active-filter");

            state.filterOp = btn.getAttribute("data-filter");
            renderOperacionesView();
        });
    });

    // Búsqueda global en el header
    const searchInput = document.getElementById("global-search");
    searchInput.addEventListener("input", (e) => {
        const query = e.target.value.toLowerCase().trim();
        
        // Si no hay búsqueda, restaurar renders normales
        if (query === "") {
            renderAllViews();
            return;
        }

        // Filtrar reservas
        const filteredBookings = state.bookings.filter(b => 
            b.cliente.toLowerCase().includes(query) ||
            b.destino.toLowerCase().includes(query) ||
            b.id.toLowerCase().includes(query) ||
            b.vueloProv.toLowerCase().includes(query) ||
            b.hotelProv.toLowerCase().includes(query) ||
            b.estadoOp.toLowerCase().includes(query)
        );

        // Guardar temporalmente en una copia filtrada y renderizar de forma personalizada
        const originalBookings = state.bookings;
        state.bookings = filteredBookings;
        
        renderVentasView();
        renderSheetsView();
        renderOperacionesView();
        renderFinanzasView();

        state.bookings = originalBookings; // Restaurar estado real
    });
}

// ==========================================================================
// ALTERNANCIA DE TEMA CLARO Y OSCURO
// ==========================================================================
function setupThemeToggle() {
    const themeBtn = document.getElementById("theme-btn");
    themeBtn.addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
        const isLight = document.body.classList.contains("light-mode");
        
        // Alternar el SVG del sol por la luna de forma simple
        if (isLight) {
            themeBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="moon-icon"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
            `;
        } else {
            themeBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="sun-icon"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
            `;
        }
    });
}

// ==========================================================================
// UTILIDADES COMPLEMENTARIAS
// ==========================================================================
function formatCurrency(value) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(value);
}

function escapeHTML(str) {
    if (!str) return "";
    return str.replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;")
              .replace(/"/g, "&quot;")
              .replace(/'/g, "&#039;");
}

// ==========================================================================
// CALENDARIO DE ITINERARIOS Y TOURS
// ==========================================================================

const MONTH_NAMES = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

function setupCalendarListeners() {
    // Navegación de Meses
    document.getElementById("btn-cal-prev").addEventListener("click", () => {
        state.calendarMonth--;
        if (state.calendarMonth < 0) {
            state.calendarMonth = 11;
            state.calendarYear--;
        }
        renderCalendarView();
    });

    document.getElementById("btn-cal-next").addEventListener("click", () => {
        state.calendarMonth++;
        if (state.calendarMonth > 11) {
            state.calendarMonth = 0;
            state.calendarYear++;
        }
        renderCalendarView();
    });

    // Formulario de añadir tour rápido
    const calTourForm = document.getElementById("cal-add-tour-form");
    calTourForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const bId = document.getElementById("cal-tour-booking-id").value;
        const titulo = document.getElementById("cal-tour-title").value.trim();
        const hora = document.getElementById("cal-tour-time").value;
        const operador = document.getElementById("cal-tour-operator").value.trim() || "Operador Convenio";

        const booking = state.bookings.find(b => b.id === bId);
        if (booking) {
            booking.tours = booking.tours || [];
            
            const newTour = {
                id: "tr-" + Date.now(),
                fecha: state.selectedCalendarDate,
                titulo,
                hora,
                operador
            };

            booking.tours.push(newTour);
            updateStateAndSync();
            
            // Limpiar inputs
            document.getElementById("cal-tour-title").value = "";
            document.getElementById("cal-tour-operator").value = "";
            
            alert(`✅ Tour programado para ${booking.cliente} en la fecha ${state.selectedCalendarDate}.`);
        }
    });
}

function renderCalendarView() {
    const daysGrid = document.getElementById("calendar-days-grid");
    if (!daysGrid) return;
    daysGrid.innerHTML = "";

    // Actualizar cabecera de mes
    document.getElementById("cal-month-year").innerText = `${MONTH_NAMES[state.calendarMonth]} ${state.calendarYear}`;

    // Obtener primer día de la semana del mes
    const firstDayIndex = new Date(state.calendarYear, state.calendarMonth, 1).getDay();
    // Obtener cantidad de días en el mes actual
    const daysInMonth = new Date(state.calendarYear, state.calendarMonth + 1, 0).getDate();
    // Obtener cantidad de días en el mes anterior
    const daysInPrevMonth = new Date(state.calendarYear, state.calendarMonth, 0).getDate();

    // Rellenar días del mes anterior (padding)
    for (let i = firstDayIndex - 1; i >= 0; i--) {
        const dayNum = daysInPrevMonth - i;
        const prevMonthIdx = state.calendarMonth === 0 ? 11 : state.calendarMonth - 1;
        const prevYear = state.calendarMonth === 0 ? state.calendarYear - 1 : state.calendarYear;
        const formattedDate = `${prevYear}-${String(prevMonthIdx + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;

        createCalendarDayCell(dayNum, formattedDate, true);
    }

    // Rellenar días del mes actual
    const today = new Date();
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

    for (let dayNum = 1; dayNum <= daysInMonth; dayNum++) {
        const formattedDate = `${state.calendarYear}-${String(state.calendarMonth + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
        
        createCalendarDayCell(dayNum, formattedDate, false, formattedDate === todayStr);
    }

    // Rellenar días del mes siguiente para cuadrar grilla (6 semanas = 42 celdas)
    const totalCellsUsed = firstDayIndex + daysInMonth;
    const remainingCells = 42 - totalCellsUsed;

    for (let dayNum = 1; dayNum <= remainingCells; dayNum++) {
        const nextMonthIdx = state.calendarMonth === 11 ? 0 : state.calendarMonth + 1;
        const nextYear = state.calendarMonth === 11 ? state.calendarYear + 1 : state.calendarYear;
        const formattedDate = `${nextYear}-${String(nextMonthIdx + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;

        createCalendarDayCell(dayNum, formattedDate, true);
    }

    // Renderizar panel de agenda
    renderCalendarAgenda();
}

function createCalendarDayCell(dayNum, dateStr, isOtherMonth, isToday = false) {
    const daysGrid = document.getElementById("calendar-days-grid");
    const cell = document.createElement("div");
    
    cell.className = "cal-day-cell";
    if (isOtherMonth) cell.classList.add("other-month");
    if (isToday) cell.classList.add("today-cell");
    if (dateStr === state.selectedCalendarDate) cell.classList.add("selected-day-cell");

    cell.setAttribute("data-date", dateStr);

    cell.innerHTML = `
        <span class="cal-day-number">${dayNum}</span>
        <div class="cal-day-events-wrapper"></div>
    `;

    // Cargar eventos del día (Vuelos y Actividades/Tours)
    const eventsWrapper = cell.querySelector(".cal-day-events-wrapper");
    
    state.bookings.forEach(b => {
        // Evento 1: Salida / Ida
        if (b.fechaIda === dateStr) {
            const flightBadge = document.createElement("span");
            flightBadge.className = "cal-event-dot-badge vuelo-event";
            flightBadge.innerText = `✈️ ${b.id}: ${b.cliente.split(' ')[0]}`;
            flightBadge.title = `Salida Vuelo: ${b.cliente} -> ${b.destino}`;
            eventsWrapper.appendChild(flightBadge);
        }

        // Evento 2: Tours y actividades
        b.tours = b.tours || [];
        b.tours.forEach(t => {
            if (t.fecha === dateStr) {
                const tourBadge = document.createElement("span");
                tourBadge.className = "cal-event-dot-badge tour-event";
                tourBadge.innerText = `🎟️ ${t.titulo}`;
                tourBadge.title = `Actividad: ${b.cliente} - ${t.titulo} (${t.hora})`;
                eventsWrapper.appendChild(tourBadge);
            }
        });
    });

    // Evento Click para seleccionar fecha
    cell.addEventListener("click", () => {
        state.selectedCalendarDate = dateStr;
        
        // Actualizar UI activa de celdas
        document.querySelectorAll(".cal-day-cell").forEach(c => c.classList.remove("selected-day-cell"));
        cell.classList.add("selected-day-cell");

        renderCalendarAgenda();
    });

    daysGrid.appendChild(cell);
}

function renderCalendarAgenda() {
    const label = document.getElementById("cal-selected-date-label");
    const eventsContainer = document.getElementById("cal-agenda-events");
    const bookingSelect = document.getElementById("cal-tour-booking-id");

    if (!eventsContainer) return;

    // Formatear fecha
    const parsedDate = new Date(state.selectedCalendarDate + "T00:00:00");
    const formattedDateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateLabelStr = parsedDate.toLocaleDateString('es-ES', formattedDateOptions);
    
    label.innerText = `Itinerario: ${dateLabelStr.charAt(0).toUpperCase() + dateLabelStr.slice(1)}`;

    eventsContainer.innerHTML = "";
    let eventCount = 0;

    state.bookings.forEach(b => {
        // 1. Mostrar vuelos de ida programados
        if (b.fechaIda === state.selectedCalendarDate) {
            eventCount++;
            const card = document.createElement("div");
            card.className = "agenda-item-card vuelo-agenda";
            card.innerHTML = `
                <div class="agenda-item-header">
                    <span class="agenda-item-title">✈️ Salida del Pasajero</span>
                    <span class="agenda-item-time">${b.id}</span>
                </div>
                <div class="agenda-item-client"><b>Cliente:</b> ${escapeHTML(b.cliente)}</div>
                <div class="agenda-item-details">
                    <b>Destino:</b> ${escapeHTML(b.destino)} | <b>Proveedor:</b> ${escapeHTML(b.vueloProv)} | <b>PNR:</b> ${escapeHTML(b.vueloCodigo || 'No asignado')}
                </div>
            `;
            eventsContainer.appendChild(card);
        }

        // 2. Mostrar actividades y tours programados
        b.tours = b.tours || [];
        b.tours.forEach((t, index) => {
            if (t.fecha === state.selectedCalendarDate) {
                eventCount++;
                const card = document.createElement("div");
                card.className = "agenda-item-card tour-agenda";
                card.innerHTML = `
                    <div class="agenda-item-header">
                        <span class="agenda-item-title">🎟️ Tour: ${escapeHTML(t.titulo)}</span>
                        <span class="agenda-item-time">⏰ ${t.hora || 'Todo el día'}</span>
                    </div>
                    <div class="agenda-item-client"><b>Pasajero:</b> ${escapeHTML(b.cliente)} (${b.id})</div>
                    <div class="agenda-item-details" style="display:flex; justify-between; align-items:center; gap: 10px;">
                        <span style="flex:1;"><b>Operador:</b> ${escapeHTML(t.operador || 'No asignado')}</span>
                        <button type="button" class="btn-delete-tour-inline" data-id="${b.id}" data-index="${index}" style="margin-left:auto;" title="Eliminar Tour">&times;</button>
                    </div>
                `;
                eventsContainer.appendChild(card);
            }
        });
    });

    if (eventCount === 0) {
        eventsContainer.innerHTML = `
            <div style="text-align:center; padding: 32px 10px; color: var(--text-muted); font-size: 0.82rem; font-style:italic;">
                No hay salidas de vuelos ni tours programados para este día.
            </div>
        `;
    } else {
        // Registrar eliminación en la agenda lateral
        eventsContainer.querySelectorAll(".btn-delete-tour-inline").forEach(btn => {
            btn.addEventListener("click", (e) => {
                const bId = e.currentTarget.getAttribute("data-id");
                const idx = parseInt(e.currentTarget.getAttribute("data-index"));

                const booking = state.bookings.find(b => b.id === bId);
                if (booking) {
                    booking.tours.splice(idx, 1);
                    updateStateAndSync();
                }
            });
        });
    }

    // Poblar el dropdown select de pasajeros de forma dinámica
    bookingSelect.innerHTML = "";
    state.bookings.forEach(b => {
        const opt = document.createElement("option");
        opt.value = b.id;
        opt.innerText = `${b.id} - ${b.cliente} (${escapeHTML(b.destino.split(',')[0])})`;
        bookingSelect.appendChild(opt);
    });
}
