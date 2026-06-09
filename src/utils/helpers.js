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

function getFileIcon(tipo) {
    const iconos = {'pasaporte': '📋', 'factura': '📄', 'itinerario': '✈️', 'voucher': '🏨', 'confirmacion': '✅', 'foto': '📷', 'audio': '🎵', 'otro': '📎'};
    return iconos[tipo] || '📎';
}

function getBadgeColor(tipo) {
    const colores = {'crear': 'success', 'actualizar': 'info', 'eliminar': 'danger', 'subir': 'warning', 'login': 'success', 'logout': 'info'};
    return colores[tipo] || 'secondary';
}

const GOOGLE_SHEETS_VENTAS_URL = "https://script.google.com/macros/s/AKfycbxsTqOgy31oVaXlz40T1COhl7Q6PWNa8ItmLgartYS3qJ1bB64tRWOewgMmFOgyeM4UPA/exec"; // Hoja de VENTAS (clientes, precios)
const GOOGLE_SHEETS_OPERACIONES_URL = "https://script.google.com/macros/s/AKfycbz1fEC286ZjxZlMKg7OT7vOHlmwVI3S3RgeCLhKfXIhDNr3TT3IegcTR8FGlN85FVeFBQ/exec"; // Hoja de OPERACIONES (reservas, proveedores)
const GOOGLE_SHEETS_FINANZAS_URL = "https://script.google.com/macros/s/AKfycbwnxOctlRjiOg3DOG5cIHA-0NvNGfk4pz61720bD3a6vGcNk1xfqc4vl6xc7GAKbGwC/exec"; // Hoja de FINANZAS (ingresos, costos)

const STORAGE_KEYS = {
    // Nuevas claves para módulos separados
    ventas: "travelOps_ventas",
    operaciones: "travelOps_operaciones",
    finanzas: "travelOps_finanzas",
    suppliers: "travelOps_suppliers",
    // Legacy key (para compatibilidad backward)
    bookings: "travelOps_bookings"
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



window.GOOGLE_SHEETS_VENTAS_URL = GOOGLE_SHEETS_VENTAS_URL;
window.GOOGLE_SHEETS_OPERACIONES_URL = GOOGLE_SHEETS_OPERACIONES_URL;
window.GOOGLE_SHEETS_FINANZAS_URL = GOOGLE_SHEETS_FINANZAS_URL;

window.STORAGE_KEYS = STORAGE_KEYS;
window.loadLocalCollection = loadLocalCollection;
window.fileToDataUrl = fileToDataUrl;
window.state = state;
