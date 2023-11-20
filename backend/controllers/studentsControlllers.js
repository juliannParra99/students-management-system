const studentsModel = require("../models/studentsModel");

//datp: el retorno de datos una vez los datos son traidos de la db una vez todo haya salido bien, no  es necesario en operaciones como put, post o delete ya que el principal ovbjetivo de esto es modificar o agregar datos en la  db y no retornar. Sin embargo, puede ser beneficioso a futuro hacer o dejar el return por si eventualemente se agrega logica en la db de que cuano se realiza esa consulta , ademas se ejecute una trida de datos releventas.por lo que en este punto lo dejaremos retornado, como en este caso: return res.status(200).json(result);

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
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

const createNewStudent = async (req, res) => {
  try {
    const { name, email, phoneNumber, city  } = req.body;
    const result = await studentsModel.createStudent(name, email, phoneNumber, city);

    console.log("Added successfully");
    return res.status(200).json(result);
  } catch (error) {
    console.error("Error creating new student:", error);
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phoneNumber, city } = req.body;

    const result = await studentsModel.updateStudentData(id, name, email, phoneNumber, city);
    
    console.log("Updated successfully");
    return res.status(200).json(result);
  } catch (error) {
    console.error("Error updating student:", error);
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

const getStudentById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await studentsModel.getStudentForId(id);
    
    console.log("Updated successfully");
    return res.status(200).json(result);
  } catch (error) {
    console.error("Error updating student:", error);
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
}

const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await studentsModel.deleteStudentData(id);

    console.log("Deleted successfully");
    return res.status(200).json(result);
  } catch (error) {
    console.error("Error deleting student:", error);
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

module.exports = {
  getAllStudents,
  createNewStudent,
  updateStudent,
  getStudentById,
  deleteStudent,
};
