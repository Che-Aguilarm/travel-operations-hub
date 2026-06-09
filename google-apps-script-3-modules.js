/**
 * Google Apps Script - Servidor de Sincronización para 3 Hojas de Cálculo
 * 
 * Sigue estos pasos para configurarlo:
 * 1. Crea 3 archivos de Google Sheets en tu Google Drive:
 *    - Hoja 1: TravelOps_Ventas
 *    - Hoja 2: TravelOps_Operaciones
 *    - Hoja 3: TravelOps_Finanzas
 * 
 * 2. En cada una de las 3 hojas de cálculo, abre "Extensiones" > "Apps Script".
 * 3. Copia y pega este mismo código en el editor de Apps Script de las 3 hojas.
 * 4. Cambia los valores en la sección de CONFIGURACIÓN (fila 25) con los IDs reales de tus hojas.
 * 5. Guarda el proyecto.
 * 6. Haz clic en "Desplegar" > "Nueva implementación".
 * 7. Selecciona tipo "Aplicación web".
 * 8. Configura:
 *    - Ejecutar como: "Yo" (tu cuenta de Google)
 *    - Quién tiene acceso: "Cualquier persona" (Any)
 * 9. Despliega, autoriza los permisos y copia la URL de la aplicación web obtenida.
 * 10. Pega las URLs de la aplicación web en tu archivo app.js en el frontend.
 */

// ==========================================
// SECCIÓN DE CONFIGURACIÓN (REMPLAZAR CON TUS SPREADSHEET IDs)
// ==========================================
// Nota: Puedes obtener el ID de la barra de direcciones de tu navegador al abrir cada hoja.
// Ejemplo: https://docs.google.com/spreadsheets/d/ TU_ID_DE_HOJA_AQUÍ /edit
const SPREADSHEET_IDS = {
  ventas: "1I7aS0Iv04ZOXBFT75AQczgH0KtALB4aiWU2OnnfTd6Y", 
  operaciones: "1lgRwKmdkIZElTs3H2e7sGeVMjKlVQPx5JdkcWeefcuI",
  finanzas: "1EkkD_sDkHMnERZrSkZWAZCm7r6e9xJNVaj6mQ1AoPYs"
};

// ==========================================
// ESTRUCTURA DE CABECERAS (COLUMNAS)
// ==========================================
const MODULE_HEADERS = {
  ventas: [
    "id",
    "cliente",
    "email",
    "telefono",
    "pasaporte",
    "destino",
    "pax",
    "fechaIda",
    "fechaVuelta",
    "precioVenta",
    "moneda",
    "notas",
    "estadoPago",
    "estadoFactura"
  ],
  operaciones: [
    "id",
    "vueloProv",
    "vueloCodigo",
    "vueloCosto",
    "hotelProv",
    "hotelCodigo",
    "hotelCosto",
    "estadoOp",
    "tours",
    "archivos",
    "historial"
  ],
  finanzas: [
    "id",
    "precioVenta",
    "costoVuelo",
    "costoHotel",
    "costoTotal",
    "utilidad",
    "margenPorcentaje",
    "estado"
  ]
};

// ==========================================
// CONTROLADOR DE PETICIONES POST
// ==========================================
function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents || "{}");
    const action = payload.action;
    const moduleName = payload.module;

    if (!moduleName || !MODULE_HEADERS[moduleName]) {
      return jsonResponse({ ok: false, error: "Módulo no especificado o no válido: " + moduleName });
    }

    // Obtener la hoja correspondiente
    const sheet = getSheetConnection(moduleName);

    if (action === "getModule") {
      const data = readSheetData(sheet, MODULE_HEADERS[moduleName]);
      return jsonResponse({ ok: true, data: data });
    }

    if (action === "saveModule") {
      const records = payload.data || [];
      writeSheetData(sheet, MODULE_HEADERS[moduleName], records);
      return jsonResponse({ ok: true, data: { saved: true, count: records.length, timestamp: new Date().toISOString() } });
    }

    return jsonResponse({ ok: false, error: "Acción no soportada: " + action });

  } catch (error) {
    return jsonResponse({ ok: false, error: error.toString() });
  }
}

// ==========================================
// CONEXIÓN Y OPERACIONES DE HOJAS
// ==========================================
function getSheetConnection(moduleName) {
  const sheetName = "BD_" + moduleName.charAt(0).toUpperCase() + moduleName.slice(1);
  const spreadsheetId = SPREADSHEET_IDS[moduleName];
  
  let spreadsheet;
  
  // Si no se configuró ID de hoja, usar la hoja activa (donde está el script)
  if (!spreadsheetId || spreadsheetId.startsWith("REPLICA_")) {
    spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  } else {
    spreadsheet = SpreadsheetApp.openById(spreadsheetId);
  }

  let sheet = spreadsheet.getSheetByName(sheetName);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(sheetName);
  }
  
  return sheet;
}

function readSheetData(sheet, headers) {
  const values = sheet.getDataRange().getValues();
  if (values.length <= 1) return [];

  const firstRow = values[0];
  
  return values.slice(1).filter(row => row.some(cell => cell !== "")).map(row => {
    return headers.reduce((record, header) => {
      const colIndex = firstRow.indexOf(header);
      if (colIndex !== -1) {
        let val = row[colIndex];
        
        // Convertir campos JSON serializados de vuelta a arrays/objetos
        if ((header === "tours" || header === "archivos" || header === "historial") && val) {
          try {
            val = JSON.parse(val);
          } catch(e) {
            val = [];
          }
        }
        record[header] = val;
      } else {
        record[header] = "";
      }
      return record;
    }, {});
  });
}

function writeSheetData(sheet, headers, records) {
  // Limpiar hoja y escribir cabeceras
  sheet.clearContents();
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.setFrozenRows(1);

  if (!records.length) return;

  const rows = records.map(record => {
    return headers.map(header => {
      let val = record[header];
      if (val === undefined || val === null) return "";
      
      // Serializar a JSON los arrays complejos para guardarlos como texto en la celda
      if (Array.isArray(val) || typeof val === "object") {
        return JSON.stringify(val);
      }
      return val;
    });
  });

  sheet.getRange(2, 1, rows.length, headers.length).setValues(rows);
}

function jsonResponse(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
