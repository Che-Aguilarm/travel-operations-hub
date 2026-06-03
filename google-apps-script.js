const SHEETS = {
  bookings: "Reservas",
  suppliers: "Proveedores"
};

const DRIVE_ROOT_FOLDER_NAME = "TravelOps Hub";

const BOOKING_HEADERS = [
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
  "vueloProv",
  "vueloCodigo",
  "vueloCosto",
  "hotelProv",
  "hotelCodigo",
  "hotelCosto",
  "estadoPago",
  "estadoFactura",
  "estadoOp",
  "tours",
  "archivos"
];

const SUPPLIER_HEADERS = [
  "id",
  "nombre",
  "tipo",
  "contacto",
  "email",
  "telefono",
  "detalles"
];

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents || "{}");

    if (body.action === "getAll") {
      return jsonResponse({
        ok: true,
        data: {
          bookings: readObjects(SHEETS.bookings, BOOKING_HEADERS).map(normalizeBooking),
          suppliers: readObjects(SHEETS.suppliers, SUPPLIER_HEADERS)
        }
      });
    }

    if (body.action === "saveAll") {
      writeObjects(SHEETS.bookings, BOOKING_HEADERS, body.bookings || [], serializeBooking);
      writeObjects(SHEETS.suppliers, SUPPLIER_HEADERS, body.suppliers || []);
      return jsonResponse({ ok: true, data: { savedAt: new Date().toISOString() } });
    }

    if (body.action === "uploadFile") {
      const uploadedFile = uploadDriveFile(body);
      return jsonResponse({ ok: true, data: uploadedFile });
    }

    return jsonResponse({ ok: false, error: "Accion no soportada." });
  } catch (error) {
    return jsonResponse({ ok: false, error: error.message });
  }
}

function setupTravelOpsSheets() {
  ensureSheet(SHEETS.bookings, BOOKING_HEADERS);
  ensureSheet(SHEETS.suppliers, SUPPLIER_HEADERS);
}

function readObjects(sheetName, headers) {
  const sheet = ensureSheet(sheetName, headers);
  const values = sheet.getDataRange().getValues();
  if (values.length <= 1) return [];

  return values.slice(1).filter(row => row.some(cell => cell !== "")).map(row => {
    return headers.reduce((record, header, index) => {
      record[header] = row[index];
      return record;
    }, {});
  });
}

function writeObjects(sheetName, headers, records, serializer) {
  const sheet = ensureSheet(sheetName, headers);
  sheet.clearContents();
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

  if (!records.length) return;

  const rows = records.map(record => {
    const rowRecord = serializer ? serializer(record) : record;
    return headers.map(header => rowRecord[header] ?? "");
  });

  sheet.getRange(2, 1, rows.length, headers.length).setValues(rows);
}

function ensureSheet(sheetName, headers) {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName(sheetName) || spreadsheet.insertSheet(sheetName);
  const firstRow = sheet.getRange(1, 1, 1, headers.length).getValues()[0];
  const hasHeaders = firstRow.some(value => value !== "");

  if (!hasHeaders) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.setFrozenRows(1);
  } else {
    headers.forEach((header, index) => {
      if (firstRow[index] !== header) {
        sheet.getRange(1, index + 1).setValue(header);
      }
    });
  }

  return sheet;
}

function serializeBooking(booking) {
  return {
    ...booking,
    tours: JSON.stringify(booking.tours || []),
    archivos: JSON.stringify(booking.archivos || [])
  };
}

function normalizeBooking(booking) {
  return {
    ...booking,
    pax: Number(booking.pax || 0),
    precioVenta: Number(booking.precioVenta || 0),
    vueloCosto: Number(booking.vueloCosto || 0),
    hotelCosto: Number(booking.hotelCosto || 0),
    tours: parseJsonList(booking.tours),
    archivos: parseJsonList(booking.archivos)
  };
}

function uploadDriveFile(payload) {
  if (!payload.bookingId) throw new Error("Falta bookingId.");
  if (!payload.fileName) throw new Error("Falta fileName.");
  if (!payload.base64Data) throw new Error("Falta base64Data.");

  const rootFolder = getOrCreateFolder(DriveApp, DRIVE_ROOT_FOLDER_NAME);
  const bookingFolder = getOrCreateFolder(rootFolder, payload.bookingId);
  const bytes = Utilities.base64Decode(payload.base64Data);
  const blob = Utilities.newBlob(bytes, payload.mimeType || "application/octet-stream", payload.fileName);
  const file = bookingFolder.createFile(blob);

  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

  return {
    id: file.getId(),
    name: file.getName(),
    url: file.getUrl(),
    mimeType: file.getMimeType(),
    size: file.getSize(),
    uploadedAt: new Date().toISOString()
  };
}

function getOrCreateFolder(parent, folderName) {
  const folders = parent.getFoldersByName(folderName);
  if (folders.hasNext()) return folders.next();
  return parent.createFolder(folderName);
}

function parseJsonList(value) {
  if (!value) return [];
  if (Array.isArray(value)) return value;

  try {
    return JSON.parse(value);
  } catch (error) {
    return [];
  }
}

function jsonResponse(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
