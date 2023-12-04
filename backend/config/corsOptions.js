// Se importa el módulo 'allowedOrigins' desde un archivo local
const allowedOrigins = require('./allowedOrigins');

// Se define un objeto 'corsOptions'
const corsOptions = {
    // La propiedad 'origin' verifica si el origen de la solicitud está permitido
    origin: (origin, callback) => {
        // Se comprueba si el origen de la solicitud está presente en la lista 'allowedOrigins'
        // o si no se proporciona ningún origen (indicado por !origin)
        // Si el origin está presente en la lista de orígenes permitidos (allowedOrigins.indexOf(origin) !== -1) o si el origin no está definido (!origin), entonces se ejecutará la siguiente parte del código.
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            // Si el origen está permitido o no se proporciona ninguno, se llama al 'callback' con 'null' y 'true'
            callback(null, true);
        } else {
            // Si el origen no está permitido, se llama al 'callback' con un Error
            callback(new Error('Not allowed by CORS'));
        }
    },
    // Opcionalmente, se define el código de estado de éxito para las opciones pre-vuelo (preflight)
    optionsSuccessStatus: 200
}

// Se exporta el objeto 'corsOptions' para que pueda ser utilizado por otros módulos
module.exports = corsOptions;
