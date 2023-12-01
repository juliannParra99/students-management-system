// Creación de una base de datos de usuarios en memoria y configuración de sus funciones
const usersDB = {
  // Array de usuarios cargado desde un archivo JSON
  users: require('../models/users.json'),
  // Función para actualizar los usuarios en la base de datos
  setUsers: function (data) { this.users = data }
}

// Importación de módulos necesarios
const bcrypt = require('bcrypt'); // Módulo para el hash y comparación de contraseñas
const jwt = require('jsonwebtoken'); // Módulo para la creación y verificación de tokens JWT
require('dotenv').config(); // Módulo para la gestión de variables de entorno
const fsPromises = require('fs').promises; // Módulo para operaciones asíncronas con archivos
const path = require('path'); // Módulo para la gestión de rutas de archivos

// Función para manejar el inicio de sesión
const handleLogin = async (req, res) => {
  // Extraer el nombre de usuario y la contraseña del cuerpo de la solicitud
  const { user, pwd } = req.body;
  // Verificar si el nombre de usuario y la contraseña están presentes en la solicitud
  if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });
  
  // Buscar al usuario en la base de datos de usuarios
  const foundUser = usersDB.users.find(person => person.username === user);
  // Si no se encuentra el usuario, enviar una respuesta de 'No autorizado' (401)
  if (!foundUser) return res.sendStatus(401); //Unauthorized 
  
  // Comparar la contraseña proporcionada con la contraseña almacenada del usuario encontrado
  const match = await bcrypt.compare(pwd, foundUser.password);
  // Si la contraseña coincide
  if (match) {
      // Crear tokens JWT para el usuario (Access Token y Refresh Token)
      const accessToken = jwt.sign(
          { "username": foundUser.username },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: '30s' }
      );
      const refreshToken = jwt.sign(
          { "username": foundUser.username },
          process.env.REFRESH_TOKEN_SECRET,
          { expiresIn: '1d' }
      );

      // Guardar el Refresh Token junto con el usuario actualizado en la base de datos de usuarios
      const otherUsers = usersDB.users.filter(person => person.username !== foundUser.username);
      const currentUser = { ...foundUser, refreshToken };
      usersDB.setUsers([...otherUsers, currentUser]);

      // Escribir los cambios en el archivo JSON que contiene la base de datos de usuarios
      await fsPromises.writeFile(
          path.join(__dirname, '..', 'models', 'users.json'),
          JSON.stringify(usersDB.users)
      );

      // Configurar una cookie en la respuesta HTTP con el Refresh Token
      res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
      
      // Enviar una respuesta JSON con el Access Token
      res.json({ accessToken });
  } else {
      // Si la contraseña no coincide, enviar una respuesta de 'No autorizado' (401)
      res.sendStatus(401);
  }
}

// Exportar la función handleLogin para su uso en otros archivos
module.exports = { handleLogin };

