// Una vez que un usuario se registra y se autentica, se genera un Refresh Token único que se utiliza para obtener nuevos Access Tokens. Este Refresh Token generalmente se mantiene inmutable en condiciones normales, a menos que se realicen acciones específicas que afecten la sesión del usuario, como cambio de contraseña o cierre de session en todos los dispositivos. Dato el .env REFRESH_TOKEN_SECRET debe ser solo del servidor, no se puede subir a repo

// Se define un objeto usersDB que contiene una lista de usuarios y un método para establecer los usuarios
const usersDB = {
    users: require('../models/users.json'), // Se carga la lista de usuarios desde un archivo JSON
    setUsers: function (data) { this.users = data } // Método para establecer los usuarios
}

// Se importan las bibliotecas necesarias: 'jsonwebtoken' para trabajar con tokens JWT y 'dotenv' para cargar variables de entorno
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Se carga la configuración de las variables de entorno desde un archivo '.env'

// Esta función maneja la solicitud de actualización del token de acceso (refresh token)
const handleRefreshToken = (req, res) => {
    const cookies = req.cookies;
    console.log('Cookies:', cookies); // Verifica si las cookies se están recibiendo correctamente

    if (!cookies?.jwt) return res.sendStatus(401); // Si no hay un token JWT en las cookies, se responde con un estado no autorizado (401)

    const refreshToken = cookies.jwt; // Se obtiene el refresh token de las cookies

    // Se busca el usuario en la base de datos usando el refresh token
    const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken);
    if (!foundUser) return res.sendStatus(403); // Si no se encuentra el usuario, se responde con un estado de prohibido (403)

    // Se verifica el refresh token con el secreto almacenado en las variables de entorno
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            // Si hay un error al verificar el token o el nombre de usuario no coincide con el token decodificado, se responde con un estado de prohibido (403)
            if (err || foundUser.username !== decoded.username) return res.sendStatus(403);

            // Se genera un nuevo access token con el nombre de usuario y se firma con un secreto específico, con una vigencia de 30 segundos
            const accessToken = jwt.sign(
                { "username": decoded.username },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '30s' }
            );

            // Se devuelve el nuevo access token en formato JSON como respuesta a la solicitud
            res.json({ accessToken })
        }
    );
}

// Se exporta la función handleRefreshToken para que pueda ser utilizada por otros archivos del proyecto
module.exports = { handleRefreshToken }
