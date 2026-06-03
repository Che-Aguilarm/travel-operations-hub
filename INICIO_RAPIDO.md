# 🚀 Inicio Rápido: Arquitectura de 3 Módulos

## ⚡ En 5 Minutos

### Paso 1: Ver el Resultado
```bash
npm start
# Abre http://localhost:3000
```

### Paso 2: Verificar en la Consola
```javascript
// Abre F12 → Console y copia:
console.log("Ventas:", state.ventas.length);
console.log("Operaciones:", state.operaciones.length);
console.log("Finanzas:", state.finanzas.length);
console.log("Bookings (síntesis):", state.bookings.length);
```

Expected output:
```
Ventas: 4
Operaciones: 4
Finanzas: 4
Bookings (síntesis): 4
```

---

## 📋 Qué Cambió

### Antes
- 1 hoja de Google Sheets (`state.bookings`)
- Todo mezclado en un array

### Después ✨
- 3 hojas separadas:
  - `state.ventas` - Cliente, email, precios
  - `state.operaciones` - Vuelos, hoteles, tours
  - `state.finanzas` - Costos, utilidades
- `state.bookings` se genera automáticamente (síntesis)

---

## 🔧 Configurar Google Sheets (Opcional)

Si quieres sincronizar con Google Sheets:

### 1. Edita app.js (línea 416-420)
```javascript
const GOOGLE_SHEETS_VENTAS_URL = "TU_URL_AQUI";
const GOOGLE_SHEETS_OPERACIONES_URL = "TU_URL_AQUI";
const GOOGLE_SHEETS_FINANZAS_URL = "TU_URL_AQUI";
```

### 2. Ve a GOOGLE_SHEETS_SETUP.md
Sigue los pasos para crear Google Apps Script con los 3 endpoints.

### 3. Prueba
Click en **Sincronizar con Google Sheets** (botón en barra superior)

---

## 📊 Estructura de Datos

### state.ventas[]
```javascript
{
  id: "T-0001",
  cliente: "Lenin Aguilar",
  email: "lenin@empresa.com",
  telefono: "+51 987 654 321",
  pasaporte: "PAS998877",
  destino: "Cuzco, Perú",
  pax: 2,
  fechaIda: "2026-06-15",
  fechaVuelta: "2026-06-22",
  precioVenta: 1500.00,
  moneda: "USD",
  notas: "Notas del cliente",
  estadoPago: "Pagado",        // ← Nuevo campo
  estadoFactura: "Facturado"   // ← Nuevo campo
}
```

### state.operaciones[]
```javascript
{
  id: "T-0001",
  vueloProv: "LATAM Airlines",
  vueloCodigo: "LA2015",
  vueloCosto: 350.00,
  hotelProv: "Hilton Hotels",
  hotelCodigo: "HL-88741",
  hotelCosto: 550.00,
  estadoOp: "Confirmado",
  tours: [{ id, fecha, titulo, hora, operador }],
  archivos: [],
  historial: []
}
```

### state.finanzas[]
```javascript
{
  id: "T-0001",
  precioVenta: 1500.00,
  costoVuelo: 350.00,
  costoHotel: 550.00,
  costoTotal: 900.00,
  utilidad: 600.00,
  margenPorcentaje: 40.0,
  estado: "Pagado"
}
```

### state.bookings[] (AUTO-SINTETIZADO)
```javascript
// Combinación automática de:
// - Campos de state.ventas
// - Campos de state.operaciones
// - Campos de state.finanzas
{
  id, cliente, email, telefono, pasaporte, destino, pax, fechaIda, fechaVuelta,
  precioVenta, moneda, notas, estadoPago, estadoFactura,
  vueloProv, vueloCodigo, vueloCosto, hotelProv, hotelCodigo, hotelCosto, estadoOp,
  tours, archivos, historial,
  costoVuelo, costoHotel, costoTotal, utilidad, margenPorcentaje, estadoFinanzas
}
```

---

## 🎯 Casos de Uso

### Crear una Nueva Venta
```javascript
// Se guarda en state.ventas
// Se genera registro automático en state.operaciones (vacío)
// Se calcula registro en state.finanzas (utilidad = 0 sin costos)
```

### Asignar Vuelo (Operaciones)
```javascript
// Se actualiza: state.operaciones[id].vueloProv = "LATAM"
// Se actualiza: state.operaciones[id].vueloCosto = 350
// Se recalcula: state.finanzas[id].utilidad, margenPorcentaje
```

### Ver Finanzas
```javascript
// Se lee desde: state.finanzas[id]
// Los cálculos se hacen automáticamente en updateStateAndSync()
```

---

## 💾 LocalStorage

Los datos se guardan en 5 claves:

```javascript
localStorage.getItem("travelOps_ventas")        // Array de ventas
localStorage.getItem("travelOps_operaciones")   // Array de operaciones
localStorage.getItem("travelOps_finanzas")      // Array de finanzas
localStorage.getItem("travelOps_suppliers")     // Catálogo de proveedores
localStorage.getItem("travelOps_bookings")      // Legacy (no se usa)
```

Para ver los datos:
```javascript
console.table(JSON.parse(localStorage.getItem("travelOps_ventas")));
```

---

## 🔄 Sincronización

### Automática (cada cambio)
```
Usuario hace cambio en la UI
    ↓
updateStateAndSync()
    ├─ Extrae datos de bookings a los 3 módulos
    ├─ Guarda en localStorage
    └─ Envía a Google Sheets (si está configurado)
```

### Manual
Click en **Sincronizar con Google Sheets** carga los datos desde Google Sheets.

---

## 🧪 Checklist de Verificación

- [ ] App carga sin errores
- [ ] `state.ventas.length > 0`
- [ ] `state.operaciones.length > 0`
- [ ] `state.finanzas.length > 0`
- [ ] `state.bookings.length === state.ventas.length`
- [ ] localStorage tiene 5 claves
- [ ] Las vistas (Ventas, Operaciones, Finanzas) funcionan
- [ ] Puedo crear una nueva venta
- [ ] Puedo asignar un proveedor
- [ ] Los cálculos de finanzas son correctos

---

## 📚 Documentación Completa

- **ARQUITECTURA_3_MODULOS.md** - Detalles técnicos completos
- **GOOGLE_SHEETS_SETUP.md** - Guía Apps Script
- **RESUMEN_CAMBIOS.md** - Cambios realizados

---

## 🆘 Si Algo Falla

### Error: "TypeError: Cannot read property 'map' of undefined"
```javascript
// Solución: Verifica que state.ventas, operaciones y finanzas estén inicializados
console.log(state.ventas); // Debe ser un array [], no undefined
```

### Error: "No hay datos"
```javascript
// Solución: Los datos iniciales no se cargaron
localStorage.clear();
location.reload();
// Debería cargar INITIAL_VENTAS, INITIAL_OPERACIONES, INITIAL_FINANZAS
```

### Error: "Google Sheets no responde"
```javascript
// Solución: Verifica las URLs en app.js (línea 416-420)
console.log(GOOGLE_SHEETS_VENTAS_URL); // Debe tener una URL válida
```

---

## 🎓 Arquitectura Simplificada

```
USUARIO EDITA: Estado → modifica state.bookings
                   ↓
            updateStateAndSync()
                   ↓
        ┌─────────┼─────────┐
        ↓         ↓         ↓
    Ventas    Operaciones  Finanzas    (localStorage)
        │         │         │
        └─────────┼─────────┘
            (Google Sheets - opcional)
```

---

## ✨ Lo Mejor de Todo

✅ **Sin cambios en la UI** - Las vistas funcionan exactamente igual  
✅ **Backward compatible** - El código antiguo sigue funcionando  
✅ **Separación de responsabilidades** - Cada módulo es independiente  
✅ **Fácil de escalar** - Agregar módulos nuevos es simple  
✅ **Datos más seguros** - Cada equipo puede tener su hoja de Google  

---

## 📞 Soporte Rápido

```javascript
// Ver estado actual
console.log({ ventas: state.ventas.length, operaciones: state.operaciones.length, finanzas: state.finanzas.length, bookings: state.bookings.length })

// Forzar sincronización
updateStateAndSync();

// Limpiar datos locales
localStorage.clear(); location.reload();

// Ver una venta específica
console.table(state.bookings[0]);
```

---

**¡Listo para usar!** 🎉

Versión: 2.1 | Arquitectura: 3 Módulos Separados | Fecha: Junio 2026
