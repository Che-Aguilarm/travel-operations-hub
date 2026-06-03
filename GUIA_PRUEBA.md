# 🚀 GUÍA RÁPIDA DE PRUEBA

## Paso 1: Inicia la Aplicación
```bash
npm start
# O
node server.js
```

Abre: `http://localhost:3000`

## Paso 2: Login
- Se abrirá automáticamente el modal de login
- Usuario: `admin`
- Contraseña: `1234`
- Marca "Recordar mi usuario" (opcional)
- Haz clic en "Iniciar Sesión"

## Paso 3: Prueba Cada Característica

### 3.1 Gestión de Usuarios
1. Haz clic en "Gestión de Usuarios" en el sidebar
2. Verás la lista de usuarios con sus roles
3. Arriba a la derecha ves tu perfil con:
   - Avatar con tus iniciales
   - Tu nombre
   - Tu rol
   - Tu email
   - Última conexión
   - Duración de sesión (en minutos)
4. Haz clic en "Cerrar Sesión" para logout

### 3.2 Historial de Cambios
1. Haz clic en "Historial de Cambios" en el sidebar
2. Deberías ver al menos tu login registrado
3. Prueba los filtros:
   - **Filtro de Fecha**: Selecciona la fecha de hoy
   - **Filtro de Tipo**: Selecciona "login"
4. Los registros mostrarán:
   - Fecha y hora exacta
   - Usuario que realizó la acción
   - Tipo de acción (login, crear, etc.)
   - Descripción de la acción

### 3.3 Registro de Errores
1. Haz clic en "Registro de Errores" en el sidebar
2. Inicialmente puede estar vacío
3. En la parte superior ves contadores:
   - **Errores Activos**: Número de errores pendientes
   - **Resueltos**: Número de errores resueltos
4. Prueba el filtro de estado para ver diferentes categorías

### 3.4 Carga de Archivos
1. Haz clic en "Carga de Archivos" en el sidebar
2. Completa el formulario:
   - **Selecciona la Reserva**: Elige una reserva (ej: T-0001)
   - **Tipo de Archivo**: Selecciona una categoría (ej: Factura/Recibo)
   - **Selecciona Archivo**: Puedes:
     - Arrastra un archivo desde tu computadora
     - O haz clic para abrir el explorador de archivos
   - **Descripción** (opcional): Añade notas
3. Haz clic en "Subir Archivo"
4. En el panel derecho "Archivos Recientes" verás el archivo subido:
   - Icono del tipo de archivo
   - Nombre del archivo
   - Tamaño en KB
   - ID de la reserva
   - Fecha de subida

## Paso 4: Genera Más Registros

Para ver el historial con más datos:

1. **Crea una nueva reserva**:
   - Vuelve al "Módulo de Ventas"
   - Completa el formulario de venta
   - Haz clic en "Registrar y Enviar a Google Sheets"
   - Verás un nuevo registro en el historial

2. **Sube más archivos**:
   - Vuelve a "Carga de Archivos"
   - Sube otro archivo con diferente tipo
   - Cada subida se registra en el historial

3. **Marca un error como resuelto**:
   - Si hay errores en "Registro de Errores"
   - Haz clic en "Resolver"
   - Verás el estado cambiar a "Resuelto"

## Paso 5: Persistencia de Datos

**Los datos se guardan automáticamente**:
- Actualiza la página (F5 o Ctrl+R)
- Tu sesión se mantiene si marcaste "Recordar usuario"
- El historial, errores y archivos persisten
- Todos los datos están en localStorage del navegador

## Paso 6: Múltiples Usuarios

Prueba con otros usuarios:

1. Haz logout desde "Gestión de Usuarios"
2. Se abrirá automáticamente el modal de login
3. Intenta con:
   - Usuario: `lenin.aguilar` / Contraseña: `1234`
   - Usuario: `maria.torres` / Contraseña: `1234`
4. Cada usuario verá su perfil diferente
5. El historial registrará quién realizó cada acción

## Notas de Prueba

✅ **Archivo de prueba**: Puedes usar cualquier archivo pequeño:
- Documento Word/PDF
- Imagen PNG/JPG
- Archivo de audio MP3
- Hoja de cálculo XLSX
- Archivo de texto TXT

✅ **Tamaño máximo**: 10 MB

✅ **Límite de almacenamiento**: ~5-10 MB en localStorage (depende del navegador)

✅ **Limpiar datos**: En la consola del navegador:
```javascript
localStorage.clear();
location.reload();
```

## Solución de Problemas

❌ **Modal de login no aparece**
- Limpia localStorage: `localStorage.clear()`
- Recarga la página: `Ctrl+R` o `F5`

❌ **Archivos no se guardan**
- Verifica que tienes almacenamiento disponible en localStorage
- En algunos navegadores privados esto puede estar deshabilitado

❌ **Historial vacío**
- Realiza algunas acciones (crea una reserva, sube un archivo)
- Los cambios se registran automáticamente

---

**¡Listo! Ahora puedes probar todas las características implementadas. ✅**
