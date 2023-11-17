//el models usualmente: alberga la lógica que se encarga de interactuar directamente con la base de datos o cualquier otro almacenamiento persistente. Esto incluye consultas,  operaciones CRUD (Crear, Leer, Actualizar, Eliminar) y cualquier manipulación de datos. Que luego se las pasa al controller; en este caso saque la conexion a la db del controller y lo puse en el models: inclusive podria poner la conexion a la base de datos en otro archivo en el models e importarlo.
const db = require('./db_connection/dbConnection')

const getStudents = async () => {
  // Consulta SQL para seleccionar todos los estudiantes
  const sqlGet = "SELECT * FROM students";

  try {
    // Ejecución de la consulta a la base de datos utilizando async/await
    //la desestructuracion  extrae los datos directamente. El promise es un cambio que implementamos para mejorar la calidad del codigo. Puesto que es un dato que se espera ser devuelto de la base de datos, puede tardar un tiempo por eso el promis
    const [data] = await db.promise().query(sqlGet);

    // Retorna los datos obtenidos de la consulta exitosa
    return data;
  } catch (error) {
    // En caso de error, registra el error y lanza una excepción para ser manejada por el código que llama a esta función
    console.error("Error executing query:", error);
    throw error;
  }
};


module.exports = {
  getStudents,
};
