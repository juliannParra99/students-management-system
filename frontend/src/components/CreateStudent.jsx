//rfc or rfce to create a react component
import axios from "axios";
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateStudent() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [city, setCity] = useState("");
  // Importamos la función useNavigate de React Router para manejar la navegación
  const navigate = useNavigate();

  // Función que se ejecuta al enviar el formulario
  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post("http://localhost:8081/create", { name, email, phoneNumber, city })
      .then((res) => {
        console.log("created student", res);
        navigate("/");
      })
      .catch((err) => {
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
          <div className="mb-2">
            <label htmlFor="" className="form-label">
              Phone Number
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Phone Number"
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="" className="form-label">
              City
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Current City"
              onChange={(e) => setCity(e.target.value)}
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
