import axios from "axios";
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function UpdateStudent() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
   // Extraemos el parámetro 'id' de la URL utilizando useParams de React Router
  const {id} = useParams();
  
  function handleSubmit(event) {
    event.preventDefault();
    axios
      .put("http://localhost:8081/update/"+ id , { name, email })
      .then((res) => {
        console.log("Updated student", res);
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
          <h2>Update Student</h2>
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
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateStudent;
