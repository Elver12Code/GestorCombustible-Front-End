import React, { useState } from 'react';
import axios from 'axios';

function FormularioConsumo({ formData, setFormData }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    const nameParts = name.split('.');  // Para manejar los nombres anidados como 'solicitante.paterno'
    
    if (nameParts.length === 1) {
      setFormData({ ...formData, [name]: value });
    } else {
      setFormData((prevData) => {
        return {
          ...prevData,
          [nameParts[0]]: {
            ...prevData[nameParts[0]],
            [nameParts[1]]: value,
          },
        };
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/consumos", formData);
      alert("Registro exitoso");
    } catch (error) {
      console.error("Error al registrar:", error);
      alert("Error al registrar");
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded" onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold mb-4">Registro de Consumo de Combustible</h2>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label>Orden del Consumo</label>
          <input
            type="text"
            name="ordenConsumo"
            className="w-full border p-2"
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Clasificador</label>
          <input
            type="text"
            name="clasificador"
            className="w-full border p-2"
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Meta</label>
          <input
            type="text"
            name="meta"
            className="w-full border p-2"
            onChange={handleChange}
          />
        </div>

        {/* Solicitante */}
        <div>
          <label>Apellido Paterno (Solicitante)</label>
          <input
            type="text"
            name="solicitante.paterno"
            className="w-full border p-2"
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Apellido Materno (Solicitante)</label>
          <input
            type="text"
            name="solicitante.materno"
            className="w-full border p-2"
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Nombres (Solicitante)</label>
          <input
            type="text"
            name="solicitante.nombres"
            className="w-full border p-2"
            onChange={handleChange}
          />
        </div>

        {/* Autorizado */}
        <div>
          <label>Apellido Paterno (Autorizado)</label>
          <input
            type="text"
            name="autorizado.paterno"
            className="w-full border p-2"
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Apellido Materno (Autorizado)</label>
          <input
            type="text"
            name="autorizado.materno"
            className="w-full border p-2"
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Nombres (Autorizado)</label>
          <input
            type="text"
            name="autorizado.nombres"
            className="w-full border p-2"
            onChange={handleChange}
          />
        </div>

        {/* Vehículo */}
        <div>
          <label>Máquina (Vehículo)</label>
          <input
            type="text"
            name="vehiculo.maquina"
            className="w-full border p-2"
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Placa (Vehículo)</label>
          <input
            type="text"
            name="vehiculo.placa"
            className="w-full border p-2"
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Tipo (Vehículo)</label>
          <input
            type="text"
            name="vehiculo.tipo"
            className="w-full border p-2"
            onChange={handleChange}
          />
        </div>

        {/* Conductor */}
        <div>
          <label>Apellido Paterno (Conductor)</label>
          <input
            type="text"
            name="conductor.paterno"
            className="w-full border p-2"
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Apellido Materno (Conductor)</label>
          <input
            type="text"
            name="conductor.materno"
            className="w-full border p-2"
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Nombres (Conductor)</label>
          <input
            type="text"
            name="conductor.nombres"
            className="w-full border p-2"
            onChange={handleChange}
          />
        </div>

        {/* Otros campos */}
        <div>
          <label>Combustible</label>
          <input
            type="text"
            name="combustible"
            className="w-full border p-2"
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Cantidad</label>
          <input
            type="number"
            name="cantidad"
            className="w-full border p-2"
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Unidad</label>
          <input
            type="text"
            name="unidad"
            className="w-full border p-2"
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Observación</label>
          <input
            type="text"
            name="observacion"
            className="w-full border p-2"
            onChange={handleChange}
          />
        </div>
      </div>
      
    </div>
  );
}

export default FormularioConsumo;
