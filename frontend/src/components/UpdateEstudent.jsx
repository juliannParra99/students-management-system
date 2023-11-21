import axios from "axios";
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function UpdateStudent() {
  // Obtiene el parámetro ID de la URL
  const { id } = useParams();
  const navigate = useNavigate();
  // Estado para los campos editables del formulario
  const [name, setName] = useState(""); // Campo editable: Nombre
  const [email, setEmail] = useState(""); // Campo editable: Correo
  const [phoneNumber, setPhoneNumber] = useState(""); // Campo editable: Número de teléfono
  const [city, setCity] = useState(""); // Campo editable: Ciudad

  // Estado para almacenar los datos del estudiante
  // eslint-disable-next-line no-unused-vars
  const [studentData, setStudentData] = useState({
    Name: "", // Datos del estudiante: Nombre
    Email: "", // Datos del estudiante: Correo
    PhoneNumber: "", // Datos del estudiante: Número de teléfono
    City: "", // Datos del estudiante: Ciudad
  });

  //Definimos esto para retulizar cuando queremos volver a una ruta. Inclusive se podria modularizar en una carpeta.
  const redirectTo = '/'; // Definir la ruta de destino como constante

  const handleButtonClick = () => {
    // Realiza alguna lógica o acción aquí si es necesario antes de la navegación
    // Navega a la ruta de destino al presionar el botón usando la constante
    navigate(redirectTo);
  };

  // Al cargar el componente, realiza la solicitud GET para obtener los datos del estudiante
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/update/${id}`);
        const data = response.data[0];

        // Almacena los datos del estudiante en el estado studentData
        setStudentData(data);

        // Establece los valores precargados en los estados correspondientes para edición
        setName(data.Name);
        setEmail(data.Email);
        setPhoneNumber(data.PhoneNumber);
        setCity(data.City);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    fetchData();
  }, [id]);

  // Actualiza el estado studentData con los valores editados por el usuario
  useEffect(() => {
    setStudentData((prevData) => ({
      ...prevData,
      Name: name,
      Email: email,
      PhoneNumber: phoneNumber,
      City: city,
    }));
  }, [name, email, phoneNumber, city]);

  function handleSubmit(event) {
    event.preventDefault();

    // Usamos los datos actuales del estudiante almacenados en studentData
    axios
      .put(`http://localhost:8081/update/${id}`, {
        name: studentData.Name,
        email: studentData.Email,
        phoneNumber: studentData.PhoneNumber,
        city: studentData.City,
      })
      .then((res) => {
        console.log("Updated student", res);
        handleButtonClick();
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
              value={name}
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
              value={email}
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
              value={phoneNumber}
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
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-success">
            Update
          </button>
          <button  onClick={handleButtonClick} type="button" className="btn btn-danger m-2">
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateStudent;
