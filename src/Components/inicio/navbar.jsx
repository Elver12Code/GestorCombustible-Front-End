"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { LogOut, Home, PlusCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const router = useRouter();
  
  const handleLogout = ()=>{
    router.push('log_out');
  }

  return (
    <nav className="bg-[#4CD541] text-white px-4 py-2 flex items-center justify-between">
      {/* Left section - Logo and Municipality name */}
      <div className="flex items-center space-x-2">
        <Image
          src="/logoini.png"
          alt="Municipalidad Logo"
          width={160}
          height={60}
          className="object-contain"
        />
      </div>

      {/* Center section - System name */}
      <div className="text-center flex-1">
        <h1 className="text-xl font-bold">
          SISTEMA DE GESTOR DE COMBUSTIBLE
        </h1>
      </div>

      {/* Right section - Navigation links */}
      <div className="text-xl flex items-center space-x-6 ">
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
    </nav>
  );
}