"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { LogOut, Home, PlusCircle, Menu } from 'lucide-react'; // Importa el icono Menu
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar la apertura del menú
  const router = useRouter();
  
  const handleLogout = () => {
    router.push('log_out');
  }

  return (
    <nav className="bg-[#4CD541] text-white px-4 py-2 flex items-center justify-between flex-wrap">
      {/* Left section - Logo and Municipality name */}
      <div className="flex items-center space-x-2 flex-shrink-0">
        <img
          src="/logoini.png"
          alt="Municipalidad Logo"
          width={160}
          height={60}
          className="object-contain"
        />
      </div>

      {/* Center section - System name */}
      <div className="text-center flex-1 mt-2 lg:mt-0">
        <h1 className="text-xl font-bold">
          SISTEMA DE GESTOR DE COMBUSTIBLE
        </h1>
      </div>

      {/* Right section - Navigation links */}
      <div className="text-xl flex items-center space-x-6 mt-2 lg:mt-0 flex-wrap justify-center lg:justify-end hidden lg:flex">
        <Link 
          href="/contentmain" 
          className="flex items-center space-x-1 hover:text-gray-200"
        >
          <Home size={20} />
          <span>Inicio</span>
        </Link>
        <Link 
          href="/formulario" 
          className="flex items-center space-x-1 hover:text-gray-200"
        >
          <PlusCircle size={20} />
          <span>Nuevo Consumo</span>
        </Link>
        <button 
          onClick={handleLogout} 
          className="flex items-center space-x-1 hover:text-gray-200"
        >
          <LogOut size={20} />
          <span>Cerrar Sesión</span>
        </button>
      </div>

      {/* Menu icon for small screens */}
      <div className="lg:hidden flex items-center">
        <button onClick={() => setIsOpen(!isOpen)} className="text-white">
          <Menu size={30} />
        </button>
      </div>

      {/* Mobile Menu - Show when `isOpen` is true */}
      <div 
        className={`lg:hidden absolute top-0 right-0 bg-[#4CD541] text-white w-full p-4 ${isOpen ? 'block' : 'hidden'}`}
      >
        <Link 
          href="/contentmain" 
          className="block py-2 hover:text-gray-200"
        >
          <Home size={20} />
          <span>Inicio</span>
        </Link>
        <Link 
          href="/formulario" 
          className="block py-2 hover:text-gray-200"
        >
          <PlusCircle size={20} />
          <span>Nuevo Consumo</span>
        </Link>
        <button 
          onClick={handleLogout} 
          className="block py-2 hover:text-gray-200"
        >
          <LogOut size={20} />
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </nav>
  );
}
