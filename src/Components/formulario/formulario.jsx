// Formulario.jsx
"use client";
import React, { useState, useEffect } from "react";
import UnitSelector from "../formulario/UnitSelector";
import StockDisplay from "../formulario/StockDisplay";
import NewUnitForm from "../formulario/NewUnitForm";
import NewSolicitanteForm from "../formulario/newsolicitantform";
import NewAutorizadoForm from "../formulario/newautorizadoform";
import SolicitanteSelector from "../formulario/solicitanteselector";
import AutorizadoSelector from "../formulario/autorizadoselector";
import ValePdfGenerator from "../pdf/valepdfgenerator";

function Formulario() {
  const [units, setUnits] = useState([]); // Lista de unidades operativas
  const [selectedUnit, setSelectedUnit] = useState(null); // Unidad seleccionada
  const [solicitantes, setSolicitantes] = useState([]); // Para manejar los solicitantes
  const [selectedSolicitante, setSelectedSolicitante] = useState(""); // Estado para el solicitante seleccionado
  const [autorizados, setAutorizados] = useState([]); // Para manejar los solicitantes
  const [selectedAutorizado, setSelectedAutorizado] =useState("");
  const [stock, setStock] = useState(""); // Stock de la unidad seleccionada
  const [stockInicial, setStockInicial] = useState(""); // Stock inicial
  const [formNumber, setFormNumber] = useState(1); // Número del formulario
  const [consumos, setConsumos] = useState([]);
  const [formData, setFormData] = useState({
    unidadOperativa: "",
    solicitante:"",
    autorizado:"",
    ordenConsumo: "",
    clasificador: "",
    meta: "",
    precioUnitario: "",
    combustible: "",
    cantidad: "",
    unidad: "",
    observacion: "",
    conductorNombre: "",
    conductorApellido: "",
    proveedorNombres: "",
    proveedorApellidos: "",
    proveedorRuc:"",
    placa: "",
    tipo: "",
    forNumer: "",
    maquina:"",  
  });

  const [newUnit, setNewUnit] = useState({
    name: "",
    stock: "",
    stockInicial: ""
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
    fetch("http://localhost:3000/api/solicitantes") // Obtener solicitantes
      .then((response) => response.json())
      .then((data) => setSolicitantes(data))
      .catch((error) => console.error("Error al obtener solicitantes:", error));
    fetch("http://localhost:3000/api/autorizados") // Obtener autorizados
      .then((response) => response.json())
      .then((data) => setAutorizados(data))
      .catch((error) => console.error("Error al obtener autorizados:", error));
    }, []);

  // Manejar el cambio de solicitante
  const handleNewSolicitante = (solicitante) => {
    setSolicitantes((prevState) => [...prevState, solicitante]);
  };
  // Manejar el cambio de Autorizado
  const handleNewAutorizado = (autorizado) => {
    setAutorizados((prevState) => [...prevState, autorizado]);
  };

  // Maneja el cambio de unidad operativa seleccionada
  const handleUnitChange = (event) => {
    const unitId = Number(event.target.value);
    const unit = units.find((u) => u.id === unitId);
    console.log("Unidad seleccionada:", unit);  // Verifica la unidad seleccionada

    setSelectedUnit(unit);
    setStock(unit?.stock || "");
    setStockInicial(unit?.stockInicial || "");
    console.log("Stock actualizado:", unit?.stock);  // Verifica si el stock se actualiza
    setFormData({ ...formData, unidadOperativa: unitId });
  };
  
  // Maneja el cambio en el formulario para agregar nueva unidad
  const handleNewUnitChange = (event) => {
    setNewUnit({
      ...newUnit,
      [event.target.name]: event.target.value,
    });
  };
  // Maneja el cambio de solicitante seleccionada
  const handleSolicitanteChange = (event) => {
    const solicitanteId = Number(event.target.value);
    const solicitante = solicitantes.find((u) => u.id === solicitanteId);
    setSelectedSolicitante(solicitante);
    setFormData({ ...formData, solicitante: solicitanteId });
  };
  // Maneja el cambio de Autorizado seleccionada
  const handleAutorizadoChange = (event) => {
    const autorizadoId = Number(event.target.value);
    const autorizado = autorizados.find((u) => u.id === autorizadoId);
    setSelectedAutorizado(autorizado);
    setFormData({ ...formData, autorizado: autorizadoId });
  };
  

  // Maneja el cambio en los campos del formulario
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // Enviar nueva unidad operativa al backend
  const handleNewUnitSubmit = (event) => {
    event.preventDefault();
    if (!newUnit.name.trim() || !newUnit.stock.trim() || !newUnit.stockInicial.trim()) {
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
        setNewUnit({ name: "", stock: "", stockInicial: "" });
      })
      .catch((error) => console.error("Error al agregar nueva unidad:", error));
  };
  const handleSubmit = (event) => {
  event.preventDefault();

  if (!selectedUnit) {
    alert("Por favor, seleccione una unidad operativa.");
    return;
  }else if(!selectedSolicitante){
    alert("Por favor, seleccione solicitante.");
    return;
  }else if(!selectedAutorizado){
    alert("Por favor, seleccione autorizado.");
    return;
  }

  if (formData.cantidad > stock) {
    alert("No hay suficiente stock.");
    return;
  }  

  // Validar nombre y apellido del conductor
  if (!formData.cantidad.trim() || !formData.clasificador.trim() ||!formData.combustible.trim() ||!formData.meta.trim() 
    ||!formData.observacion.trim() || !formData.ordenConsumo.trim() ||!formData.unidad.trim() || !formData.conductorNombre.trim() 
    || !formData.conductorApellido.trim() || !formData.maquina.trim() || !formData.tipo.trim() || !formData.placa.trim() 
    || !formData.proveedorApellidos.trim() || !formData.proveedorNombres.trim() || !formData.proveedorRuc.trim() ) {
    alert("Por favor, ingrese todos los campos.");
    return;
  }

  // Datos a enviar al backend (sin formNumber ni fecha, ya que se generan en el backend)
  const dataToSend = {
    unidadOperativaId: selectedUnit.id,
    solicitanteId: selectedSolicitante.id,
    autorizadoId: selectedAutorizado.id,
    stock: stock,
    ordenConsumo: formData.ordenConsumo,
    clasificador: formData.clasificador,
    meta: formData.meta,
    combustible: formData.combustible,
    cantidad: Number(formData.cantidad),
    unidad: formData.unidad,
    observacion: formData.observacion,
    conductorNombre: formData.conductorNombre, // Agregar nombre
    conductorApellido: formData.conductorApellido,
    proveedorNombres: formData.proveedorNombres,
    proveedorApellidos: formData.proveedorApellidos,
    proveedorRuc: formData.proveedorRuc,
    maquina: formData.maquina, // Máquina
    tipo: formData.tipo, // Tipo de máquina
    placa: formData.placa,
  };

  console.log("Datos enviados al backend:", dataToSend); // Verifica los datos

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
        setFormData({
          unidadOperativa: "",
          solicitante:"",
          autorizado:"",
          ordenConsumo: "",
          formNumber: "",
          clasificador: "",
          meta: "",
          combustible: "",
          cantidad: "",
          unidad: "",
          observacion: "",
          conductorNombre: "",
          conductorApellido: "",
          proveedorNombres:"",
          proveedorApellidos:"",
          proveedorRuc:"",
          maquina: "", // Limpia la máquina
          tipo: "", // Limpia el tipo
          placa: "", 
        }); // Limpia el formulario
        
      } else {
        alert("Hubo un problema al registrar el consumo.");
      }
    })
    .catch((error) => console.error("Error al registrar consumo:", error));
};

  return (
    <div className="max-w-4xl mx-auto p-6 text-black bg-white rounded shadow-md">
      <h2 className="text-lg font-bold text-center text-green-600 mb-4">
        REGISTRAR NUEVO CONSUMO
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
          <strong>AGREGAR NUEVA UNIDADddd</strong>
        </h1>
        <NewUnitForm newUnit={newUnit} onUnitChange={handleNewUnitChange} onSubmit={handleNewUnitSubmit} />

        {/* Formulario para agregar un nuevo solicitante */}
        <NewSolicitanteForm onSubmitSuccess={handleNewSolicitante} />

        {/* Formulario para agregar un nuevo solicitante */}
        <NewAutorizadoForm onSubmitSuccess={handleNewAutorizado} />
        
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
        <StockDisplay stock={stockInicial} /> {/* Aquí muestra el stock inicial */}

        
        {/* Selector de Solicitante */}
        <SolicitanteSelector
          solicitantes={solicitantes}
          selectedSolicitante={formData.solicitante}
          onSolicitanteChange={handleSolicitanteChange}
        />

        {/* Selector de Autorizado */}
        <AutorizadoSelector
          autorizados={autorizados}
          selectedAutorizado={formData.autorizado}
          onAutorizadoChange={handleAutorizadoChange}
        />

        {/* Campos adicionales */}
        <input
          type="text"
          name="ordenConsumo"
          value={formData.ordenConsumo}
          onChange={handleInputChange}
          placeholder="Orden de Consumo"
          className="w-full border px-4 py-2 rounded"
        />
        <input
          type="text"
          name="clasificador"
          value={formData.clasificador}
          onChange={handleInputChange}
          placeholder="Clasificador"
          className="w-full border px-4 py-2 rounded"
        />
        <input
          type="text"
          name="meta"
          value={formData.meta}
          onChange={handleInputChange}
          placeholder="Meta"
          className="w-full border px-4 py-2 rounded"
        />
        <input
          type="text"
          name="combustible"
          value={formData.combustible}
          onChange={handleInputChange}
          placeholder="Combustible"
          className="w-full border px-4 py-2 rounded"
        />
        <input
          type="number"
          name="cantidad"
          value={formData.cantidad}
          onChange={handleInputChange}
          placeholder="Cantidad"
          className="w-full border px-4 py-2 rounded"
        />
        <input
          type="text"
          name="unidad"
          value={formData.unidad}
          onChange={handleInputChange}
          placeholder="Unidad"
          className="w-full border px-4 py-2 rounded"
        />
        {/* Campos para el nombre y apellido del conductor */}
        <div>
          <label htmlFor="conductorNombre" className="block text-sm font-semibold">
            Nombre del conductor:
          </label>
          <input
            type="text"
            id="conductorNombre"
            name="conductorNombre"
            value={formData.conductorNombre}
            onChange={handleInputChange}
            placeholder="Nombre"
            className="w-full border px-4 py-2 rounded"
          />
        </div>

        <div>
          <label htmlFor="conductorApellido" className="block text-sm font-semibold">
            Apellido del conductor:
          </label>
          <input
            type="text"
            id="conductorApellido"
            name="conductorApellido"
            value={formData.conductorApellido}
            onChange={handleInputChange}
            placeholder="Apellido"
            className="w-full border px-4 py-2 rounded"
          />
        </div>
        {/* Campos para el nombre y apellido del proveedor */}
        <div>
          <label htmlFor="proveedorNombres" className="block text-sm font-semibold">
            Nombre del Proveedor:
          </label>
          <input
            type="text"
            id="proveedorNombres"
            name="proveedorNombres"
            value={formData.proveedorNombres}
            onChange={handleInputChange}
            placeholder="Nombres"
            className="w-full border px-4 py-2 rounded"
          />
        </div>

        <div>
          <label htmlFor="proveedorApellidos" className="block text-sm font-semibold">
            Apellido del Proveedor:
          </label>
          <input
            type="text"
            id="proveedorApellidos"
            name="proveedorApellidos"
            value={formData.proveedorApellidos}
            onChange={handleInputChange}
            placeholder="Apellidos"
            className="w-full border px-4 py-2 rounded"
          />
        </div>
        <div>
          <label htmlFor="proveedorRuc" className="block text-sm font-semibold">
            Numero de RUC
          </label>
          <input
            type="number"
            name="proveedorRuc"
            value={formData.proveedorRuc}
            onChange={handleInputChange}
            placeholder="Numero de RUC"
            className="w-full border px-4 py-2 rounded"
          />
        </div>

        {/* Campo para la máquina */}
        <div>
          <label htmlFor="maquina" className="block text-sm font-semibold">
            Máquina:
          </label>
          <input
            type="text"
            id="maquina"
            name="maquina"
            value={formData.maquina}
            onChange={handleInputChange}
            placeholder="Nombre de la máquina"
            className="w-full border px-4 py-2 rounded"
          />
        </div>

        {/* Campo para el tipo de máquina */}
        <div>
          <label htmlFor="tipo" className="block text-sm font-semibold">
            Tipo de Máquina:
          </label>
          <input
            type="text"
            id="tipo"
            name="tipo"
            value={formData.tipo}
            onChange={handleInputChange}
            placeholder="Tipo de máquina"
            className="w-full border px-4 py-2 rounded"
          />
        </div>

        {/* Campo para la placa */}
        <div>
          <label htmlFor="placa" className="block text-sm font-semibold">
            Placa de la Máquina:
          </label>
          <input
            type="text"
            id="placa"
            name="placa"
            value={formData.placa}
            onChange={handleInputChange}
            placeholder="Placa de la máquina"
            className="w-full border px-4 py-2 rounded"
          />
        </div>

        <textarea
          name="observacion"
          value={formData.observacion}
          onChange={handleInputChange}
          placeholder="Observación"
          className="w-full border px-4 py-2 rounded"
        ></textarea>

        {/* Enviar el formulario de consumo */}
        <button
          type="submit"
          className="mt-4 w-full bg-green-600 text-white py-2 px-4 rounded shadow hover:bg-green-700"
        >
          Registrar Consumo
        </button>
      </form>
      <div className="max-w-4xl mx-auto p-6 text-black bg-white rounded shadow-md">
      {/* ...resto del formulario */}
      <ValePdfGenerator
        formData={formData}
        formNumber={formNumber}
        selectedUnit={selectedUnit}
        selectedSolicitante={selectedSolicitante}
        selectedAutorizado={selectedAutorizado}
        stock={stock}
        stockInicial={stockInicial}
      />
      </div>
    </div>
  );
}

export default Formulario;