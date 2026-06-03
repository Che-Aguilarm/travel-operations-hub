# Conectar TravelOps Hub con Google Sheets

## 1. Crear la hoja

1. Crea un Google Sheet nuevo.
2. Ve a **Extensiones > Apps Script**.
3. Pega el contenido de `google-apps-script.js`.
4. Guarda el proyecto.
5. Ejecuta una vez la funcion `setupTravelOpsSheets`.
6. Acepta los permisos.

Esto creara las pestañas:

- `Reservas`
- `Proveedores`

Tambien preparara la columna `archivos` en `Reservas`. Los archivos reales no se guardan dentro de Sheets: se suben a una carpeta de Google Drive llamada `TravelOps Hub`, con subcarpetas por reserva, por ejemplo `T-0001`.

## 2. Publicar el Apps Script

1. En Apps Script, ve a **Implementar > Nueva implementacion**.
2. Tipo: **Aplicacion web**.
3. Ejecutar como: **Yo**.
4. Quien tiene acceso: **Cualquier persona con el enlace**.
5. Publica y copia la URL de la aplicacion web.

## 3. Pegar la URL en la app

En `app.js`, cambia:

```js
const GOOGLE_SHEETS_WEB_APP_URL = "";
```

por:

```js
const GOOGLE_SHEETS_WEB_APP_URL = "https://script.google.com/macros/s/TU_URL/exec";
```

## 4. Probar

Ejecuta:

```bash
npm run dev
```

Abre:

```text
http://localhost:3000
```

Cuando la URL este configurada, la app cargara `Reservas` y `Proveedores` desde Google Sheets. Cada cambio tambien quedara guardado en `localStorage` como respaldo.

## 5. Subir archivos a Drive desde Operaciones

1. Abre una reserva en **Operaciones y Reservas**.
2. En **Archivos del Viaje en Drive**, selecciona uno o varios archivos.
3. Haz clic en **Subir a Drive**.

Soporta archivos como:

- MP4
- MP3
- PDF
- JPG/JPEG
- PNG
- WEBP
- DOC/DOCX
- XLS/XLSX
- CSV

Si cambias `google-apps-script.js`, vuelve a publicar una nueva version de la implementacion web en Apps Script para que los cambios tomen efecto.
