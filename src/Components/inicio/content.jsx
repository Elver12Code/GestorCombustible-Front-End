"use client";
import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ConsumoTable() {
  const [data, setData] = useState([]); // Almacenar registros
  const router = useRouter();

  // Obtener datos del backend
  useEffect(() => {
    fetch("http://localhost:3000/api/consumos")
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Ver los datos en la consola para verificar
        setData(data); // Actualiza el estado con los datos
      })
      .catch((error) => {
        console.error("Error al cargar los datos:", error);
      });
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow text-black">
      <div className="bg-green-700 rounded-lg text-white text-center p-4 -mx-6 -mt-6 mb-6">
        <h1 className="text-xl font-bold">INGRESAR CONSUMO</h1>
      </div>

      <button
        className="mb-6 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center gap-2"
        onClick={() => router.push("/formulario")}
      >
        <Plus size={20} />
        Añadir
      </button>

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

            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              [...data].reverse().map((item) =>{
                console.log(item); // Verifica si placa tiene valor
                return(
                  <tr key={item.id}>
                  <td className="border px-4 py-2">{item.id}</td>
                  <td className="border px-4 py-2">{item.formNumber}</td>
                  <td className="border px-4 py-2">{item.fecha}</td>
                  <td className="border px-4 py-2">{item.solicitante ? item.solicitante.nombres : 'No disponible'}</td>
                  <td className="border px-4 py-2">{item.conductor ? item.conductor.nombres : 'No disponible'}</td>
                  <td className="border px-4 py-2">{item.maquina ? item.maquina.nombre : 'No disponible'}</td>
                  <td className="border px-4 py-2">{item.maquina ? item.maquina.placa : 'No disponible'}</td>
                  <td className="border px-4 py-2">{item.combustible}</td>
                  <td className="border px-4 py-2">{item.unidad}</td>
                  <td className="border px-4 py-2">{item.cantidad}</td>
                  <td className="border px-4 py-2">{item.meta}</td>
                  <td className="border px-4 py-2">{item.unidadoperativa ? item.unidadoperativa.id : 'No Disponible'}</td>
                  
                </tr>
                );
                
                
              })
            ) : (
              <tr>
                <td colSpan="12" className="border px-4 py-2 text-center">
                  No hay datos para mostrar
                </td>
              </tr>
            )}
            
          </tbody>
        </table>
      </div>
    </div>
  );
}
