const studentsModel = require("../models/studentsModel");

const getAllStudents = async (req, res) => {
  try {
    // Obtener todos los estudiantes desde el modelo
    // sincrono(del que se espera que se traigan los datos y puede tomar tiempo por que es una funcion asincrona) de ese metodo del modelo. Y despues de eso si todo sale bien, la respuesta de esa funcion asincrona (res) envia ek cidugi 200 junto con el json con los datos si  los hay,
    const students = await studentsModel.getStudents();

    // Si no se encuentran estudiantes, se responde con un array vacío ([]),
    // de lo contrario, se responde con los estudiantes obtenidos
    return res.status(200).json(students || []);
  } catch (error) {
    // Si ocurre un error durante la obtención de estudiantes,
    // se registra el error y se envía una respuesta de error con el código 500
    console.error("Error fetching students:", error);
    return res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};

const createNewStudent = (req, res) => {
  const sqlPost = "INSERT INTO students (`Name`, `Email`) VALUES (?)";

  const values = [req.body.name, req.body.email];

  db.query(sqlPost, [values], (error, data) => {
    if (error) {
      console.error("Error executing query:", error);
      return res
        .status(500)
        .json({ error: "Internal Server Error", details: error });
    } else {
      console.log("Added succesfully");
      return res.status(200).json(data);
    }
  });
};

const updateStudent = (req, res) => {
  const sqlPut = "update students set `Name` = ?, `Email`= ?  where ID = ? ";

  //en esta parte el backend extrae los datos que le fueron enviados en el front en :
  //axios.put("http://localhost:8081/update/"+ id , { name, email })

  const values = [req.body.name, req.body.email];

  const id = req.params.id;

  // Esta expresión utiliza el spread operator (...) para expandir los valores del array values y luego agrega el id al final del array.
  db.query(sqlPut, [...values, id], (error, data) => {
    if (error) {
      console.error("Error executing query:", error);
      return res
        .status(500)
        .json({ error: "Internal Server Error", details: error });
    } else {
      console.log("Updated succesfully");
      return res.status(200).json(data);
    }
  });
};

const deleteStudent = (req, res) => {
  const sqlDelete = "DELETE FROM students  WHERE ID = ? ";

  const id = req.params.id;

  db.query(sqlDelete, [id], (error, data) => {
    if (error) {
      console.error("Error executing query:", error);
      return res
        .status(500)
        .json({ error: "Internal Server Error", details: error });
    } else {
      console.log("Deleted succesfully");
      return res.status(200).json(data);
    }
  });
};

module.exports = {
  getAllStudents,
  createNewStudent,
  updateStudent,
  deleteStudent,
};
