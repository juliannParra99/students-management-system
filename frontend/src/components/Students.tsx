import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Student() {
  const [students, setStudents] = useState<any[]>([]);

  useEffect(() => {
    // Función para obtener la lista de estudiantes
    const getStudents = async () => {
      try {
        const res = await axios.get("http://localhost:8081/");
        setStudents(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getStudents();
  }, []);

  // Función para eliminar un estudiante sin recargar la página
  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:8081/student/" + id);
      // Actualiza la lista de estudiantes excluyendo el estudiante eliminado por su ID
      setStudents(students.filter(student => student.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  //here we will be show our data from our backend
  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <Link className="btn btn-success" to={"/create"}>
          Add +{" "}
        </Link>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>City</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              //mapeo a traves del array students
              students.map((data, i) => (
                // asigna un identificador unico a cada fila
                <tr key={i}>
                  <td>{data.Name}</td>
                  <td>{data.Email}</td>
                  <td>{data.PhoneNumber}</td>
                  <td>{data.City}</td>
                  <td>
                    <Link to={`update/${data.id}`} className="btn btn-primary">
                      Update
                    </Link>
                    <button
                      onClick={(e) => handleDelete(data.id)}
                      className="btn btn-danger ms-2"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Student;
