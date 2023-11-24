const usersDB = {
  // Objeto que almacena y emula la funcionalidad de un estado similar a useState de React
  users: require("../models/db_connection/users.json"), // Carga los datos de usuarios desde un archivo JSON
  setUsers: function (data) {
    this.users = data;
  }, // Método para establecer los datos de usuarios
};

const bcrypt = require("bcrypt");

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body; // Extrae el usuario y la contraseña del cuerpo de la solicitud
  // Verifica si el usuario y la contraseña fueron proporcionados
  if (!user || !pwd)
    return res.status(401).json({"Message":"Please complete all the fields"});

  try {
    // Busca al usuario en la base de datos simulada
    const foundUser = usersDB.users.find((person) => person.username === user);
    // Si el usuario no existe, devuelve Unauthorized (401)
    if (!foundUser) return res.status(401).json({"Message":"The username or password is incorrect"});//Unauthorized
    // Compara la contraseña proporcionada con la contraseña almacenada en la base de datos
    const match = await bcrypt.compare(pwd, foundUser.password);
    // Si las contraseñas coinciden se devuelve un mensaje de éxito; AQUI TAMBIEN SE DEBERIA COLOCAR UN JWT PARA MANEJAR EL ACCESO DEL USUARIO A LAS RUTAS DESPUES DEL LOGIN
    if (match) {
      res.json({ success: `User ${user} is logged in!` });
      console.log("User logged successfully")
    } else {
      // Si las contraseñas no coinciden, se devuelve Unauthorized (401)
      res.status(401).json({"Message":"The username or password is incorrect"});
    }
  } catch (err) {
    console.log(err)
    // Manejo de errores en caso de que ocurra algún problema
    res.status(500).json({ 'message': err });
  }
};

module.exports = { handleLogin };
