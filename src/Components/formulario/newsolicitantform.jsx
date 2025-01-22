import React from "react";

function NewSolicitantForm({ newSolicitant, onSolicitantChange, onSubmit }) {
  return (
    <div className="flex justify-between grid-cols-2 gap-4">
      <div>
        <label htmlFor="nombres" className="block text-sm font-medium">
          Nombres
        </label>
        <input
          type="text"
          id="nombres"
          name="nombres"
          className="mt-1 p-2 block w-full rounded border-orange-600 shadow-sm focus:ring-green-500 focus:border-green-500"
          value={newSolicitant.firstName}
          onChange={onSolicitantChange}
        />
      </div>
      <div>
        <label htmlFor="apellidos" className="block text-sm font-medium">
          Apellidos
        </label>
        <input
          type="text"
          id="apellidos"
          name="apellidos"
          className="mt-1 p-2 block w-full rounded border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500"
          value={newSolicitant.lastName}
          onChange={onSolicitantChange}
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
}

export default NewSolicitantForm;
