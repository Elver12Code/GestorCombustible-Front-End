import React from "react";

function NewUnitForm({ newUnit, onUnitChange, onSubmit }) {
  return (
    <div className="flex flex-wrap gap-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium">
          Nombre de la Unidad
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="mt-1 p-2 block w-full rounded border-orange-600 shadow-sm focus:ring-green-500 focus:border-green-500"
          value={newUnit.name}
          onChange={onUnitChange}
        />
      </div>

      <div>
        <label htmlFor="fuelType" className="block text-sm font-medium">
          Tipo de Combustible
        </label>
        <select
          id="fuelType"
          name="fuelType"
          className="mt-1 p-2 block w-full rounded border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500"
          value={newUnit.fuelType}
          onChange={onUnitChange}
        >
          <option value="">Seleccione un tipo</option>
          <option value="Gasolina">Gasolina</option>
          <option value="Petróleo">Petróleo</option>
        </select>
      </div>

      <div>
        <label htmlFor="stock" className="block text-sm font-medium">
          Stock
        </label>
        <input
          type="number"
          id="stock"
          name="stock"
          className="mt-1 p-2 block w-full rounded border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500"
          value={newUnit.stock}
          onChange={onUnitChange}
        />
      </div>

      <div>
        <label htmlFor="stockInicial" className="block text-sm font-medium">
          Stock Inicial
        </label>
        <input
          type="number"
          id="stockInicial"
          name="stockInicial"
          className="mt-1 p-2 block w-full rounded border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500"
          value={newUnit.stockInicial}
          onChange={onUnitChange}
        />
      </div>

      <button
        type="submit"
        className="mt-6 bg-green-600 text-white py-2 px-4 rounded shadow hover:bg-green-300"
        onClick={onSubmit}
      >
        Agregar
      </button>
    </div>
  );
}

export default NewUnitForm;
