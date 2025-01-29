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

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validación de campos requeridos
    if (!newAutorizado.nombres || !newAutorizado.apellidos) {
      alert("Por favor, complete todos los campos antes de agregar un nuevo autorizante.");
      return; // Detiene la ejecución si los campos no están completos
    }
  
    try {
      const response = await axios.post("http://localhost:3000/api/autorizados", newAutorizado);
      onSubmitSuccess(response.data); // Llama a la función de éxito pasada como prop
      // Limpiar el formulario después de éxito
      setNewAutorizado({ nombres: "", apellidos: "" });
    } catch (error) {
      console.error("Error al agregar autorizado:", error);
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
        className="mt-6 bg-green-600 text-white py-2 px-4 rounded shadow hover:bg-green-500"
      >
        Agregar Autorizado
      </button>
    </div>
  );
}

export default NewAutorizadoForm;
