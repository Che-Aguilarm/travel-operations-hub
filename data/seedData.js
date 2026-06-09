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


const INITIAL_USERS = [
    { id: 1, nombre: "Admin", username: "admin", password: "1234", rol: "Administrador", email: "admin@travelops.com", activo: true },
    { id: 2, nombre: "Lenin Aguilar", username: "lenin.aguilar", password: "1234", rol: "Gerente General", email: "lenin@empresa.com", activo: true },
    { id: 3, nombre: "María Torres", username: "maria.torres", password: "1234", rol: "Operario", email: "maria@empresa.com", activo: true }
];

const MONTH_NAMES = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];