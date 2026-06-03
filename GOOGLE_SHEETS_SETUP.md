# 🔧 Guía: Configurar Google Apps Script para 3 Módulos

Esta guía te ayuda a crear 3 endpoints en Google Apps Script, uno para cada módulo (Ventas, Operaciones, Finanzas).

---

## 📋 Resumen Rápido

Necesitas crear **3 Google Apps Scripts** (o 1 con 3 endpoints), cada uno con:
- Una hoja de Google Sheets asociada
- Un `doPost()` endpoint
- Funciones para `getModule()` y `saveModule()`

---

## 🚀 Opción 1: Un Solo Apps Script con 3 Endpoints (Recomendado)

### Paso 1: Crear Google Sheets

1. Abre [Google Drive](https://drive.google.com)
2. Crea **3 hojas nuevas** llamadas:
   - `TravelOps_Ventas`
   - `TravelOps_Operaciones`
   - `TravelOps_Finanzas`

3. En cada hoja, crea encabezados en la fila 1:

**TravelOps_Ventas**:
```
ID | Cliente | Email | Teléfono | Pasaporte | Destino | PAX | Fecha Ida | Fecha Vuelta | Precio Venta | Moneda | Notas | Estado Pago | Estado Factura
```

**TravelOps_Operaciones**:
```
ID | Vuelo Prov | Vuelo Código | Vuelo Costo | Hotel Prov | Hotel Código | Hotel Costo | Estado Op | Tours | Archivos | Historial
```

**TravelOps_Finanzas**:
```
ID | Precio Venta | Costo Vuelo | Costo Hotel | Costo Total | Utilidad | Margen % | Estado
```

### Paso 2: Crear Apps Script

1. En la hoja `TravelOps_Ventas`, ve a **Extensiones → Apps Script**
2. Copia este código en `Code.gs`:

```javascript
// Google Apps Script - Endpoint para 3 Módulos TravelOps

// IDs de las hojas (reemplaza con los tuyos)
const SHEETS = {
  VENTAS: "TravelOps_Ventas",
  OPERACIONES: "TravelOps_Operaciones",
  FINANZAS: "TravelOps_Finanzas"
};

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const action = data.action;
    
    if (action === "getModule") {
      const module = data.module;
      return success(getModule(module));
    } else if (action === "saveModule") {
      const module = data.module;
      const moduleData = data.data;
      saveModule(module, moduleData);
      return success({ saved: true });
    } else {
      return error("Acción no reconocida");
    }
  } catch (err) {
    return error(err.toString());
  }
}

function getModule(moduleName) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEETS[moduleName.toUpperCase()]);
  if (!sheet) return [];
  
  const data = sheet.getDataRange().getValues();
  if (data.length <= 1) return []; // Solo hay encabezados
  
  const headers = data[0];
  const rows = data.slice(1);
  
  return rows.map(row => {
    const obj = {};
    headers.forEach((header, idx) => {
      obj[header] = row[idx];
    });
    return obj;
  });
}

function saveModule(moduleName, moduleData) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEETS[moduleName.toUpperCase()]);
  if (!sheet) return;
  
  // Limpiar datos existentes (excepto encabezados)
  const lastRow = sheet.getLastRow();
  if (lastRow > 1) {
    sheet.deleteRows(2, lastRow - 1);
  }
  
  // Escribir nuevos datos
  if (moduleData.length === 0) return;
  
  const headers = Object.keys(moduleData[0]);
  const rows = moduleData.map(item => headers.map(h => item[h]));
  
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  if (rows.length > 0) {
    sheet.getRange(2, 1, rows.length, headers.length).setValues(rows);
  }
}

function success(data) {
  return ContentService.createTextOutput(
    JSON.stringify({ ok: true, data: data })
  ).setMimeType(ContentService.MimeType.JSON);
}

function error(message) {
  return ContentService.createTextOutput(
    JSON.stringify({ ok: false, error: message })
  ).setMimeType(ContentService.MimeType.JSON);
}
```

### Paso 3: Desplegar Apps Script

1. Click en **Desplegar** (parte superior derecha)
2. Selecciona **Desplegar como > Nueva implementación**
3. Selecciona **Tipo: Aplicación web**
4. **Ejecutar como**: Tu correo
5. **Quién tiene acceso**: Solo tú (o público si quieres)
6. Click **Desplegar**
7. Copia la **URL del endpoint** que aparece

---

## 🎯 Opción 2: 3 Apps Scripts Separados

Si prefieres tener 3 endpoints completamente independientes:

### Para cada módulo:

1. Crea una hoja de Google Sheets
2. Abre **Extensiones → Apps Script**
3. Copia el código anterior (modificando solo el nombre de la hoja):

```javascript
const SHEET_NAME = "TravelOps_Ventas"; // Cambiar para cada endpoint

function doPost(e) {
  // ... (mismo código que arriba, pero sin el objeto SHEETS)
}

function getModule() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  // ... resto del código
}
```

4. Repite para Operaciones y Finanzas

---

## 📝 Configurar TravelOps Hub

Una vez tengas los endpoints:

### Si usaste Opción 1 (Un solo Apps Script):
Edita `app.js` y usa la **misma URL** para los 3 módulos:

```javascript
const GOOGLE_SHEETS_VENTAS_URL = "https://script.google.com/macros/s/AKfycbz.../exec";
const GOOGLE_SHEETS_OPERACIONES_URL = "https://script.google.com/macros/s/AKfycbz.../exec";
const GOOGLE_SHEETS_FINANZAS_URL = "https://script.google.com/macros/s/AKfycbz.../exec";
```

### Si usaste Opción 2 (3 Apps Scripts):
Usa **diferentes URLs**:

```javascript
const GOOGLE_SHEETS_VENTAS_URL = "https://script.google.com/macros/s/URL_VENTAS/exec";
const GOOGLE_SHEETS_OPERACIONES_URL = "https://script.google.com/macros/s/URL_OPERACIONES/exec";
const GOOGLE_SHEETS_FINANZAS_URL = "https://script.google.com/macros/s/URL_FINANZAS/exec";
```

---

## 🧪 Probar la Sincronización

### En TravelOps Hub:

1. Abre http://localhost:3000
2. Crea una nueva venta (Módulo Ventas)
3. Click en **Sincronizar con Google Sheets** (botón superior)
4. Verifica que los datos aparezcan en las 3 hojas de Google

### En la Consola (F12):

```javascript
// Ver datos cargados
console.log(state.ventas);
console.log(state.operaciones);
console.log(state.finanzas);

// Ver bookings sintetizados
console.log(state.bookings);
```

---

## ⚠️ Solución de Problemas

### Error: "Respuesta inválida de Google Sheets"
- Verifica que la URL sea correcta
- Revisa que el Apps Script esté desplegado como "Aplicación web"
- Abre el Apps Script y haz una **nueva implementación**

### Error: "No se encontró la hoja"
- Verifica el nombre de la hoja en `SHEETS`
- Asegúrate de que el nombre coincida exactamente

### Los datos no se sincronizan
- Abre la consola (F12) y ve los errores
- Verifica que el Apps Script esté en la carpeta correcta
- Prueba con `curl` desde terminal:

```bash
curl -X POST https://script.google.com/macros/s/URL/exec \
  -H "Content-Type: application/json" \
  -d '{"action":"getModule","module":"ventas"}'
```

### La hoja está llena de valores vacíos
- El código está intentando escribir celdas que no existen
- Modifica la hoja para tener más columnas:

```javascript
// En Apps Script, aumenta el rango:
sheet.getRange(2, 1, rows.length, Math.max(headers.length, 20)).setValues(rows);
```

---

## 📊 Estructura de Datos Esperada

El Apps Script espera que los datos lleguen en este formato:

```json
{
  "action": "saveModule",
  "module": "ventas",
  "data": [
    {
      "id": "T-0001",
      "cliente": "Lenin Aguilar",
      "email": "lenin@empresa.com",
      ...
    }
  ]
}
```

Y retorna:

```json
{
  "ok": true,
  "data": {
    "saved": true
  }
}
```

---

## 🔐 Seguridad

### ⚠️ Actualmente el Apps Script es público
Si quieres restringirlo:

1. En el Apps Script, ve a **Desplegar > Nuevo despliegue**
2. **Ejecutar como**: Tu correo
3. **Quién tiene acceso**: Solo tú
4. Luego comparte el enlace solo con personas de confianza

### Para producción:
- Agrega autenticación (API key, Bearer token)
- Valida los datos antes de guardar
- Usa HTTPS (ya es así)

---

## 📝 Referencia Rápida

```javascript
// Estructura de módulos esperada:

// VENTAS
{ id, cliente, email, telefono, pasaporte, destino, pax, fechaIda, fechaVuelta, 
  precioVenta, moneda, notas, estadoPago, estadoFactura }

// OPERACIONES
{ id, vueloProv, vueloCodigo, vueloCosto, hotelProv, hotelCodigo, hotelCosto,
  estadoOp, tours, archivos, historial }

// FINANZAS  
{ id, precioVenta, costoVuelo, costoHotel, costoTotal, utilidad, margenPorcentaje, estado }
```

---

**Última actualización**: Junio 2026

¿Necesitas ayuda? Revisa el código en `app.js` línea 416 para ver cómo se llaman estos endpoints.
