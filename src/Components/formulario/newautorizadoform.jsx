// NewAutorizadoForm.jsx
import React, { useState } from "react";
import axios from "axios";

function NewAutorizadoForm({ onSubmitSuccess }) {
  const [newAutorizado, setNewAutorizado] = useState({
    nombres: "",
    apellidos: "",
  });

  // Función para manejar los cambios en los campos de entrada
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAutorizado((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/autorizados", newAutorizado);
      onSubmitSuccess(response.data); // Llama a la función de éxito pasada como prop
      // Puedes limpiar el formulario después de éxito
      setNewAutorizado({ nombres: "", apellidos: "" });
    } catch (error) {
      console.error("Error al agregar solicitante:", error);
    }
  };

  return (
    <div className="mb-4">
      <h3 className="text-xl font-semibold">Agregar Nuevo Autorizante</h3>
      <div>
        <label htmlFor="nombres" className="block text-sm font-medium">Nombres</label>
        <input
          type="text"
          id="nombres"
          name="nombres"
          value={newAutorizado.nombres}
          onChange={handleInputChange}
          className="w-full p-2 border rounded mt-2"
          placeholder="Nombres"
        />
      </div>
      <div>
        <label htmlFor="apellidos" className="block text-sm font-medium">Apellidos</label>
        <input
          type="text"
          id="apellidos"
          name="apellidos"
          value={newAutorizado.apellidos}
          onChange={handleInputChange}
          className="w-full p-2 border rounded mt-2"
          placeholder="Apellidos"
        />
      </div>
      <button
        onClick={handleSubmit}
        className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded shadow hover:bg-blue-700"
      >
        Agregar Autorizado
      </button>
    </div>
  );
}

export default NewAutorizadoForm;
