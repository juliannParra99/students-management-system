// Importación de módulos necesarios
const jwt = require("jsonwebtoken"); // Importación del módulo jsonwebtoken para la verificación de tokens JWT
require("dotenv").config(); // Importación del módulo dotenv para la configuración de variables de entorno

// Middleware para verificar el token JWT en las solicitudes entrantes
const verifyJWT = (req, res, next) => {
  const authHeader = req.headers["authorization"]; // Obtención del encabezado 'Authorization' de la solicitud
  if (!authHeader) return res.sendStatus(401); // Si no hay encabezado 'Authorization', se envía una respuesta de 'No autorizado' (401)

  console.log(authHeader); // Imprimir el encabezado 'Authorization' (ejemplo: Bearer token)

  const token = authHeader.split(" ")[1]; // Extracción del token JWT del encabezado 'Authorization' (formato: 'Bearer token')

  // Verificación del token JWT utilizando jsonwebtoken y el secreto, identificando posibles errores o invalidez del token
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403); // Si hay un error o el token es inválido, se envía una respuesta de 'Prohibido' (403)

    // Si el token es válido, se agrega la información decodificada del usuario al objeto de solicitud (req)
    req.user = decoded.username;
    next(); // Continuar con la ejecución del siguiente middleware o ruta
  });
};

module.exports = verifyJWT; // Exportación del middleware verifyJWT para su uso en otros archivos
