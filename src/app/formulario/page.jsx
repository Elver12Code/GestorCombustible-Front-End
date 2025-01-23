// src/app/formulario/page.js
import React from 'react';
import Formulario from '../../Components/formulario/formulario';  // Importa el componente Formulario
import FormularioMain from "../../Components/formulario/formmain";

function Page() {
  return (
    <div>
      <FormularioMain />  {/* Renderiza el formulario */}
    </div>
  );
}

export default Page;
