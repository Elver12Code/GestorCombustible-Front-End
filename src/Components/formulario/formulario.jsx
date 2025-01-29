// Formulario.jsx
"use client";
import React, { useState, useEffect } from "react";
import UnitSelector from "./UnitSelector";
import StockDisplay from "./StockDisplay";
import NewUnitForm from "./NewUnitForm";
import NewSolicitanteForm from "./newsolicitantform";
import NewAutorizadoForm from "./newautorizadoform";
import SolicitanteSelector from "./solicitanteselector";
import AutorizadoSelector from "./autorizadoselector";
import ValePdfGenerator from "../pdf/valepdfgenerator";
import RegistroExitoso from "./register"; 
import { generatePDF } from "../pdf/valepdfgenerator";


function Formulario() {
  const [showRegistroExitoso, setShowRegistroExitoso] = useState(false); 
  const [units, setUnits] = useState([]); 
  const [selectedUnit, setSelectedUnit] = useState(null); 
  const [solicitantes, setSolicitantes] = useState([]); 
  const [selectedSolicitante, setSelectedSolicitante] = useState(""); 
  const [autorizados, setAutorizados] = useState([]); 
  const [selectedAutorizado, setSelectedAutorizado] =useState("");
  const [stock, setStock] = useState(""); 
  const [stockInicial, setStockInicial] = useState(""); 
  const [formNumber, setFormNumber] = useState(1); 
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]); // estado para la fecha seleccionada
  const [showNewUnitForm, setShowNewUnitForm] = useState(false);
  const [showNewSolicitanteForm, setShowNewSolicitanteForm] = useState(false);
  const [showNewAutorizadoForm, setShowNewAutorizadoForm] = useState(false);
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
    fecha:","
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
  const handleDateChange = (event) => {
    console.log("Fecha seleccionada:", selectedDate); // Verifica si la fecha es la esperada

    setSelectedDate(event.target.value); // actualizar la fecha seleccionada
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
    fecha: selectedDate,
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
        setShowRegistroExitoso(true);
        setFormNumber(formNumber + 1); 
        generatePDF(selectedDate, formData, stock, stockInicial, formNumber, selectedUnit, selectedSolicitante, selectedAutorizado);
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
          maquina: "", 
          tipo: "", 
          placa: "", 
        }); 
        
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
          <strong>FECHA:</strong>
          {/* Aquí cambiamos el texto por un campo de fecha */}
          <input 
            type="date" 
            value={selectedDate} 
            onChange={handleDateChange} 
            className="border border-gray-300 px-2 py-1 rounded-md" 
          />
        </span>
        </div>

        {/* Agregar Nueva Unidad */}
      <div className="mb-4">
        <button
          type="button"
          onClick={() => setShowNewUnitForm(!showNewUnitForm)}
          className="text-white bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded"
        >
          {showNewUnitForm ? "Ocultar Unidad Operativa" : "Agregar Unidad Operativa"}
        </button>
        {showNewUnitForm && (
          <NewUnitForm
            newUnit={newUnit}
            onUnitChange={handleNewUnitChange}
            onSubmit={handleNewUnitSubmit}
          />
        )}
      </div>
        
        {/* Botón y contenido para Agregar Nuevo Solicitante */}
      <div className="mb-4">
        <button
          type="button"
          onClick={() => setShowNewSolicitanteForm(!showNewSolicitanteForm)}
          className="text-white  bg-red-600 hover:bg-red-400 px-4 py-2 rounded"
        >
          {showNewSolicitanteForm ? "Ocultar Solicitante" : "Agregar Nuevo Solicitante"}
        </button>
        {showNewSolicitanteForm && (
          <NewSolicitanteForm onSubmitSuccess={handleNewSolicitante} />
        )}
      </div>

        {/* Botón y contenido para Agregar Nuevo Autorizado */}
      <div className="mb-4">
        <button
          type="button"
          onClick={() => setShowNewAutorizadoForm(!showNewAutorizadoForm)}
          className="text-white bg-green-600 hover:bg-green-500 px-4 py-2 rounded"
        >
          {showNewAutorizadoForm ? "Ocultar Autorizado" : "Agregar Nuevo Autorizado"}
        </button>
        {showNewAutorizadoForm && (
          <NewAutorizadoForm onSubmitSuccess={handleNewAutorizado} />
        )}
      </div>
        
        <h1 className="flex items-center">
          <strong>Nueva Unidad Operativa</strong>
        </h1>
        <div className="flex justify-between">
          <UnitSelector
            units={units}
            selectedUnit={formData.unidadOperativa}
            onUnitChange={handleUnitChange}
          />
          <StockDisplay stock={stock ? stock.toFixed(2) : ""} label="Stock" />

          <StockDisplay stock={stockInicial ? stockInicial.toFixed(2) : ""} label="Stock Inicial"  /> 
        </div> 

        <div >
        <h1 className="flex items-center">
          <strong>Solicitante</strong>
        </h1>
        <SolicitanteSelector
          solicitantes={solicitantes}
          selectedSolicitante={formData.solicitante}
          onSolicitanteChange={handleSolicitanteChange}
        />
        <h1 className="flex items-center">
          <strong>Autorizado</strong>
        </h1>
        <AutorizadoSelector
          autorizados={autorizados}
          selectedAutorizado={formData.autorizado}
          onAutorizadoChange={handleAutorizadoChange}
        />
        </div>
        <div>
          <h1 className="flex items-center">
            <strong>DATOS</strong>
            </h1>
          <div className="grid grid-cols-3 gap-4">            
            <div>
            <label className="text-[13px] text-slate-400">Orden Consumo</label>

            <input
              type="text"
              name="ordenConsumo"
              value={formData.ordenConsumo}
              onChange={handleInputChange}
              placeholder="Orden de Consumo"
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
            />
            </div>
            <div>
            <label className="text-[13px] text-slate-400">Orden Consumo</label>
            <input
              type="text"
              name="clasificador"
              value={formData.clasificador}
              onChange={handleInputChange}
              placeholder="Clasificador"
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
            />
            </div>
            <div>
            <label className="text-[13px] text-slate-400">Meta</label>
            <input
              type="text"
              name="meta"
              value={formData.meta}
              onChange={handleInputChange}
              placeholder="Meta"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
            />
            </div>  
          </div>
            <h1 className=" flex items-center">
            <strong>CARACTERISTICAS DEL VEHICULO</strong>
            </h1>
            <div className="grid grid-cols-3 gap-4">
            <div>
            <label className="text-[13px] text-slate-400">Maquina/Vehiculo</label>
              <input
                type="text"
                id="maquina"
                name="maquina"
                value={formData.maquina}
                onChange={handleInputChange}
                placeholder="Nombre de la máquina"
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
            <label className="text-[13px] text-slate-400">Placa</label>
              <input
                type="text"
                id="placa"
                name="placa"
                value={formData.placa}
                onChange={handleInputChange}
                placeholder="Placa de la máquina"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
            <label className="text-[13px] text-slate-400">Tipo</label>
              <input
                type="text"
                id="tipo"
                name="tipo"
                value={formData.tipo}
                onChange={handleInputChange}
                placeholder="Tipo de máquina"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
              />
            </div>
            </div>
            <h1 className=" flex items-center">
            <strong>DESCRIPCION DEL COMBUSTIBLE</strong>
            </h1>
            
            <div className="grid grid-cols-3 gap-4">
              <div>
              <label className="text-[13px] text-slate-400">Combustible</label>
              <input
              type="text"
              name="combustible"
              value={formData.combustible}
              onChange={handleInputChange}
              placeholder="Combustible"
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
              />
              </div>
              <div>
              <label className="text-[13px] text-slate-400">Cantidad</label>
              <input
              type="number"
              name="cantidad"
              value={formData.cantidad}
              onChange={handleInputChange}
              placeholder="Cantidad"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
              />
              </div>
              <div>
              <label className="text-[13px] text-slate-400">Unidad</label>
              <input
              type="text"
              name="unidad"
              value={formData.unidad}
              onChange={handleInputChange}
              placeholder="Unidad"
              className=" w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
              />
              </div>
            </div>
            <h1 className="flex items-center">
            <strong>DATOS DEL CONDUCTOR</strong>
            </h1>
            <div className="grid grid-cols-3 gap-4" >   
            <div>
            <label className="text-[13px] text-slate-400">Nombre del Conductor</label>
              <input
                type="text"
                id="conductorNombre"
                name="conductorNombre"
                value={formData.conductorNombre}
                onChange={handleInputChange}
                placeholder="Nombre"
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
              />
            </div>
      
            <div>
            <label className="text-[13px] text-slate-400">Apellido del Conductor</label>
              <input
                type="text"
                id="conductorApellido"
                name="conductorApellido"
                value={formData.conductorApellido}
                onChange={handleInputChange}
                placeholder="Apellido"
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
              />
            </div>
            </div>
            <h1 className="flex items-center">
            <strong>DATOS DEL PROVEEDOR</strong>
            </h1>
            <div className="grid grid-cols-3 gap-4">
            <div>
            <label className="text-[13px] text-slate-400">Nombre del Proveedor</label>
              <input
                type="text"
                id="proveedorNombres"
                name="proveedorNombres"
                value={formData.proveedorNombres}
                onChange={handleInputChange}
                placeholder="Nombres"
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
            <label className="text-[13px] text-slate-400">Apellido del Proveedor</label>
              <input
                type="text"
                id="proveedorApellidos"
                name="proveedorApellidos"
                value={formData.proveedorApellidos}
                onChange={handleInputChange}
                placeholder="Apellidos"
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
            <label className="text-[13px] text-slate-400">RUC</label>
              <input
                type="number"
                name="proveedorRuc"
                value={formData.proveedorRuc}
                onChange={handleInputChange}
                placeholder="Numero de RUC"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
              />
            </div>
            </div>
            
            <label className="text-[13px] text-slate-400">Observacion</label>
            <div className="flex">
            <textarea
              name="observacion"
              value={formData.observacion}
              onChange={handleInputChange}
              placeholder="Observación"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
            ></textarea>
            </div>
      
        </div>
                <button
          type="submit"
          className="mt-4 w-full bg-green-600 text-white py-2 px-4 rounded shadow hover:bg-green-700"
        >
          Registrar Consumo
        </button>
      </form>

      <RegistroExitoso
        isOpen={showRegistroExitoso} // Pasa el estado de visibilidad
        onClose={() => setShowRegistroExitoso(false)} // Función para cerrar el modal
      />
      <div className="max-w-4xl mx-auto p-6 text-black bg-white rounded shadow-md">
      {/* ...resto del formulario */}
      
      </div>
    </div>
  );
}

export default Formulario;