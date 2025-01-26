// NewSolicitanteForm.jsx
import React, { useState } from "react";
import axios from "axios";

function NewSolicitanteForm({ onSubmitSuccess }) {
  const [newSolicitante, setNewSolicitante] = useState({
    nombres: "",
    apellidos: "",
  });

  // Función para manejar los cambios en los campos de entrada
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSolicitante((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/solicitantes", newSolicitante);
      onSubmitSuccess(response.data); // Llama a la función de éxito pasada como prop
      // Puedes limpiar el formulario después de éxito
      setNewSolicitante({ nombres: "", apellidos: "" });
    } catch (error) {
      console.error("Error al agregar solicitante:", error);
    }
  };

  return (
    <div className="flex justify-between grid-cols-2 gap-4">
      <div>
        <label htmlFor="nombres" className="block text-sm font-medium">Nombres</label>
        <input
          type="text"
          id="nombres"
          name="nombres"
          value={newSolicitante.nombres}
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
          value={newSolicitante.apellidos}
          onChange={handleInputChange}
          className="w-full p-2 border rounded mt-2"
          placeholder="Apellidos"
        />
      </div>
      <button
        onClick={handleSubmit}
        className="mt-6 bg-green-600 text-white py-2 px-4 rounded shadow hover:bg-green-500"
      >
        Agregar Solicitante
      </button>
    </div>
  );
}

export default NewSolicitanteForm;
