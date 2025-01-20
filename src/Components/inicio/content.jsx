"use client"
import React, { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ConsumoTable() {
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState('10');
  const router = useRouter();

  const handleAddClick = () => {
    router.push('/formulario');  // Redirige a la ruta del formulario
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow text-black">
      <div className="bg-green-700 rounded-lg text-white text-center p-4 -mx-6 -mt-6 mb-6">
        <h1 className="text-xl font-bold">INGRESAR CONSUMO</h1>
      </div>

      {/* Add Button */}
      <button
        className="mb-6 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center gap-2"
        onClick={handleAddClick}  // Añadir el evento onClick
      >
        <Plus size={20} />
        Añadir
      </button>

      {/* Date Range Filters */}
      <div className="flex gap-4 mb-6 justify-center">
        <div className="flex items-center gap-2">
          <label>Desde:</label>
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="border rounded px-2 py-1"
          />
        </div>
        <div className="flex items-center gap-2">
          <label>Hasta:</label>
          <input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="border rounded px-2 py-1"
          />
        </div>
      </div>

      {/* Table Controls */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <span>Mostrar</span>
          <select
            value={entriesPerPage}
            onChange={(e) => setEntriesPerPage(e.target.value)}
            className="border rounded px-2 py-1"
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
          <span>Entrada</span>
        </div>
        <div className="flex items-center gap-2">
          <label>Search:</label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded px-2 py-1"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2 text-left">ID</th>
              <th className="border px-4 py-2 text-left">Num</th>
              <th className="border px-4 py-2 text-left">Fecha</th>
              <th className="border px-4 py-2 text-left">Origen</th>
              <th className="border px-4 py-2 text-left">Solicitante</th>
              <th className="border px-4 py-2 text-left">Conductor</th>
              <th className="border px-4 py-2 text-left">Vehículo</th>
              <th className="border px-4 py-2 text-left">Placa</th>
              <th className="border px-4 py-2 text-left">Combustible</th>
              <th className="border px-4 py-2 text-left">Unidad</th>
              <th className="border px-4 py-2 text-left">Cant</th>
              <th className="border px-4 py-2 text-left">P/U</th>
              <th className="border px-4 py-2 text-left">Total</th>
              <th className="border px-4 py-2 text-left">Meta</th>
              <th className="border px-4 py-2 text-left">Uni/sp</th>
              <th className="border px-4 py-2 text-left">A</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={16} className="border px-4 py-2 text-center text-gray-500">
                No hay datos para mostrar
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <div>Mostrando del 1 al 1 de 1 entrada</div>
        <div className="flex gap-2">
          <button className="px-3 py-1 border rounded text-gray-600 hover:bg-gray-100">
            Atrás
          </button>
          <button className="px-3 py-1 border rounded bg-blue-500 text-white">
            1
          </button>
          <button className="px-3 py-1 border rounded text-gray-600 hover:bg-gray-100">
            Sig
          </button>
        </div>
      </div>
    </div>
  );
}