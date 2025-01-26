// SolicitanteSelector.jsx
import React from "react";

function AutorizadoSelector({ autorizados, selectedAutorizado, onAutorizadoChange }) {
  return (
    <div className="flex grid-cols-2 gap-4">
      <div>
        
        <select
          id="autorizado"
          className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500"
          onChange={onAutorizadoChange}
          value={selectedAutorizado}
        >
          <option value="">Seleccione un Autorizado</option>
          {autorizados && autorizados.length > 0 ? (
            autorizados.map((autorizado) => (
              <option key={autorizado.id} value={autorizado.id}>
                {autorizado.nombres} {autorizado.apellidos}
              </option>
            ))
          ) : (
            <option value="">No hay autorizados disponibles</option>
          )}
        </select>
      </div>
    </div>
  );
}

export default AutorizadoSelector;
