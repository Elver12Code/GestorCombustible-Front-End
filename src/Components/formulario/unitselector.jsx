import React from "react";

function UnitSelector({ units, selectedUnit, onUnitChange }) {
  // Buscar la unidad seleccionada
  const selectedUnitData = units.find((unit) => unit.id === selectedUnit);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <label htmlFor="unidad" className="block text-sm font-medium">
          Seleccione la Unidad Operativa
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

      {/* Mostrar información de la unidad seleccionada */}
      {selectedUnitData && (
        <div className="p-4 border rounded bg-gray-100 shadow-sm">
          <p>
            <strong>Tipo de Combustible:</strong> {selectedUnitData.fuelType}
          </p>
          <p>
            <strong>Stock:</strong> {selectedUnitData.stock}
          </p>
          <p>
            <strong>Stock Inicial:</strong> {selectedUnitData.stockInicial}
          </p>
        </div>
      )}
    </div>
  );
}

export default UnitSelector;
