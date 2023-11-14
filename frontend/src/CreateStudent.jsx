//rfc or rfce to create a react component
import axios from "axios";
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateStudent() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  // Importamos la función useNavigate de React Router para manejar la navegación
  const navigate = useNavigate();

  // Función que se ejecuta al enviar el formulario
  function handleSubmit(event) {
    // Evitamos el comportamiento por defecto del formulario que recarga la página
    event.preventDefault();

    // Enviamos una solicitud POST a 'http://localhost:8081/create' con los datos 'name' y 'email'
    axios
      .post("http://localhost:8081/create", { name, email })
      .then((res) => {
        // Cuando la solicitud tiene éxito, mostramos en consola la respuesta y redirigimos al inicio "/"
        console.log("created student", res);
        navigate("/");
      })
      .catch((err) => {
        // En caso de error, mostramos el error en la consola
        console.log(err);
      });
  }
  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        {/* llama a la funcion handleSubmit cuando se envia el formulario */}
        <form onSubmit={handleSubmit}>
          <h2>Add Student</h2>
          <div className="mb-2">
            <label htmlFor="" className="form-label">
              Name
            </label>
            {/* signa el contendio del ese input hasta ese momento y lo asigna a setName que cambia el valor de Name */}
            <input
              type="text"
              className="form-control"
              placeholder="Enter Name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-success">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateStudent;