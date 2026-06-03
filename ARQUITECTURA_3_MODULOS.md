# 📊 TravelOps Hub - Arquitectura de 3 Módulos Separados

## Descripción General

La aplicación ahora utiliza **3 hojas de Google Sheets independientes** para gestionar diferentes aspectos del negocio de viajes. Cada módulo tiene su propia estructura de datos, validaciones y sincronización.

---

## 🎯 Los 3 Módulos

### 1. **MÓDULO VENTAS** 📋
**Propósito**: Gestionar clientes, destinos y precios  
**Hoja Google Sheets**: `GOOGLE_SHEETS_VENTAS_URL`

**Datos en `state.ventas`**:
```javascript
{
  id: "T-0001",
  cliente: "Lenin Aguilar Mamani",
  email: "lenin@empresa.com",
  telefono: "+51 987 654 321",
  pasaporte: "PAS998877",
  destino: "Cuzco, Perú",
  pax: 2,                          // Pasajeros
  fechaIda: "2026-06-15",
  fechaVuelta: "2026-06-22",
  precioVenta: 1500.00,           // Precio que cobra al cliente
  moneda: "USD",
  notas: "Notas especiales...",
  estadoPago: "Pagado",           // Pendiente | Pagado
  estadoFactura: "Facturado"      // Pendiente | Facturado
}
```

**Responsabilidades**:
- ✅ Información completa del cliente
- ✅ Precios de venta
- ✅ Estado de pago y facturación
- ✅ Exportable a CSV para reportes de ventas

**Sincronización**: `GOOGLE_SHEETS_VENTAS_URL`

---

### 2. **MÓDULO OPERACIONES** ✈️
**Propósito**: Gestionar proveedores, tours y estado operativo  
**Hoja Google Sheets**: `GOOGLE_SHEETS_OPERACIONES_URL`

**Datos en `state.operaciones`**:
```javascript
{
  id: "T-0001",
  vueloProv: "LATAM Airlines",    // Proveedor de vuelo
  vueloCodigo: "LA2015",          // Código de reserva
  vueloCosto: 350.00,             // Costo de vuelo
  hotelProv: "Hilton Hotels",     // Proveedor de hotel
  hotelCodigo: "HL-88741",        // Código de reserva
  hotelCosto: 550.00,             // Costo de hotel
  estadoOp: "Confirmado",         // Por Reservar | En Proceso | Confirmado
  tours: [
    {
      id: "tr-1",
      fecha: "2026-06-16",
      titulo: "City Tour Cusco",
      hora: "09:00",
      operador: "Cusco Guides S.A."
    }
  ],
  archivos: [],                   // Documentos adjuntos
  historial: []                   // Cambios realizados
}
```

**Responsabilidades**:
- ✅ Asignación de proveedores (vuelos, hoteles)
- ✅ Costos operativos
- ✅ Tours y actividades
- ✅ Archivos y documentos
- ✅ Historial de cambios

**Sincronización**: `GOOGLE_SHEETS_OPERACIONES_URL`

---

### 3. **MÓDULO FINANZAS** 💰
**Propósito**: Gestionar ingresos, costos y utilidades  
**Hoja Google Sheets**: `GOOGLE_SHEETS_FINANZAS_URL`

**Datos en `state.finanzas`**:
```javascript
{
  id: "T-0001",
  precioVenta: 1500.00,          // Precio vendido al cliente
  costoVuelo: 350.00,            // Costo de vuelo
  costoHotel: 550.00,            // Costo de hospedaje
  costoTotal: 900.00,            // Suma de costos
  utilidad: 600.00,              // Ganancia (precioVenta - costoTotal)
  margenPorcentaje: 40.0,        // % de ganancia
  estado: "Pagado"               // Pendiente | Pagado | Cancelado
}
```

**Responsabilidades**:
- ✅ Cálculo de costos totales
- ✅ Cálculo de utilidades y márgenes
- ✅ Estado de pagos y flujo de caja
- ✅ Reportes financieros

**Sincronización**: `GOOGLE_SHEETS_FINANZAS_URL`

---

## 🔄 Síntesis de Datos (Backward Compatibility)

La aplicación **sintetiza automáticamente** los datos de los 3 módulos en un array `state.bookings` consolidado:

```javascript
// Función synthesizeBookings() combina:
// - Datos de Ventas (cliente, precios)
// - Datos de Operaciones (proveedores, tours)
// - Datos de Finanzas (costos, utilidades)

// El resultado es un objeto completo:
state.bookings = [
  {
    // De VENTAS
    id, cliente, email, telefono, pasaporte, 
    destino, pax, fechaIda, fechaVuelta, 
    precioVenta, moneda, notas, 
    estadoPago, estadoFactura,
    
    // De OPERACIONES
    vueloProv, vueloCodigo, vueloCosto,
    hotelProv, hotelCodigo, hotelCosto,
    estadoOp, tours, archivos, historial,
    
    // De FINANZAS
    costoVuelo, costoHotel, costoTotal,
    utilidad, margenPorcentaje, estadoFinanzas
  }
]
```

**Ventaja**: Todo el código existente funciona sin cambios, pero los datos se guardan de forma separada en Google Sheets.

---

## 🚀 Flujo de Sincronización

### Carga Inicial (Load):
```
DataSource.loadAll()
  ├─ loadModule(ventas) → GOOGLE_SHEETS_VENTAS_URL
  ├─ loadModule(operaciones) → GOOGLE_SHEETS_OPERACIONES_URL  
  ├─ loadModule(finanzas) → GOOGLE_SHEETS_FINANZAS_URL
  └─ loadModule(suppliers) → localStorage
  
synthesizeBookings() → Combina en state.bookings
```

### Guardado (Save):
```
updateStateAndSync()
  ├─ Extrae datos de state.bookings
  ├─ Actualiza state.ventas
  ├─ Actualiza state.operaciones
  ├─ Actualiza state.finanzas
  └─ dataSource.saveAll()
      ├─ Guarda en localStorage
      ├─ Envía a GOOGLE_SHEETS_VENTAS_URL
      ├─ Envía a GOOGLE_SHEETS_OPERACIONES_URL
      └─ Envía a GOOGLE_SHEETS_FINANZAS_URL
```

---

## 🔑 Configuración de URLs

En `app.js` (líneas 416-420), reemplaza con tus URLs de Google Apps Script:

```javascript
const GOOGLE_SHEETS_VENTAS_URL = "https://script.google.com/..."; // Tu URL para Ventas
const GOOGLE_SHEETS_OPERACIONES_URL = "https://script.google.com/..."; // Tu URL para Operaciones
const GOOGLE_SHEETS_FINANZAS_URL = "https://script.google.com/..."; // Tu URL para Finanzas
```

**Si dejas una URL vacía** (`""`):
- Los datos se guardan en **localStorage** solo
- No se sincronizan con Google Sheets
- Puedes usar esto para desarrollo local

---

## 📊 LocalStorage Keys

```javascript
STORAGE_KEYS = {
  ventas: "travelOps_ventas",           // Datos de Ventas
  operaciones: "travelOps_operaciones", // Datos de Operaciones
  finanzas: "travelOps_finanzas",       // Datos de Finanzas
  suppliers: "travelOps_suppliers",     // Catálogo de Proveedores
  bookings: "travelOps_bookings"        // Legacy (backward compatibility)
}
```

---

## 💡 Beneficios de Esta Arquitectura

### 1. **Separación de Responsabilidades**
- Cada módulo tiene sus propios datos y estructura
- Fácil de escalar o cambiar sin afectar otros módulos

### 2. **Diferentes Endpoints de Google Sheets**
- Cada equipo puede tener su propia hoja
- Ventas: acceso a precios y clientes
- Operaciones: acceso a proveedores y tours
- Finanzas: acceso a costos e ingresos

### 3. **Mejor Control de Permisos**
- Compartir la hoja de Ventas solo con el equipo de ventas
- Compartir la hoja de Operaciones solo con operadores
- Compartir la hoja de Finanzas solo con contadores

### 4. **Sincronización Independiente**
- Si la hoja de Ventas falla, las Operaciones y Finanzas siguen funcionando
- Cada módulo se sincroniza por separado

### 5. **Backward Compatibility**
- El código existente sigue funcionando
- Las vistas (Ventas, Operaciones, Finanzas) no necesitan cambios
- Todo se sintetiza automáticamente en `state.bookings`

---

## 🔧 Desarrollador: Cómo Funciona Internamente

### Crear una Nueva Venta:
```javascript
// 1. Usuario completa formulario en "Ventas"
const newBooking = { id, cliente, email, ... };
state.bookings.push(newBooking);

// 2. updateStateAndSync() es llamado
updateStateAndSync() {
  // Extrae datos de bookings hacia los 3 módulos
  state.ventas = [...];           // Información del cliente + precio
  state.operaciones = [...];      // Datos vacíos (a completar)
  state.finanzas = [...];         // Cálculos automáticos
  
  // Guarda en Google Sheets
  dataSource.saveAll(...);
}
```

### Editar Operación de Reserva:
```javascript
// 1. Usuario completa "Asignar Proveedor" en "Operaciones"
booking.vueloProv = "LATAM";
booking.vueloCosto = 350;

// 2. updateStateAndSync() sincroniza
// - state.operaciones se actualiza con vueloProv y vueloCosto
// - state.finanzas recalcula: utilidad = precioVenta - (vueloCosto + hotelCosto)
// - state.ventas se mantiene igual (solo información del cliente)
```

---

## 📋 Datos Iniciales

Los datos iniciales están separados en 3 constantes:

- **INITIAL_VENTAS** (línea ~261): 4 clientes con precios
- **INITIAL_OPERACIONES** (línea ~295): Tours y proveedores asignados
- **INITIAL_FINANZAS** (línea ~335): Costos y utilidades calculadas

Cuando la app carga, si Google Sheets está vacío o deshabilitado, usa estos datos iniciales.

---

## 🧪 Testing

### Test 1: Verificar que los 3 módulos se cargan
```javascript
// En console:
console.log(state.ventas.length);      // Debe ser > 0
console.log(state.operaciones.length); // Debe ser > 0
console.log(state.finanzas.length);    // Debe ser > 0
```

### Test 2: Crear una venta y verificar síntesis
```javascript
// Los 3 módulos deben sincronizarse
updateStateAndSync();
console.log(state.bookings.length);    // Debe tener los mismos IDs que ventas
```

### Test 3: Verificar localStorage
```javascript
// En console:
JSON.parse(localStorage.getItem("travelOps_ventas")).length
JSON.parse(localStorage.getItem("travelOps_operaciones")).length
JSON.parse(localStorage.getItem("travelOps_finanzas")).length
```

---

## 🎯 Próximos Pasos

1. **Configurar Google Apps Script** para cada módulo
   - Crear 3 hojas en Google Sheets
   - Crear 3 Apps Script endpoints

2. **Actualizar URLs** en app.js

3. **Probar sincronización** de cada módulo

4. **Implementar permisos** por rol (quién ve qué módulo)

---

## ❓ Preguntas Frecuentes

**P: ¿Puedo usar solo una hoja en lugar de 3?**  
R: Sí, deja las URLs vacías y usa localStorage. Si quieres sincronizar en el futuro, solo completa las URLs.

**P: ¿Qué pasa si una URL es inválida?**  
R: La app usa localStorage automáticamente y muestra un warning en console.

**P: ¿Cómo cambio la estructura de datos de un módulo?**  
R: Edita INITIAL_VENTAS, INITIAL_OPERACIONES o INITIAL_FINANZAS según corresponda.

**P: ¿Es compatible con el código antiguo?**  
R: Sí 100%. El sistema de síntesis mantiene `state.bookings` actualizado.

---

**Última actualización**: Junio 2026  
**Versión**: 2.1 (3 Módulos Separados)
