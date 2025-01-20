// UnitSelector.jsx
import React from "react";

function UnitSelector({ units, selectedUnit, onUnitChange }) {
  return (
    <div className="flex grid-cols-2 gap-4">
      <div>
        <label htmlFor="unidad" className="block text-sm font-medium">
          Unidad Operativa
        </label>
        <select
          id="unidad"
          className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500"
          onChange={onUnitChange}
          value={selectedUnit}
        >
          <option value="">Seleccione la Unidad Operativa</option>
          {units && units.length > 0 ? (
            units.map((unit) => (
              <option key={unit.id} value={unit.id}>
                {unit.name}
              </option>
            ))
          ) : (
            <option value="">No hay unidades disponibles</option>
          )}
        </select>
      </div>
    </div>
  );
}

export default UnitSelector;
