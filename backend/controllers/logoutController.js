const usersDB = {
    users: require("../models/users.json"), // Carga los usuarios desde un archivo JSON
    setUsers: function (data) {
      this.users = data;
    }, // Función para establecer los usuarios en usersDB
  };
  
  const fsPromises = require("fs").promises; // Módulo para manejar operaciones de archivo de forma asíncrona
  const path = require("path"); // Módulo para manejar rutas de archivos
  
  const handleLogout = async (req, res) => {
    // En el cliente, también se elimina el accessToken
  
    const cookies = req.cookies; // Obtiene las cookies de la solicitud
    if (!cookies?.jwt) return res.sendStatus(204); // Si no hay un token JWT en las cookies, envía el código de estado 204 (No Content)
    const refreshToken = cookies.jwt; // Obtiene el refreshToken de las cookies
  
    try {
      // ¿Está el refreshToken en la base de datos?
      const foundUser = usersDB.users.find(
        (person) => person.refreshToken === refreshToken
      );
       // Busca un usuario con el refreshToken dado
      if (!foundUser) {
        res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true }); // Borra la cookie jwt
        return res.sendStatus(204); // Envía el código de estado 204 (No Content) ; IMP: en produccion tenemos que agregar  , secure: true, pero aca lo dejamos asi para que esto funcione apropidamente de momento; ; tmabien agregar el maxAge: 24 * 60 * 60 * 1000
      }
  
      // Eliminar refreshToken en la base de datos
      const otherUsers = usersDB.users.filter(
        (person) => person.refreshToken !== foundUser.refreshToken
      ); // Filtra los usuarios para eliminar el refreshToken actual
      
      const currentUser = { ...foundUser, refreshToken: "" }; // Crea un nuevo objeto de usuario con refreshToken vacío
      usersDB.setUsers([...otherUsers, currentUser]); // Actualiza la base de datos de usuarios con el usuario actualizado
      
      await fsPromises.writeFile(
        path.join(__dirname, "..", "models", "users.json"), // Escribe la base de datos de usuarios actualizada en un archivo JSON
        JSON.stringify(usersDB.users) // Convierte los usuarios a formato JSON
      );
      //igual que lo que puse en auth controller, para que el frontend pueda conectarse con el server necesitamos el secure: true, pero podemos omitirlo mientras solo trabajemos con el back; en este caso no ponemos el Age. Cuando usamos el frontend es util por que aveces thunder client nos meustra todo okay pero en el browser no.
      res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true }); // Borra la cookie jwt; IMP: en produccion tenemos que agregar  , secure: true, pero aca lo dejamos asi para que esto funcione apropidamente de momento
      res.sendStatus(204); // Envía el código de estado 204 (No Content)
      console.log("Logout succesfully");
      
    } catch (err) {
      console.error('Error: ', err);
      return res.status(500).json({ "message": err});
  
    }
  };
  
  module.exports = { handleLogout }; // Exporta la función handleLogout para que esté disponible fuera de este archivo