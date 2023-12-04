// Importa el archivo que contiene los orígenes permitidos
const allowedOrigins = require('../config/allowedOrigins');

// ste código define un middleware llamado credentials que verifica si el origen de la solicitud (origin) está presente en la lista de orígenes permitidos (allowedOrigins).
// Middleware de manejo de credenciales
const credentials = (req, res, next) => {
    // Obtiene el origen de la solicitud del encabezado
    const origin = req.headers.origin;

    // Verifica si el origen está incluido en la lista de orígenes permitidos
    if (allowedOrigins.includes(origin)) {
        // Si el origen está permitido, establece el encabezado 'Access-Control-Allow-Credentials' en true en la respuesta
        res.header('Access-Control-Allow-Credentials', true);
    }

    // Continúa con el siguiente middleware
    next();
}

// Exporta la función 'credentials' para que esté disponible para otros archivos
module.exports = credentials;
