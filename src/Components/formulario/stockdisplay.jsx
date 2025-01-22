// StockDisplay.jsx
import React from "react";

function StockDisplay({ stock }) {
  return (
    <div>
      <label className="block text-sm font-medium">Stock:</label>
      <div className="mt-1 p-2 border rounded bg-gray-100 text-gray-700">
        {stock || "Seleccione una unidad operativa"}
      </div>
    </div>
  );
}

export default StockDisplay;
