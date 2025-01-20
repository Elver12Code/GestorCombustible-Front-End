"use client";
import React from "react";

const NewUnitForm = ({ newUnit, onUnitChange, onSubmit }) => {
  return (
    <div className="flex justify-between grid-cols-2 gap-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium ">
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
      <button
        type="submit"
        className="mt-6 bg-blue-600 text-white py-2 px-4 rounded shadow hover:bg-blue-700"
        onClick={onSubmit}
      >
        Agregar
      </button>
    </div>
  );
};

export default NewUnitForm;
