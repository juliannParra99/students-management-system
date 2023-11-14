import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Student() {
  const [students, setStudents] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:8081/")
      .then((res) => setStudents(res.data))
      .catch((err) => console.log(err));
  }, []);

  // async function to handle a student's data using their id 
  const handleDelete = async (id) => {
    try {
      // request to the server to eliminate a record with their id
      await axios.delete("http://localhost:8081/student/" + id);

      // if the elimination was succesfull, reload all the page (IS NOT RECOMENDED; it would be better dinamic charge)
      window.location.reload();
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
                  <td>
                    <Link to={`update/${data.id}`} className="btn btn-primary">
                      Update
                    </Link>
                    <button
                      onClick={(e) => handleDelete(data.id)}
                      className="btn btn-danger ms-2"
                    >
                      {" "}
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
