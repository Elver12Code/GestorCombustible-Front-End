"use client";
import React, { useState, useEffect } from "react";
import { Plus, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import generarPDF from "../pdf/reportepdf";
import generarExcel from "../pdf/excelpdf"

export default function ConsumoTable() {
  const [data, setData] = useState([]); // Todos los registros
  const [filteredData, setFilteredData] = useState([]); // Registros filtrados
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const [itemsPerPage, setItemsPerPage] = useState(10); // Elementos por página
  const [startDate, setStartDate] = useState(""); // Fecha desde
  const [endDate, setEndDate] = useState(""); // Fecha hasta
  const [searchTerm, setSearchTerm] = useState(""); // Término de búsqueda
  const router = useRouter();

  // Obtener datos del backend
  useEffect(() => {
    fetch("http://localhost:3000/api/consumos")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setFilteredData(data);
      })
      .catch((error) => console.error("Error al cargar los datos:", error));
  }, []);

  // Filtrar registros por fechas y búsqueda
  const handleFilter = () => {
    const filtered = data.filter((item) => {
      const itemDate = new Date(item.fecha).setHours(0, 0, 0, 0); // Normalizar la fecha del registro
      const fromDate = startDate ? new Date(startDate).setHours(0, 0, 0, 0) : null;
      const toDate = endDate ? new Date(endDate).setHours(0, 0, 0, 0) : null;

      // Filtrar por rango de fechas
      const isWithinDateRange =
        (!fromDate || itemDate >= fromDate) &&
        (!toDate || itemDate <= toDate);

      // Filtrar por término de búsqueda
      const searchMatch = searchTerm
        ? item.unidadOperativa?.name
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase())
        : true;

      return isWithinDateRange && searchMatch;
    });

    setFilteredData(filtered);
    setCurrentPage(1); // Reiniciar a la primera página
  };

  // Manejar la búsqueda
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    handleFilter();
  };

  // Manejar la eliminación de un registro
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/consumos/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Eliminar del estado local
        const updatedData = data.filter((item) => item.id !== id);
        setData(updatedData);
        setFilteredData(updatedData);
      } else {
        console.error("Error al eliminar el registro:", response.statusText);
      }
    } catch (error) {
      console.error("Error al eliminar el registro:", error);
    }
  };

  // Calcular los índices de los datos que deben mostrarse en la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // Cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calcular el número total de páginas
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredData.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow text-black">
      <div className="bg-green-700 rounded-lg text-white text-center p-4 -mx-6 -mt-6 mb-6">
        <h1 className="text-xl font-bold">REGISTRO DE CONSUMOS</h1>
      </div>

      <button
        className="mb-6 justify-items-center bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center gap-2"
        onClick={() => router.push("/formulario")}
      >
        <Plus size={20} />
        Añadir
      </button>

      {/* Filtros de búsqueda */}
      <div className="mb-4 flex gap-4">
        <div>
          <label htmlFor="startDate" className="text-sm text-gray-700">
            Fecha desde:
          </label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="ml-2 border border-gray-300 rounded-md px-2 py-1 text-sm"
          />
        </div>

        <div>
          <label htmlFor="endDate" className="text-sm text-gray-700">
            Fecha hasta:
          </label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="ml-2 border border-gray-300 rounded-md px-2 py-1 text-sm"
          />
        </div>

        <div>
          <label htmlFor="search" className="text-sm text-gray-700">
            Buscar:
          </label>
          <input
            type="text"
            id="search"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Buscar..."
            className="ml-2 border border-gray-300 rounded-md px-2 py-1 text-sm"
          />
        </div>

        <button
          onClick={handleFilter}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Filtrar
        </button>
        <div className="flex gap-4 mb-4">
          <button
            onClick={() => generarPDF(filteredData || tableData)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Exportar a PDF
          </button>
          <button
            onClick={() => generarExcel(filteredData || tableData)}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Exportar a Excel
          </button>
        </div>
      </div>

      {/* Tabla de datos */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2 text-left">ID</th>
              <th className="border px-4 py-2 text-left">Num</th>
              <th className="border px-4 py-2 text-left">Fecha</th>
              <th className="border px-4 py-2 text-left">Solicitante</th>
              <th className="border px-4 py-2 text-left">Conductor</th>
              <th className="border px-4 py-2 text-left">Vehículo</th>
              <th className="border px-4 py-2 text-left">Placa</th>
              <th className="border px-4 py-2 text-left">Combustible</th>
              <th className="border px-4 py-2 text-left">Unidad</th>
              <th className="border px-4 py-2 text-left">Cant</th>
              <th className="border px-4 py-2 text-left">Meta</th>
              <th className="border px-4 py-2 text-left">Unidad/Op</th>
              <th className="border px-4 py-2 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((item) => (
                <tr key={item.id}>
                  <td className="border px-4 py-2">{item.id}</td>
                  <td className="border px-4 py-2">{item.formNumber}</td>
                  <td className="border px-4 py-2">{item.fecha}</td>
                  <td className="border px-4 py-2">
                    {item.solicitante ? item.solicitante.nombres : "No disponible"}
                  </td>
                  <td className="border px-4 py-2">
                    {item.conductor ? item.conductor.nombres : "No disponible"}
                  </td>
                  <td className="border px-4 py-2">
                    {item.maquina ? item.maquina.nombre : "No disponible"}
                  </td>
                  <td className="border px-4 py-2">
                    {item.maquina ? item.maquina.placa : "No disponible"}
                  </td>
                  <td className="border px-4 py-2">{item.combustible}</td>
                  <td className="border px-4 py-2">{item.unidad}</td>
                  <td className="border px-4 py-2">{item.cantidad}</td>
                  <td className="border px-4 py-2">{item.meta}</td>
                  <td className="border px-4 py-2">
                    {item.unidadOperativa ? item.unidadOperativa.name : "No Disponible"}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                    >
                      <Trash size={16} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="13" className="border px-4 py-2 text-center">
                  No hay datos para mostrar
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <div className="flex justify-center mt-4">
        <nav>
          <ul className="flex gap-4">
            {pageNumbers.map((number) => (
              <li key={number}>
                <button
                  onClick={() => paginate(number)}
                  className={`px-4 py-2 rounded-md ${
                    currentPage === number
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  {number}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
