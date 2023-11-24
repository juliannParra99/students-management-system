const usersDB = {
    // Objeto que almacena y emula la funcionalidad de un estado similar a useState de React
    users: require('../models/db_connection/users.json'), // Carga los datos de usuarios desde un archivo JSON
    setUsers: function (data) { this.users = data } // Método para establecer los datos de usuarios
}

const fsPromises = require('fs').promises; // Módulo del sistema de archivos para promesas
const path = require('path'); // Módulo de ruta para manipulación de rutas de archivos
const bcrypt = require('bcrypt'); // Biblioteca para el hash de contraseñas

// Función para manejar la creación de un nuevo usuario; utiliza async / await con bcrypt
const handleNewUser = async (req, res) => {
    const { user, pwd } = req.body;

    // Verifica si se proporcionaron tanto el nombre de usuario como la contraseña
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });

    // Comprueba si el nombre de usuario ya existe en la base de datos simulada
    const duplicate = usersDB.users.find(person => person.username === user);
    if (duplicate){
        console.log("That username already exists. Please choose another one.");
        return res.status(409).json({"message" : "That username already exists. Please choose another one."});
    }

    try {
        // Genera el hash de la contraseña con bcrypt
        const hashedPwd = await bcrypt.hash(pwd, 10);
        const newUser = { "username": user, "password": hashedPwd }; // Crea un nuevo usuario con la contraseña hasheada

        // Ruta del archivo JSON de usuarios
        const filePath = path.join(__dirname, '..', 'models', 'db_connection', 'users.json');
        
        // Lee los datos existentes de usuarios del archivo JSON
        const existingData = await fsPromises.readFile(filePath, 'utf8');
        let users = existingData ? JSON.parse(existingData) : []; // Convierte los datos en un array de usuarios

        users.push(newUser); // Agrega el nuevo usuario al array existente

        // Escribe los datos actualizados de usuarios de vuelta al archivo JSON
        await fsPromises.writeFile(filePath, JSON.stringify(users, null, 2), 'utf8');

        // Actualiza los datos de usuarios en el objeto usersDB
        usersDB.setUsers(users);
        // Después de agregar el nuevo usuario a usersDB.users
        const userAdded = usersDB.users[usersDB.users.length - 1]; // Obtiene el último usuario añadido

        console.log(JSON.stringify(userAdded)); // Muestra el último usuario agregado en formato JSON
        // Respuesta de éxito indicando la creación del nuevo usuario
        return res.status(201).json({ "success": "created" });
    } catch (err) {
        console.log(err)
        // Manejo de errores en caso de que ocurra algún problema
        res.status(500).json({ 'message': err.message });
    }
}




// Exporting the handleNewUser function to be used in other parts of the application
module.exports = { handleNewUser };