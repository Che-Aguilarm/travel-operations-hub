const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.svg': 'image/svg+xml',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif'
};

const server = http.createServer((req, res) => {
    console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);

    // Resolver ruta de archivo
    let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
    
    // Obtener extensión
    const extname = path.extname(filePath);
    let contentType = MIME_TYPES[extname] || 'application/octet-stream';

    // Leer archivo
    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                // Archivo no encontrado
                fs.readFile(path.join(__dirname, 'index.html'), (err, html) => {
                    if (err) {
                        res.writeHead(500);
                        res.end('Error interno del servidor');
                    } else {
                        res.writeHead(404, { 'Content-Type': 'text/html' });
                        res.end('<h1>404 - No Encontrado</h1><p>El recurso solicitado no existe.</p>');
                    }
                });
            } else {
                // Error del servidor
                res.writeHead(500);
                res.end(`Error del servidor: ${error.code}`);
            }
        } else {
            // Éxito
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log('\n==================================================');
    console.log(`🚀 SERVIDOR DE DESARROLLO INICIADO CON ÉXITO`);
    console.log(`👉 Dirección local: http://localhost:${PORT}`);
    console.log('==================================================\n');
    console.log('Presiona Ctrl+C para detener el servidor.\n');
});
