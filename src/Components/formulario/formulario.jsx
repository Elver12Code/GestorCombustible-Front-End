// Formulario.jsx
"use client";
import React, { useState, useEffect } from "react";
import UnitSelector from "../formulario/UnitSelector";
import StockDisplay from "../formulario/StockDisplay";
import NewUnitForm from "../formulario/NewUnitForm";
import FormularioConsumo from "./formconsumo";

function Formulario() {
  const [units, setUnits] = useState([]); // Lista de unidades operativas
  const [selectedUnit, setSelectedUnit] = useState(null); // Unidad seleccionada
  const [stock, setStock] = useState(""); // Stock de la unidad seleccionada
  const [formNumber, setFormNumber] = useState(1); // Número del formulario
  const [formData, setFormData] = useState({
    unidadOperativa: "",

  });

  const [newUnit, setNewUnit] = useState({
    name: "",
    stock: "",
  });

  // Obtener las unidades operativas desde el backend
  useEffect(() => {
    fetch("http://localhost:3000/api/formNumber")
      .then((response) => response.json())
      .then((data) => setFormNumber(data.formNumber))
      .catch((error) => console.error("Error al obtener el formNumber:", error));

    fetch("http://localhost:3000/api/unidades")
      .then((response) => response.json())
      .then((data) => setUnits(data))
      .catch((error) => console.error("Error al obtener unidades:", error));
  }, []);

  // Maneja el cambio de unidad operativa seleccionada
  const handleUnitChange = (event) => {
    const unitId = Number(event.target.value);
    const unit = units.find((u) => u.id === unitId);
    setSelectedUnit(unit);
    setStock(unit?.stock || "");
    setFormData({ ...formData, unidadOperativa: unitId });
  };

  // Maneja el cambio en el formulario para agregar nueva unidad
  const handleNewUnitChange = (event) => {
    setNewUnit({
      ...newUnit,
      [event.target.name]: event.target.value,
    });
  };

  // Enviar nueva unidad operativa al backend
  const handleNewUnitSubmit = (event) => {
    event.preventDefault();
    if (!newUnit.name.trim() || !newUnit.stock.trim()) {
      alert("Por favor, complete todos los campos antes de agregar una nueva unidad.");
      return;
    }
    if (newUnit.stock <= 0) {
      alert("El número debe ser mayor a cero");
      return;
    }
    fetch("http://localhost:3000/api/unidades", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUnit),
    })
      .then((response) => response.json())
      .then((data) => {
        setUnits([...units, data]);
        setNewUnit({ name: "", stock: "" });
      })
      .catch((error) => console.error("Error al agregar nueva unidad:", error));
  };
  const handleSubmit = (event) => {
  event.preventDefault();

  if (!selectedUnit) {
    alert("Por favor, seleccione una unidad operativa.");
    return;
  }

  // Datos a enviar al backend (sin formNumber ni fecha, ya que se generan en el backend)
  const dataToSend = {
    unidadOperativaId: selectedUnit.id,
    stock: stock,
  };

  // Enviar los datos al backend para registrar el consumo
  fetch("http://localhost:3000/api/consumos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dataToSend),
  })
    .then((response) => {
      if (response.ok) {
        alert("Consumo registrado con éxito.");
        setFormNumber(formNumber + 1); // Solo se incrementa en el frontend
      } else {
        alert("Hubo un problema al registrar el consumo.");
      }
    })
    .catch((error) => console.error("Error al registrar consumo:", error));
};

  return (
    <div className="max-w-4xl mx-auto p-6 text-black bg-white rounded shadow-md">
      <h2 className="text-lg font-bold text-center text-green-600 mb-4">
        REGISTRAR NUEVO CONSUM
      </h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="flex justify-between items-center">
          <span>
            <strong>N°:</strong> {formNumber}
          </span>
          <span>
            <strong>FECHA:</strong> {new Date().toLocaleDateString()}
          </span>
        </div>

        {/* Agregar Nueva Unidad */}
        <h1 className="flex items-center">
          <strong>AGREGAR NUEVA UNIDAD</strong>
        </h1>
        <NewUnitForm newUnit={newUnit} onUnitChange={handleNewUnitChange} onSubmit={handleNewUnitSubmit} />

        {/* Selección de Unidad Operativa */}
        <div className="flex- justify-">
          <UnitSelector
            units={units}
            selectedUnit={formData.unidadOperativa}
            onUnitChange={handleUnitChange}
          />

          {/* Muestra el stock de la unidad seleccionada */}
          <StockDisplay stock={stock} />
        </div>

        {/*<FormularioConsumo formData={formData} setFormData={setFormData} />*/}


        {/* Enviar el formulario de consumo */}
        <button
          type="submit"
          className="mt-4 w-full bg-green-600 text-white py-2 px-4 rounded shadow hover:bg-green-700"
        >
          Registrar Consumo
        </button>
      </form>
    </div>
  );
}

export default Formulario;
