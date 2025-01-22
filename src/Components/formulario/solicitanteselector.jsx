import React from "react";

function SolicitanteSelector({ solicitantes, selectedSolicitante, onSolicitanteChange }) {
  return (
    <div className="flex grid-cols-2 gap-4">
      <div>
        <label htmlFor="solicitante" className="block text-sm font-medium">
          Solicitante
        </label>
        <select
          id="solicitante"
          className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500"
          onChange={onSolicitanteChange}
          value={selectedSolicitante || ""}
        >
          <option value="">Seleccione un Solicitante</option>
          {solicitantes && solicitantes.length > 0 ? (
            solicitantes.map((solicitante) => (
              <option key={solicitante.id} value={solicitante.id}>
                {solicitante.nombres} {solicitante.apellidos}
              </option>
            ))
          ) : (
            <option value="">No hay solicitantes disponibles</option>
          )}
        </select>
      </div>
    </div>
  );
}

export default SolicitanteSelector;
