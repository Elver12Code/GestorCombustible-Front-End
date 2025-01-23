import React from 'react'
import Formulario from "../formulario/formulario";
import Navbar from '../inicio/navbar';

const formmain = () => {
  return (
    <div className=' min-h-screen bg-[#EDF0F4]'>
        <Navbar/>
          <div className="flex flex-col mt-2 py-4 px-60 border-b ">
            <Formulario/>
          </div>

    </div>
  )
}

export default formmain