# ✈️ TravelOps Hub - Plataforma de Operaciones de Viajes

TravelOps Hub es una plataforma web premium de tipo SPA (Single Page Application) diseñada especialmente para agencias de viajes que requieren integrar de forma transparente e instantánea sus flujos de **Ventas**, **Operaciones** y **Finanzas**, con una sincronización visual en tiempo real tipo **Google Sheets**.

Desarrollada con código nativo ultra eficiente (HTML5, Vanilla CSS y ES6 Javascript), la aplicación ofrece una interfaz interactiva de alta fidelidad, animaciones fluidas, persistencia local de datos (`localStorage`) y soporte completo para temas claro/oscuro.

---

## 🌟 Módulos y Características

### 1. 📋 Módulo de Ventas (Ventas)
*   **Formulario Premium**: Permite el registro estructurado de clientes (nombre, correo, teléfono, pasaporte), detalles del viaje (destino, número de viajeros, fechas de ida/retorno, precio de venta pactado y notas).
*   **Envío Automatizado**: Al guardar un registro, la información se inyecta de forma instantánea en la base de datos simulada de Google Sheets.
*   **Historial Dinámico**: Muestra el historial de ventas recientes con etiquetas de estado ("Por Reservar", "En Proceso", "Confirmado") y estatus de sincronización.

### 2. 💚 Google Sheets Live (Tabular Centralizado)
*   **Simulador de Hoja de Cálculo**: Una grilla verde interactiva inspirada en Google Sheets.
*   **Edición Directa**: Doble clic sobre cualquier celda para editar el valor de inmediato. Al presionar **Enter** o salir de la celda, los cambios se propagan instantáneamente a todas las demás vistas (Ventas, Operaciones y Finanzas).
*   **Barra de Fórmulas**: Al hacer clic en una celda, se muestra su indicador de fila/columna (ej: `B2`) y su contenido en la barra de fórmulas superior.
*   **Exportación CSV**: Botón para descargar de forma real un archivo `.csv` con la base de datos completa.
*   **Animación de Sincronización**: Efecto visual de sincronización en la nube con Google Drive al realizar cambios.

### 3. ⚙️ Operaciones y Reservas (Operaciones)
*   **Tablero Kanban**: Visualización ágil de viajes agrupados por estado operativo:
    *   *Por Reservar*: Ventas nuevas que requieren atención de vuelos y hoteles.
    *   *En Proceso*: Reservas iniciadas con proveedores.
    *   *Confirmado*: Viajes completamente listos para el cliente.
*   **Asignador de Reservas**: Haz clic en cualquier tarjeta para abrir un modal premium donde podrás:
    *   Asignar proveedores de vuelos (aerolíneas), ingresar localizadores PNR y costos asociados.
    *   Asignar hoteles o hostales asociados, códigos de confirmación y costos de estadía.
    *   Ver el margen de utilidad y rentabilidad estimado en tiempo real antes de guardar.

### 4. 💵 Finanzas y Pagos (Finanzas)
*   **Métricas Financieras (KPIs)**: Tarjetas ejecutivas con Ingresos Totales, Costos de Proveedores, Margen Operativo Neto, Utilidad (%) y Cuentas por Cobrar de clientes con pagos pendientes.
*   **Libro Contable (Ledger)**: Tabla completa donde los márgenes de ganancia están condicionados por color (verde: alto margen >30%, naranja: margen regular 15-30%, rojo: bajo margen <15%).
*   **Controles Interactivos**: Cambia el estado de pago ("Pagado", "Pendiente") o facturación del cliente directamente en la tabla y observa cómo se actualiza el sistema.
*   **Generador de Facturas Premium**: Haz clic en "Factura" para ver un recibo de cobro profesional con desglose de IGV/impuestos, listo para **Imprimir o Guardar en PDF** directamente mediante los estilos de impresión optimizados de la app.

### 5. 👥 Base de Proveedores (Directorio)
*   **Directorio Integrado**: Listado de aerolíneas, hoteles y hostales asociados con sus datos de contacto (teléfono, correo, ejecutivo de cuenta) y notas sobre tarifas especiales de convenio.

---

## 🛠️ Cómo Ejecutar el Proyecto Localmente

Para asegurar la máxima compatibilidad y evitar dependencias de internet lentas en la instalación, se incluye un servidor de desarrollo nativo en Node.js ultra-rápido de cero dependencias.

### Pasos para Ejecutar:

1.  Abre una terminal de PowerShell o Command Prompt en la carpeta del proyecto.
2.  Ejecuta el servidor de desarrollo utilizando npm:
    ```bash
    npm run dev
    ```
3.  Abre tu navegador web e ingresa a la siguiente dirección:
    ```
    http://localhost:3000
    ```

*¡Listo! La plataforma guardará de forma automática cualquier cambio que realices en el `localStorage` de tu navegador, por lo que podrás recargar y mantener tus datos intactos.*
