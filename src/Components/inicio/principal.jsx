import React from 'react'
import Navbar from "./navbar"
import Content from "./content"

const principal = () => {

  return (
    <div className=' min-h-screen bg-[#EDF0F4]'>
        <Navbar/>
          <div className="flex flex-col mt-2 py-4 px-60 border-b ">
            <Content/>
          </div>

    </div>
  )
}

export default principal