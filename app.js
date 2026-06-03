/* ==========================================================================
   TRAVELOPS HUB - PLATAFORMA DE OPERACIONES - LÓGICA DE APLICACIÓN (JS)
   ========================================================================== */

// DATOS SEMILLA (MOCK DATA INITIALIZERS) - MÓDULOS SEPARADOS

// ===== MÓDULO VENTAS: Información de clientes y precios =====
const INITIAL_VENTAS = [
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
        estadoPago: "Pagado",
        estadoFactura: "Facturado"
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
        estadoPago: "Pendiente",
        estadoFactura: "Pendiente"
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
        notas: "Viaje terrestre contratado por su cuenta.",
        estadoPago: "Pagado",
        estadoFactura: "Pendiente"
    },
    { 
        id: "T-0004", 
        cliente: "Emily Watson", 
        email: "emily.w@travel.com", 
        telefono: "+1 305 123 4567", 
        pasaporte: "PAS789012", 
        destino: "Cancún, México", 
        pax: 3, 
        fechaIda: "2026-08-05", 
        fechaVuelta: "2026-08-12", 
        precioVenta: 1850.00, 
        moneda: "USD", 
        notas: "Familia con niños menores. Todo incluido.",
        estadoPago: "Pagado",
        estadoFactura: "Facturado"
    }
];

// ===== MÓDULO OPERACIONES: Reservas, proveedores asignados y estado operativo =====
const INITIAL_OPERACIONES = [
    { 
        id: "T-0001", 
        vueloProv: "LATAM Airlines", 
        vueloCodigo: "LA2015", 
        vueloCosto: 350.00,
        hotelProv: "Hilton Hotels Group", 
        hotelCodigo: "HL-88741", 
        hotelCosto: 550.00,
        estadoOp: "Confirmado",
        tours: [
            { id: "tr-1", fecha: "2026-06-16", titulo: "City Tour Cusco", hora: "09:00", operador: "Cusco Guides S.A." },
            { id: "tr-2", fecha: "2026-06-18", titulo: "Excursión Machu Picchu Clásico", hora: "05:30", operador: "Inca Rail S.A." }
        ],
        archivos: []
    },
    { 
        id: "T-0002", 
        vueloProv: "Iberia Líneas Aéreas", 
        vueloCodigo: "IB6820", 
        vueloCosto: 850.00,
        hotelProv: "ibis Paris Tour Eiffel", 
        hotelCodigo: "", 
        hotelCosto: 600.00,
        estadoOp: "En Proceso",
        tours: [
            { id: "tr-3", fecha: "2026-09-12", titulo: "Crucero nocturno Sena", hora: "19:30", operador: "Paris Bateaux" },
            { id: "tr-4", fecha: "2026-09-15", titulo: "Visita Guiada Louvre", hora: "10:00", operador: "Paris City Vision" }
        ],
        archivos: []
    },
    { 
        id: "T-0003", 
        vueloProv: "Ninguno", 
        vueloCodigo: "Terrestre", 
        vueloCosto: 0.00,
        hotelProv: "Selina Hostels S.A.", 
        hotelCodigo: "", 
        hotelCosto: 380.00,
        estadoOp: "Por Reservar",
        tours: [
            { id: "tr-5", fecha: "2026-07-29", titulo: "Trekking Catarata Bayoz", hora: "08:00", operador: "Selina Chanchamayo Guides" }
        ],
        archivos: []
    },
    { 
        id: "T-0004", 
        vueloProv: "American Airlines", 
        vueloCodigo: "AA871", 
        vueloCosto: 520.00,
        hotelProv: "Riu Palace Cancún", 
        hotelCodigo: "RP-12345", 
        hotelCosto: 720.00,
        estadoOp: "Confirmado",
        tours: [],
        archivos: []
    }
];

// ===== MÓDULO FINANZAS: Ingresos, costos y utilidades =====
const INITIAL_FINANZAS = [
    { 
        id: "T-0001", 
        precioVenta: 1500.00, 
        costoVuelo: 350.00,
        costoHotel: 550.00,
        costoTotal: 900.00,
        utilidad: 600.00,
        margenPorcentaje: 40.0,
        estado: "Pagado"
    },
    { 
        id: "T-0002", 
        precioVenta: 2400.00, 
        costoVuelo: 850.00,
        costoHotel: 600.00,
        costoTotal: 1450.00,
        utilidad: 950.00,
        margenPorcentaje: 39.6,
        estado: "Pendiente"
    },
    { 
        id: "T-0003", 
        precioVenta: 750.00, 
        costoVuelo: 0.00,
        costoHotel: 380.00,
        costoTotal: 380.00,
        utilidad: 370.00,
        margenPorcentaje: 49.3,
        estado: "Pagado"
    },
    { 
        id: "T-0004", 
        precioVenta: 1850.00, 
        costoVuelo: 520.00,
        costoHotel: 720.00,
        costoTotal: 1240.00,
        utilidad: 610.00,
        margenPorcentaje: 33.0,
        estado: "Pagado"
    }
];

// DATOS LEGACY (Mantener para compatibilidad backward)
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

// CONFIGURACION GOOGLE SHEETS - 3 HOJAS SEPARADAS
// Cada módulo tiene su propia hoja de Google Sheets para mayor flexibilidad
// Pega aquí las URLs publicadas de tus Google Apps Scripts Web Apps
const GOOGLE_SHEETS_VENTAS_URL = "https://script.google.com/macros/s/AKfycbzIurf8u3nt9nndXrryAIOP0SPI1-OzhwM6T84LowpWtf-I-KxTMJcqTcfBM5G5pDft9w/exec"; // Hoja de VENTAS (clientes, precios)
const GOOGLE_SHEETS_OPERACIONES_URL = "https://script.google.com/macros/s/AKfycbw6HCmlHL7yOSmTZeIFyH1Zmh6huw3rue8TY0Mgykr-W429miWh6omq6pBjTmvUFIBiFw/exec"; // Hoja de OPERACIONES (reservas, proveedores)
const GOOGLE_SHEETS_FINANZAS_URL = "https://script.google.com/macros/s/AKfycbzPyrXOnBff1FJ-iW7zXQtpckdgUz2i7_W8pEPy0D9QSsB4_QFYTpecSrEZje6wYTZs/exec"; // Hoja de FINANZAS (ingresos, costos)

const STORAGE_KEYS = {
    // Nuevas claves para módulos separados
    ventas: "travelOps_ventas",
    operaciones: "travelOps_operaciones",
    finanzas: "travelOps_finanzas",
    suppliers: "travelOps_suppliers",
    // Legacy key (para compatibilidad backward)
    bookings: "travelOps_bookings"
};

const dataSource = {
    // Verificar si está habilitada la sincronización remota para cada módulo
    get isVentasEnabled() {
        return GOOGLE_SHEETS_VENTAS_URL.trim().length > 0;
    },
    get isOperacionesEnabled() {
        return GOOGLE_SHEETS_OPERACIONES_URL.trim().length > 0;
    },
    get isFinanzasEnabled() {
        return GOOGLE_SHEETS_FINANZAS_URL.trim().length > 0;
    },
    get isRemoteEnabled() {
        // Compatibilidad con código antiguo
        return this.isVentasEnabled || this.isOperacionesEnabled || this.isFinanzasEnabled;
    },

    async loadAll() {
        // Cargar Ventas
        const ventas = await this.loadModule("ventas", GOOGLE_SHEETS_VENTAS_URL, STORAGE_KEYS.ventas, []);
        
        // Cargar Operaciones
        const operaciones = await this.loadModule("operaciones", GOOGLE_SHEETS_OPERACIONES_URL, STORAGE_KEYS.operaciones, []);
        
        // Cargar Finanzas
        const finanzas = await this.loadModule("finanzas", GOOGLE_SHEETS_FINANZAS_URL, STORAGE_KEYS.finanzas, []);
        
        // Cargar Proveedores (mantener como antes, no cambia)
        const suppliers = loadLocalCollection(STORAGE_KEYS.suppliers, INITIAL_SUPPLIERS);

        return { ventas, operaciones, finanzas, suppliers };
    },

    async loadModule(moduleName, url, storageKey, fallbackData) {
        if (url && url.trim().length > 0) {
            try {
                const remoteData = await this.request(url, "getModule", { module: moduleName });
                if (remoteData && Array.isArray(remoteData)) {
                    localStorage.setItem(storageKey, JSON.stringify(remoteData));
                    return remoteData;
                }
            } catch (error) {
                console.warn(`No se pudo cargar ${moduleName} desde Google Sheets. Usando copia local.`, error);
            }
        }
        return loadLocalCollection(storageKey, fallbackData);
    },

    async saveAll(ventas, operaciones, finanzas, suppliers) {
        // Guardar en localStorage siempre
        localStorage.setItem(STORAGE_KEYS.ventas, JSON.stringify(ventas));
        localStorage.setItem(STORAGE_KEYS.operaciones, JSON.stringify(operaciones));
        localStorage.setItem(STORAGE_KEYS.finanzas, JSON.stringify(finanzas));
        localStorage.setItem(STORAGE_KEYS.suppliers, JSON.stringify(suppliers));

        const results = [];

        // Guardar cada módulo en su URL correspondiente
        if (this.isVentasEnabled) {
            try {
                const result = await this.request(GOOGLE_SHEETS_VENTAS_URL, "saveModule", { 
                    module: "ventas", 
                    data: ventas 
                });
                results.push({ module: "ventas", ...result });
            } catch (error) {
                console.warn("No se pudo guardar Ventas en Google Sheets.", error);
                results.push({ module: "ventas", source: "local", error: error.message });
            }
        } else {
            results.push({ module: "ventas", source: "local" });
        }

        if (this.isOperacionesEnabled) {
            try {
                const result = await this.request(GOOGLE_SHEETS_OPERACIONES_URL, "saveModule", { 
                    module: "operaciones", 
                    data: operaciones 
                });
                results.push({ module: "operaciones", ...result });
            } catch (error) {
                console.warn("No se pudo guardar Operaciones en Google Sheets.", error);
                results.push({ module: "operaciones", source: "local", error: error.message });
            }
        } else {
            results.push({ module: "operaciones", source: "local" });
        }

        if (this.isFinanzasEnabled) {
            try {
                const result = await this.request(GOOGLE_SHEETS_FINANZAS_URL, "saveModule", { 
                    module: "finanzas", 
                    data: finanzas 
                });
                results.push({ module: "finanzas", ...result });
            } catch (error) {
                console.warn("No se pudo guardar Finanzas en Google Sheets.", error);
                results.push({ module: "finanzas", source: "local", error: error.message });
            }
        } else {
            results.push({ module: "finanzas", source: "local" });
        }

        return results;
    },

    async uploadFile(bookingId, file) {
        if (!this.isVentasEnabled) {
            throw new Error("Configura GOOGLE_SHEETS_VENTAS_URL para subir archivos a Drive.");
        }

        const dataUrl = await fileToDataUrl(file);
        const base64Data = dataUrl.split(",")[1];

        return await this.request(GOOGLE_SHEETS_VENTAS_URL, "uploadFile", {
            bookingId,
            fileName: file.name,
            mimeType: file.type || "application/octet-stream",
            base64Data
        });
    },

    async request(url, action, payload = {}) {
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify({ action, ...payload })
        });

        const result = await response.json();
        if (!result.ok) {
            throw new Error(result.error || "Respuesta invalida de Google Sheets.");
        }

        return result.data;
    }
};

function loadLocalCollection(storageKey, fallbackData) {
    const storedValue = localStorage.getItem(storageKey);
    if (storedValue) {
        return JSON.parse(storedValue);
    }

    localStorage.setItem(storageKey, JSON.stringify(fallbackData));
    return fallbackData;
}

function fileToDataUrl(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(reader.error);
        reader.readAsDataURL(file);
    });
}

// ESTADO CENTRALIZADO (APPLICATION STATE)
let state = {
    // Nuevos módulos separados
    ventas: [],        // Información de clientes y precios
    operaciones: [],   // Reservas, proveedores, tours
    finanzas: [],      // Ingresos, costos, utilidades
    
    // Legacy (para compatibilidad backward)
    bookings: [],      // Vista consolidada (sintetizada desde ventas + operaciones)
    
    suppliers: [],     // Catálogo de proveedores (compartido)
    currentView: "view-ventas",
    selectedCell: null,
    filterOp: "all",
    calendarYear: 2026,
    calendarMonth: 5, // Junio (0-indexed: 5 = Junio)
    selectedCalendarDate: "2026-06-15",
    usuarios: [],
    historial: [],
    errores: [],
    archivos: [],
    usuarioActual: null,
    loginTime: null
};

// ==========================================================================
// SÍNTESIS DE MÓDULOS: Combinar Ventas + Operaciones + Finanzas
// ==========================================================================
function synthesizeBookings() {
    /**
     * Crea un array de bookings consolidado fusionando datos de:
     * - state.ventas (cliente, precios)
     * - state.operaciones (proveedores, tours, estado operativo)
     * - state.finanzas (costos, utilidades)
     */
    state.bookings = state.ventas.map(venta => {
        const operacion = state.operaciones.find(op => op.id === venta.id) || {};
        const finanza = state.finanzas.find(fin => fin.id === venta.id) || {};

        return {
            // De Ventas
            id: venta.id,
            cliente: venta.cliente,
            email: venta.email,
            telefono: venta.telefono,
            pasaporte: venta.pasaporte,
            destino: venta.destino,
            pax: venta.pax,
            fechaIda: venta.fechaIda,
            fechaVuelta: venta.fechaVuelta,
            precioVenta: venta.precioVenta,
            moneda: venta.moneda,
            notas: venta.notas,
            estadoPago: venta.estadoPago,
            estadoFactura: venta.estadoFactura,

            // De Operaciones
            vueloProv: operacion.vueloProv || "Pendiente",
            vueloCodigo: operacion.vueloCodigo || "",
            vueloCosto: operacion.vueloCosto || 0,
            hotelProv: operacion.hotelProv || "Pendiente",
            hotelCodigo: operacion.hotelCodigo || "",
            hotelCosto: operacion.hotelCosto || 0,
            estadoOp: operacion.estadoOp || "Por Reservar",
            tours: operacion.tours || [],
            archivos: operacion.archivos || [],
            historial: operacion.historial || [],

            // De Finanzas
            costoVuelo: finanza.costoVuelo || 0,
            costoHotel: finanza.costoHotel || 0,
            costoTotal: finanza.costoTotal || 0,
            utilidad: finanza.utilidad || 0,
            margenPorcentaje: finanza.margenPorcentaje || 0,
            estadoFinanzas: finanza.estado || "Pendiente"
        };
    });
}

function updateStateAndSync() {
    /**
     * Actualiza cada módulo desde state.bookings y sincroniza con Google Sheets
     */
    // Extraer datos de bookings hacia los módulos separados
    state.ventas = state.bookings.map(b => ({
        id: b.id,
        cliente: b.cliente,
        email: b.email,
        telefono: b.telefono,
        pasaporte: b.pasaporte,
        destino: b.destino,
        pax: b.pax,
        fechaIda: b.fechaIda,
        fechaVuelta: b.fechaVuelta,
        precioVenta: b.precioVenta,
        moneda: b.moneda,
        notas: b.notas,
        estadoPago: b.estadoPago,
        estadoFactura: b.estadoFactura
    }));

    state.operaciones = state.bookings.map(b => ({
        id: b.id,
        vueloProv: b.vueloProv,
        vueloCodigo: b.vueloCodigo,
        vueloCosto: b.vueloCosto,
        hotelProv: b.hotelProv,
        hotelCodigo: b.hotelCodigo,
        hotelCosto: b.hotelCosto,
        estadoOp: b.estadoOp,
        tours: b.tours || [],
        archivos: b.archivos || [],
        historial: b.historial || []
    }));

    state.finanzas = state.bookings.map(b => ({
        id: b.id,
        precioVenta: b.precioVenta,
        costoVuelo: b.vueloCosto,
        costoHotel: b.hotelCosto,
        costoTotal: (b.vueloCosto || 0) + (b.hotelCosto || 0),
        utilidad: b.precioVenta - ((b.vueloCosto || 0) + (b.hotelCosto || 0)),
        margenPorcentaje: b.precioVenta > 0 ? (((b.precioVenta - ((b.vueloCosto || 0) + (b.hotelCosto || 0))) / b.precioVenta) * 100) : 0,
        estado: b.estadoPago
    }));

    // Guardar en localStorage y Google Sheets
    dataSource.saveAll(state.ventas, state.operaciones, state.finanzas, state.suppliers);
    
    renderAllViews();
}

// ==========================================================================
// INICIALIZACIÓN
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
    initApp();
});

async function initApp() {
    // Cargar los 3 módulos separados
    const initialData = await dataSource.loadAll();
    state.ventas = initialData.ventas || [];
    state.operaciones = initialData.operaciones || [];
    state.finanzas = initialData.finanzas || [];
    state.suppliers = initialData.suppliers || [];

    // Aplicar fallbacks a datos iniciales si están vacíos
    if (state.ventas.length === 0) {
        state.ventas = INITIAL_VENTAS;
        localStorage.setItem(STORAGE_KEYS.ventas, JSON.stringify(state.ventas));
    }
    if (state.operaciones.length === 0) {
        state.operaciones = INITIAL_OPERACIONES;
        localStorage.setItem(STORAGE_KEYS.operaciones, JSON.stringify(state.operaciones));
    }
    if (state.finanzas.length === 0) {
        state.finanzas = INITIAL_FINANZAS;
        localStorage.setItem(STORAGE_KEYS.finanzas, JSON.stringify(state.finanzas));
    }
    if (state.suppliers.length === 0) {
        state.suppliers = INITIAL_SUPPLIERS;
        localStorage.setItem(STORAGE_KEYS.suppliers, JSON.stringify(state.suppliers));
    }

    // Sintetizar bookings desde los 3 módulos
    synthesizeBookings();

    // Asegurar que todas las reservas tengan los arrays necesarios
    state.bookings.forEach(b => {
        b.tours = b.tours || [];
        b.archivos = b.archivos || [];
        b.historial = b.historial || [];
    });

    // Inicializar Fechas del Formulario con fecha de mañana por defecto
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const formattedTomorrow = tomorrow.toISOString().split("T")[0];
    
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 8);
    const formattedNextWeek = nextWeek.toISOString().split("T")[0];

    document.getElementById("viaje-fecha-ida").value = formattedTomorrow;
    document.getElementById("viaje-fecha-vuelta").value = formattedNextWeek;

    // Cargar datos del almacenamiento
    loadStorageData();

    // Configurar Event Listeners de Navegación, Formularios y Modales
    setupNavigation();
    setupForms();
    setupModals();
    setupSheetsActions();
    setupThemeToggle();
    setupCalendarListeners();
    setupNewFeatures();

    // Si no hay usuario autenticado, mostrar login
    if (!state.usuarioActual) {
        showLoginModal();
    }

    // Renderizar vistas iniciales
    renderAllViews();
}

// GUARDAR ESTADO A STORAGE Y RE-RENDERIZAR


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
    renderHistorialView();
    renderUsuariosView();
    renderErroresView();
    renderArchivosView();
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
    renderOperationsHistory();
}

// 4. RENDERIZAR MÓDULO DE FINANZAS (FINANZAS Y CONTROL)
function renderOperationsHistory() {
    const list = document.getElementById("operations-history-list");
    const counter = document.getElementById("op-history-count");
    if (!list || !counter) return;

    const entries = state.bookings
        .flatMap(booking => (booking.historial || []).map(entry => ({
            ...entry,
            bookingId: booking.id,
            cliente: booking.cliente,
            destino: booking.destino
        })))
        .sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

    counter.innerText = `${entries.length} cambios`;
    list.innerHTML = "";

    if (entries.length === 0) {
        list.innerHTML = `<div class="history-empty">Todavia no hay modificaciones registradas en Operaciones.</div>`;
        return;
    }

    entries.slice(0, 80).forEach(entry => {
        const item = document.createElement("div");
        item.className = "history-entry";
        item.innerHTML = `
            <div class="history-entry-main">
                <div class="history-entry-title">${escapeHTML(entry.accion)}</div>
                <div class="history-entry-desc">${escapeHTML(entry.detalle)}</div>
                <div class="history-entry-context">${escapeHTML(entry.bookingId)} | ${escapeHTML(entry.cliente)} | ${escapeHTML(entry.destino)}</div>
            </div>
            <div class="history-entry-meta">
                <span>${formatDateTime(entry.fecha)}</span>
                <span>${escapeHTML(entry.usuario || "TravelOps")}</span>
            </div>
        `;
        list.appendChild(item);
    });
}

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
            estadoOp: "Por Reservar",
            tours: [],
            archivos: [],
            historial: []
        };

        // Guardar en el estado y sincronizar con la fuente configurada.
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
        updateStateAndSync();
        
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
            const trackedChanges = collectBookingChanges(booking, {
                vueloProv,
                vueloCodigo,
                vueloCosto,
                hotelProv,
                hotelCodigo,
                hotelCosto,
                estadoOp
            });

            booking.vueloProv = vueloProv;
            booking.vueloCodigo = vueloCodigo;
            booking.vueloCosto = vueloCosto;

            booking.hotelProv = hotelProv;
            booking.hotelCodigo = hotelCodigo;
            booking.hotelCosto = hotelCosto;

            booking.estadoOp = estadoOp;

            if (trackedChanges.length > 0) {
                addOperationHistory(booking, "Actualizacion de operaciones", trackedChanges);
            }

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
                const deletedTour = b.tours[idx];
                b.tours.splice(idx, 1);
                addOperationHistory(b, "Tour eliminado", [
                    {
                        campo: "Tours",
                        anterior: deletedTour ? `${deletedTour.titulo} (${deletedTour.fecha})` : "Tour",
                        nuevo: "Eliminado"
                    }
                ]);
                updateStateAndSync();
                renderModalTours();
                renderModalHistory();
            });
        });
    }

    renderModalTours();

    function renderModalFiles() {
        const filesList = document.getElementById("modal-files-list");
        filesList.innerHTML = "";

        b.archivos = b.archivos || [];

        if (b.archivos.length === 0) {
            filesList.innerHTML = `<span class="empty-files-message">No hay archivos subidos para esta reserva.</span>`;
            return;
        }

        b.archivos.forEach(file => {
            const fileItem = document.createElement("a");
            fileItem.className = "modal-file-link";
            fileItem.href = file.url;
            fileItem.target = "_blank";
            fileItem.rel = "noopener noreferrer";
            fileItem.innerHTML = `
                <span class="modal-file-name">${escapeHTML(file.name)}</span>
                <span class="modal-file-meta">${escapeHTML(file.mimeType || "archivo")} | ${formatFileSize(file.size)}</span>
            `;
            filesList.appendChild(fileItem);
        });
    }

    renderModalFiles();

    function renderModalHistory() {
        const historyList = document.getElementById("modal-history-list");
        historyList.innerHTML = "";

        b.historial = b.historial || [];

        if (b.historial.length === 0) {
            historyList.innerHTML = `<div class="history-empty">Todavia no hay modificaciones registradas para esta reserva.</div>`;
            return;
        }

        [...b.historial].sort((a, c) => new Date(c.fecha) - new Date(a.fecha)).forEach(entry => {
            const item = document.createElement("div");
            item.className = "history-entry compact";
            item.innerHTML = `
                <div class="history-entry-main">
                    <div class="history-entry-title">${escapeHTML(entry.accion)}</div>
                    <div class="history-entry-desc">${escapeHTML(entry.detalle)}</div>
                </div>
                <div class="history-entry-meta">
                    <span>${formatDateTime(entry.fecha)}</span>
                </div>
            `;
            historyList.appendChild(item);
        });
    }

    renderModalHistory();

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
        addOperationHistory(b, "Tour agregado", [
            {
                campo: "Tours",
                anterior: "Sin registro",
                nuevo: `${newTour.titulo} (${newTour.fecha})`
            }
        ]);
        updateStateAndSync();
        renderModalTours();
        renderModalHistory();

        titleInput.value = "";
        fechaInput.value = "";
    });

    const uploadFilesBtn = document.getElementById("btn-upload-drive-files");
    const newUploadFilesBtn = uploadFilesBtn.cloneNode(true);
    uploadFilesBtn.parentNode.replaceChild(newUploadFilesBtn, uploadFilesBtn);

    newUploadFilesBtn.addEventListener("click", async () => {
        const fileInput = document.getElementById("m-drive-files");
        const uploadStatus = document.getElementById("m-upload-status");
        const selectedFiles = Array.from(fileInput.files || []);

        if (selectedFiles.length === 0) {
            alert("Selecciona uno o mas archivos para subir a Drive.");
            return;
        }

        if (!dataSource.isRemoteEnabled) {
            alert("Primero configura GOOGLE_SHEETS_WEB_APP_URL en app.js para vincular la app con tu cuenta de Drive.");
            return;
        }

        newUploadFilesBtn.disabled = true;
        uploadStatus.innerText = `Subiendo ${selectedFiles.length} archivo(s) a Drive...`;

        try {
            for (const file of selectedFiles) {
                const uploadedFile = await dataSource.uploadFile(b.id, file);
                b.archivos.push(uploadedFile);
                addOperationHistory(b, "Archivo subido a Drive", [
                    {
                        campo: "Archivos",
                        anterior: "Sin archivo",
                        nuevo: uploadedFile.name
                    }
                ]);
            }

            await updateStateAndSync();
            renderModalFiles();
            renderModalHistory();
            fileInput.value = "";
            uploadStatus.innerText = "Archivos subidos y vinculados correctamente.";
        } catch (error) {
            console.error(error);
            uploadStatus.innerText = "No se pudo subir el archivo. Revisa la configuracion de Apps Script.";
            alert(error.message);
        } finally {
            newUploadFilesBtn.disabled = false;
        }
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
    // Botón de Sincronización Manual - Ahora sincroniza los 3 módulos separados
    document.getElementById("btn-sync-sheets").addEventListener("click", async () => {
        if (!dataSource.isRemoteEnabled) {
            alert("Configura las URLs de Google Sheets en app.js:\n- GOOGLE_SHEETS_VENTAS_URL\n- GOOGLE_SHEETS_OPERACIONES_URL\n- GOOGLE_SHEETS_FINANZAS_URL");
            return;
        }

        const remoteData = await dataSource.loadAll();
        state.ventas = remoteData.ventas || [];
        state.operaciones = remoteData.operaciones || [];
        state.finanzas = remoteData.finanzas || [];
        state.suppliers = remoteData.suppliers || [];

        // Sintetizar bookings desde los 3 módulos
        synthesizeBookings();

        state.bookings.forEach(b => {
            b.tours = b.tours || [];
            b.archivos = b.archivos || [];
            b.historial = b.historial || [];
        });

        renderAllViews();
        triggerSheetsSyncAnimation();
        alert("Datos de los 3 módulos (Ventas, Operaciones, Finanzas) recargados desde Google Sheets correctamente.");
    });

    // Botón para Exportar CSV de Ventas
    document.getElementById("btn-export-csv").addEventListener("click", () => {
        exportToCSV(state.ventas, "BD_Ventas.csv");
    });

    // Eventos para reportes financieros
    document.getElementById("btn-export-finance-report").addEventListener("click", () => {
        exportToCSV(state.finanzas, "Reporte_Finanzas.csv");
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

function formatFileSize(bytes) {
    const size = Number(bytes || 0);
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
    if (size < 1024 * 1024 * 1024) return `${(size / (1024 * 1024)).toFixed(1)} MB`;
    return `${(size / (1024 * 1024 * 1024)).toFixed(1)} GB`;
}

function formatDateTime(value) {
    if (!value) return "";
    return new Date(value).toLocaleString("es-PE", {
        dateStyle: "short",
        timeStyle: "short"
    });
}

function collectBookingChanges(booking, nextValues) {
    const fieldLabels = {
        vueloProv: "Proveedor de vuelo",
        vueloCodigo: "Codigo PNR",
        vueloCosto: "Costo de vuelo",
        hotelProv: "Proveedor de hospedaje",
        hotelCodigo: "Codigo de hospedaje",
        hotelCosto: "Costo de hospedaje",
        estadoOp: "Estado operativo"
    };

    return Object.keys(nextValues).reduce((changes, field) => {
        const previousValue = booking[field] ?? "";
        const nextValue = nextValues[field] ?? "";
        const normalizedPrevious = typeof previousValue === "number" ? Number(previousValue) : String(previousValue);
        const normalizedNext = typeof nextValue === "number" ? Number(nextValue) : String(nextValue);

        if (normalizedPrevious !== normalizedNext) {
            changes.push({
                campo: fieldLabels[field] || field,
                anterior: formatHistoryValue(previousValue),
                nuevo: formatHistoryValue(nextValue)
            });
        }

        return changes;
    }, []);
}

function addOperationHistory(booking, action, changes) {
    if (!booking || !changes || changes.length === 0) return;

    booking.historial = booking.historial || [];
    booking.historial.unshift({
        id: "hist-" + Date.now() + "-" + Math.random().toString(36).slice(2, 7),
        fecha: new Date().toISOString(),
        usuario: "TravelOps",
        accion: action,
        detalle: changes.map(change => `${change.campo}: ${change.anterior} -> ${change.nuevo}`).join("; "),
        cambios: changes
    });
}

function formatHistoryValue(value) {
    if (value === null || value === undefined || value === "") return "Vacio";
    if (typeof value === "number") return Number.isFinite(value) ? value.toFixed(2) : "0.00";
    return String(value);
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

// ==========================================================================
// NUEVAS CARACTERÍSTICAS: USUARIOS, HISTORIAL, ERRORES, ARCHIVOS
// ==========================================================================

const INITIAL_USERS = [
    { id: 1, nombre: "Admin", username: "admin", password: "1234", rol: "Administrador", email: "admin@travelops.com", activo: true },
    { id: 2, nombre: "Lenin Aguilar", username: "lenin.aguilar", password: "1234", rol: "Gerente General", email: "lenin@empresa.com", activo: true },
    { id: 3, nombre: "María Torres", username: "maria.torres", password: "1234", rol: "Operario", email: "maria@empresa.com", activo: true }
];

function initializeUsersSystem() {
    const stored = localStorage.getItem("travelOps_usuarios");
    if (stored) {
        state.usuarios = JSON.parse(stored);
    } else {
        state.usuarios = INITIAL_USERS;
        localStorage.setItem("travelOps_usuarios", JSON.stringify(state.usuarios));
    }
    const savedUser = localStorage.getItem("travelOps_usuarioActual");
    if (savedUser) {
        state.usuarioActual = JSON.parse(savedUser);
        hideLoginModal();
    }
}

function setupLoginSystem() {
    const loginForm = document.getElementById("login-form");
    if (!loginForm) return;
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const username = document.getElementById("login-username").value.trim();
        const password = document.getElementById("login-password").value;
        const remember = document.getElementById("login-remember").checked;
        const user = state.usuarios.find(u => (u.username === username || u.email === username) && u.password === password && u.activo);
        if (user) {
            state.usuarioActual = user;
            state.loginTime = new Date();
            if (remember) {
                localStorage.setItem("travelOps_usuarioActual", JSON.stringify(user));
            }
            hideLoginModal();
            logEvent("login", `Usuario ${user.nombre} inició sesión`);
            renderAllViews();
            showAlert("¡Bienvenido! Sesión iniciada correctamente.", "success");
        } else {
            showAlert("Usuario o contraseña incorrecta", "danger");
        }
    });
}

function showLoginModal() {
    const modal = document.getElementById("modal-login");
    if (modal) {
        modal.classList.add("active-modal");
        document.body.style.overflow = "hidden";
    }
}

function hideLoginModal() {
    const modal = document.getElementById("modal-login");
    if (modal) {
        modal.classList.remove("active-modal");
        document.body.style.overflow = "auto";
    }
}

function logout() {
    const userName = state.usuarioActual?.nombre || "Usuario";
    logEvent("logout", `${userName} cerró sesión`);
    state.usuarioActual = null;
    state.loginTime = null;
    localStorage.removeItem("travelOps_usuarioActual");
    showLoginModal();
    document.getElementById("login-form").reset();
    renderAllViews();
    showAlert("Sesión cerrada", "info");
}

function logEvent(tipo, descripcion, detalles = "") {
    if (!state.usuarioActual && tipo !== "login") return;
    const evento = {
        id: Date.now(),
        fecha: new Date(),
        usuario: state.usuarioActual?.nombre || "Sistema",
        rol: state.usuarioActual?.rol || "Desconocido",
        tipo: tipo,
        descripcion: descripcion,
        detalles: detalles
    };
    state.historial.unshift(evento);
    localStorage.setItem("travelOps_historial", JSON.stringify(state.historial));
}

function logError(tipo, descripcion, detalles = "") {
    const error = {
        id: Date.now(),
        fecha: new Date(),
        tipo: tipo,
        descripcion: descripcion,
        detalles: detalles,
        estado: "pendiente",
        usuario: state.usuarioActual?.nombre || "Sistema"
    };
    state.errores.unshift(error);
    localStorage.setItem("travelOps_errores", JSON.stringify(state.errores));
    console.error(`[${tipo}] ${descripcion}`, detalles);
}

function showAlert(message, type = "info") {
    const alert = document.createElement("div");
    alert.className = `alert-notification alert-${type}`;
    alert.style.cssText = `position: fixed; top: 20px; right: 20px; padding: 15px 20px; background: ${type === 'success' ? 'var(--color-success)' : type === 'danger' ? 'var(--color-danger)' : type === 'warning' ? 'var(--color-warning)' : 'var(--color-info)'}; color: white; border-radius: var(--border-radius-md); box-shadow: var(--shadow-lg); z-index: 9999; font-weight: 500; animation: slideIn 0.3s ease-out;`;
    alert.innerText = message;
    document.body.appendChild(alert);
    setTimeout(() => {
        alert.style.animation = "slideOut 0.3s ease-out";
        setTimeout(() => alert.remove(), 300);
    }, 3000);
}

function renderHistorialView() {
    const listBody = document.getElementById("historial-list-body");
    const statBadge = document.getElementById("stat-total-cambios");
    if (!listBody) return;
    const filtroFecha = document.getElementById("filter-historial-fecha")?.value;
    const filtroTipo = document.getElementById("filter-historial-tipo")?.value;
    let filtrados = state.historial;
    if (filtroFecha) {
        filtrados = filtrados.filter(e => new Date(e.fecha).toISOString().split('T')[0] === filtroFecha);
    }
    if (filtroTipo) {
        filtrados = filtrados.filter(e => e.tipo === filtroTipo);
    }
    if (statBadge) statBadge.innerText = state.historial.length;
    if (filtrados.length === 0) {
        listBody.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 30px; color: var(--text-secondary);">No hay registros</td></tr>';
        return;
    }
    listBody.innerHTML = filtrados.map(e => `<tr><td>${new Date(e.fecha).toLocaleString('es-PE')}</td><td><span class="badge bg-info">${e.usuario}</span></td><td><span class="badge bg-${getBadgeColor(e.tipo)}">${e.tipo}</span></td><td>${escapeHTML(e.descripcion)}</td><td style="font-size: 0.85rem; color: var(--text-muted);">${escapeHTML(e.detalles.substring(0, 50))}</td></tr>`).join("");
}

function renderUsuariosView() {
    const listBody = document.getElementById("usuarios-list-body");
    const totalBadge = document.getElementById("total-usuarios-badge");
    if (!listBody) return;
    if (totalBadge) totalBadge.innerText = state.usuarios.length;
    listBody.innerHTML = state.usuarios.map(u => `<tr><td><div class="flex-align" style="gap: 10px;"><div style="width: 32px; height: 32px; border-radius: 50%; background: var(--color-accent); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 0.9rem;">${u.nombre.substring(0, 2).toUpperCase()}</div><div><div style="font-weight: 500;">${escapeHTML(u.nombre)}</div><div style="font-size: 0.8rem; color: var(--text-muted);">${u.username}</div></div></div></td><td><span class="badge bg-success">${u.rol}</span></td><td><span class="badge ${u.activo ? 'bg-success' : 'bg-danger'}">${u.activo ? 'Activo' : 'Inactivo'}</span></td><td><button class="btn btn-secondary" style="padding: 4px 8px; font-size: 0.8rem;" onclick="editUser(${u.id})">Editar</button></td></tr>`).join("");
    if (state.usuarioActual) {
        document.getElementById("current-user-avatar").innerText = state.usuarioActual.nombre.substring(0, 2).toUpperCase();
        document.getElementById("current-user-name").innerText = state.usuarioActual.nombre;
        document.getElementById("current-user-role").innerText = state.usuarioActual.rol;
        document.getElementById("current-user-email").innerText = state.usuarioActual.email;
        if (state.loginTime) {
            document.getElementById("last-login-time").innerText = new Date(state.loginTime).toLocaleString('es-PE');
            const duracion = Math.floor((Date.now() - new Date(state.loginTime).getTime()) / 60000);
            document.getElementById("login-duration").innerText = `${duracion} minutos`;
        }
    }
}

function renderErroresView() {
    const listBody = document.getElementById("errores-list-body");
    const statActivos = document.getElementById("stat-errores-activos");
    const statResueltos = document.getElementById("stat-errores-resueltos");
    if (!listBody) return;
    const filtroEstado = document.getElementById("filter-errores-estado")?.value;
    let filtrados = state.errores;
    if (filtroEstado) {
        filtrados = filtrados.filter(e => e.estado === filtroEstado);
    }
    const activos = state.errores.filter(e => e.estado === "pendiente").length;
    const resueltos = state.errores.filter(e => e.estado === "resuelto").length;
    if (statActivos) statActivos.innerText = activos;
    if (statResueltos) statResueltos.innerText = resueltos;
    if (filtrados.length === 0) {
        listBody.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 30px; color: var(--text-secondary);">No hay errores registrados</td></tr>';
        return;
    }
    listBody.innerHTML = filtrados.map(e => `<tr><td>${new Date(e.fecha).toLocaleString('es-PE')}</td><td><span class="badge bg-danger">${e.tipo}</span></td><td>${escapeHTML(e.descripcion)}</td><td><span class="badge ${e.estado === 'pendiente' ? 'bg-warning' : 'bg-success'}">${e.estado}</span></td><td>${e.estado === 'pendiente' ? `<button class="btn btn-secondary" style="padding: 4px 8px; font-size: 0.8rem;" onclick="resolveError(${e.id})">Resolver</button>` : ''}</td></tr>`).join("");
}

function renderArchivosView() {
    const formReservas = document.getElementById("archivo-reserva-id");
    const totalBadge = document.getElementById("total-archivos-badge");
    const listaRecientes = document.getElementById("archivos-lista-recientes");
    if (formReservas) {
        formReservas.innerHTML = '<option value="">-- Selecciona una reserva --</option>';
        state.bookings.forEach(b => {
            const opt = document.createElement("option");
            opt.value = b.id;
            opt.innerText = `${b.id} - ${escapeHTML(b.cliente)}`;
            formReservas.appendChild(opt);
        });
    }
    if (totalBadge) totalBadge.innerText = state.archivos.length;
    if (listaRecientes) {
        if (state.archivos.length === 0) {
            listaRecientes.innerHTML = '<p style="text-align: center; padding: 30px 10px; color: var(--text-secondary); font-size: 0.9rem;">No hay archivos aún</p>';
        } else {
            listaRecientes.innerHTML = state.archivos.slice(0, 20).map(a => `<div style="padding: 10px; background: var(--bg-primary); border-radius: var(--border-radius-sm); border-left: 3px solid var(--color-info);"><div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;"><span>${getFileIcon(a.tipo)}</span><span style="font-weight: 500; flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${a.nombre}">${escapeHTML(a.nombre)}</span><span style="font-size: 0.75rem; color: var(--text-muted);">${(a.tamaño / 1024).toFixed(1)} KB</span></div><div style="font-size: 0.75rem; color: var(--text-muted);">${a.reservaId} • ${new Date(a.fecha).toLocaleDateString('es-PE')}</div></div>`).join("");
        }
    }
}

function getFileIcon(tipo) {
    const iconos = {'pasaporte': '📋', 'factura': '📄', 'itinerario': '✈️', 'voucher': '🏨', 'confirmacion': '✅', 'foto': '📷', 'audio': '🎵', 'otro': '📎'};
    return iconos[tipo] || '📎';
}

function getBadgeColor(tipo) {
    const colores = {'crear': 'success', 'actualizar': 'info', 'eliminar': 'danger', 'subir': 'warning', 'login': 'success', 'logout': 'info'};
    return colores[tipo] || 'secondary';
}

function setupNewFeatures() {
    initializeUsersSystem();
    setupLoginSystem();
    const btnLogout = document.getElementById("btn-logout");
    if (btnLogout) {
        btnLogout.addEventListener("click", logout);
    }
    const archivoForm = document.getElementById("archivo-upload-form");
    if (archivoForm) {
        archivoForm.addEventListener("submit", (e) => {
            e.preventDefault();
            handleFileUpload();
        });
    }
    const dropzone = document.getElementById("archivo-dropzone");
    if (dropzone) {
        const fileInput = document.getElementById("archivo-input");
        dropzone.addEventListener("click", () => fileInput.click());
        dropzone.addEventListener("dragover", (e) => {
            e.preventDefault();
            dropzone.style.backgroundColor = "var(--color-info-bg)";
        });
        dropzone.addEventListener("dragleave", () => {
            dropzone.style.backgroundColor = "transparent";
        });
        dropzone.addEventListener("drop", (e) => {
            e.preventDefault();
            dropzone.style.backgroundColor = "transparent";
            if (e.dataTransfer.files.length > 0) {
                fileInput.files = e.dataTransfer.files;
            }
        });
    }
    const filterFecha = document.getElementById("filter-historial-fecha");
    const filterTipo = document.getElementById("filter-historial-tipo");
    const filterErrores = document.getElementById("filter-errores-estado");
    if (filterFecha) filterFecha.addEventListener("change", renderHistorialView);
    if (filterTipo) filterTipo.addEventListener("change", renderHistorialView);
    if (filterErrores) filterErrores.addEventListener("change", renderErroresView);
}

function handleFileUpload() {
    const fileInput = document.getElementById("archivo-input");
    const reservaId = document.getElementById("archivo-reserva-id").value;
    const tipo = document.getElementById("archivo-tipo").value;
    const descripcion = document.getElementById("archivo-descripcion").value;
    if (!reservaId || !tipo || !fileInput.files.length) {
        showAlert("Por favor completa todos los campos", "warning");
        return;
    }
    const file = fileInput.files[0];
    if (file.size > 10 * 1024 * 1024) {
        showAlert("El archivo es demasiado grande (máx. 10MB)", "danger");
        return;
    }
    const archivo = {
        id: Date.now(),
        nombre: file.name,
        tipo: tipo,
        tamaño: file.size,
        mimeType: file.type,
        reservaId: reservaId,
        descripcion: descripcion,
        fecha: new Date(),
        usuario: state.usuarioActual?.nombre || "Usuario"
    };
    state.archivos.unshift(archivo);
    localStorage.setItem("travelOps_archivos", JSON.stringify(state.archivos));
    logEvent("subir", `Archivo subido: ${file.name}`, `Tipo: ${tipo}, Reserva: ${reservaId}`);
    const booking = state.bookings.find(b => b.id === reservaId);
    if (booking) {
        booking.archivos = booking.archivos || [];
        booking.archivos.push(archivo);
    }
    document.getElementById("archivo-upload-form").reset();
    renderArchivosView();
    showAlert("Archivo subido correctamente", "success");
}

function editUser(userId) {
    showAlert("Edición de usuarios disponible próximamente", "info");
}

function resolveError(errorId) {
    const error = state.errores.find(e => e.id === errorId);
    if (error) {
        error.estado = "resuelto";
        localStorage.setItem("travelOps_errores", JSON.stringify(state.errores));
        logEvent("actualizar", `Error ${errorId} marcado como resuelto`);
        renderErroresView();
        showAlert("Error marcado como resuelto", "success");
    }
}

function loadStorageData() {
    const historialStored = localStorage.getItem("travelOps_historial");
    if (historialStored) {
        state.historial = JSON.parse(historialStored);
    }
    const erroresStored = localStorage.getItem("travelOps_errores");
    if (erroresStored) {
        state.errores = JSON.parse(erroresStored);
    }
    const archivosStored = localStorage.getItem("travelOps_archivos");
    if (archivosStored) {
        state.archivos = JSON.parse(archivosStored);
    }
}
