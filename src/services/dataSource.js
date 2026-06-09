const dataSource = {
    // Verificar si está habilitada la sincronización remota para cada módulo
    get isVentasEnabled() {
        return GOOGLE_SHEETS_VENTAS_URL.trim().length > 0;
    },
    get isOperacionesEnabled() {
        return GOOGLE_SHEETS_OPERACIONES_URL.trim().length > 0;
    },
    get isFinanzasEnabled() {
        return GOOGLE_SHEETS_FINANZAS_URL.trim().length > 0;
    },
    get isRemoteEnabled() {
        // Compatibilidad con código antiguo
        return this.isVentasEnabled || this.isOperacionesEnabled || this.isFinanzasEnabled;
    },

    async loadAll() {
        // Cargar Ventas
        const ventas = await this.loadModule("ventas", GOOGLE_SHEETS_VENTAS_URL, STORAGE_KEYS.ventas, []);
        
        // Cargar Operaciones
        const operaciones = await this.loadModule("operaciones", GOOGLE_SHEETS_OPERACIONES_URL, STORAGE_KEYS.operaciones, []);
        
        // Cargar Finanzas
        const finanzas = await this.loadModule("finanzas", GOOGLE_SHEETS_FINANZAS_URL, STORAGE_KEYS.finanzas, []);
        
        // Cargar Proveedores (mantener como antes, no cambia)
        const suppliers = loadLocalCollection(STORAGE_KEYS.suppliers, INITIAL_SUPPLIERS);

        return { ventas, operaciones, finanzas, suppliers };
    },

    async loadModule(moduleName, url, storageKey, fallbackData) {
        if (url && url.trim().length > 0) {
            try {
                const remoteData = await this.request(url, "getModule", { module: moduleName });
                if (remoteData && Array.isArray(remoteData)) {
                    localStorage.setItem(storageKey, JSON.stringify(remoteData));
                    return remoteData;
                }
            } catch (error) {
                console.warn(`No se pudo cargar ${moduleName} desde Google Sheets. Usando copia local.`, error);
            }
        }
        return loadLocalCollection(storageKey, fallbackData);
    },

    async saveAll(ventas, operaciones, finanzas, suppliers) {
        // Guardar en localStorage siempre
        localStorage.setItem(STORAGE_KEYS.ventas, JSON.stringify(ventas));
        localStorage.setItem(STORAGE_KEYS.operaciones, JSON.stringify(operaciones));
        localStorage.setItem(STORAGE_KEYS.finanzas, JSON.stringify(finanzas));
        localStorage.setItem(STORAGE_KEYS.suppliers, JSON.stringify(suppliers));

        const results = [];

        // Guardar cada módulo en su URL correspondiente
        if (this.isVentasEnabled) {
            try {
                const result = await this.request(GOOGLE_SHEETS_VENTAS_URL, "saveModule", { 
                    module: "ventas", 
                    data: ventas 
                });
                results.push({ module: "ventas", ...result });
            } catch (error) {
                console.warn("No se pudo guardar Ventas en Google Sheets.", error);
                results.push({ module: "ventas", source: "local", error: error.message });
            }
        } else {
            results.push({ module: "ventas", source: "local" });
        }

        if (this.isOperacionesEnabled) {
            try {
                const result = await this.request(GOOGLE_SHEETS_OPERACIONES_URL, "saveModule", { 
                    module: "operaciones", 
                    data: operaciones 
                });
                results.push({ module: "operaciones", ...result });
            } catch (error) {
                console.warn("No se pudo guardar Operaciones en Google Sheets.", error);
                results.push({ module: "operaciones", source: "local", error: error.message });
            }
        } else {
            results.push({ module: "operaciones", source: "local" });
        }

        if (this.isFinanzasEnabled) {
            try {
                const result = await this.request(GOOGLE_SHEETS_FINANZAS_URL, "saveModule", { 
                    module: "finanzas", 
                    data: finanzas 
                });
                results.push({ module: "finanzas", ...result });
            } catch (error) {
                console.warn("No se pudo guardar Finanzas en Google Sheets.", error);
                results.push({ module: "finanzas", source: "local", error: error.message });
            }
        } else {
            results.push({ module: "finanzas", source: "local" });
        }

        return results;
    },

    async uploadFile(bookingId, file) {
        if (!this.isVentasEnabled) {
            throw new Error("Configura GOOGLE_SHEETS_VENTAS_URL para subir archivos a Drive.");
        }

        const dataUrl = await fileToDataUrl(file);
        const base64Data = dataUrl.split(",")[1];

        return await this.request(GOOGLE_SHEETS_VENTAS_URL, "uploadFile", {
            bookingId,
            fileName: file.name,
            mimeType: file.type || "application/octet-stream",
            base64Data
        });
    },

    async request(url, action, payload = {}) {
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify({ action, ...payload })
        });

        const result = await response.json();
        if (!result.ok) {
            throw new Error(result.error || "Respuesta invalida de Google Sheets.");
        }

        return result.data;
    }
};
