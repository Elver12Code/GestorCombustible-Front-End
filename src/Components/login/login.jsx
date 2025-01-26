"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { FiUser } from 'react-icons/fi'; 
import { MdLock } from 'react-icons/md';


export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const validUsername = "admin";
  const validPassword = "admin";

  const handleSubmit = (e) => {
    e.preventDefault();

    // Verifica si el usuario y contraseña son correctos
    if (username === validUsername && password === validPassword) {
      console.log('Login exitoso');
      router.push('/contentmain');  
    } else {
      console.log('Usuario o contraseña incorrectos');
      alert('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Contenedor del formulario */}
      <div className="md:w-2/4 bg-[#E6F1F5] p-8 flex flex-col justify-center" >
        <div className="max-w-md mx-auto w-full p-8">
          <img src="/logo.jpg" alt="OGC Logo" className="h-20 mb-8" />
          <h2 className="text-2xl font-bold mb-2 text-center">Iniciar Sesión</h2>
          <p className="text-[#097E00] font-semibold text-sm mb-8 text-center text-[15px]">
            Sistema de Gestion de Combustible
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <input
                type="text"
                placeholder="USUARIO"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pr-10 pl-3 py-2 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-[#6BD098] text-[13px] text-black "
                required
              />
              <FiUser className="absolute top-2.5 right-3 text-black-400" size={20}/>
            </div>

            <div className="relative">
              <input
                type="password"
                placeholder="CONTRASEÑA"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-3 pr-10 py-2 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-[#6BD098] text-[13px] text-black"
                required
              />
              <MdLock className="absolute top-2.5 right-3 text-black-400" size={20}/>
            </div>
            <button
              type="submit"
              className="w-full bg-[#097E00] text-white p-3 rounded font-semibold hover:bg-[#6BD098] focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50"
            >
              INGRESAR
            </button>
          </form>
          
        </div>
      </div>
      {/* Contenedor de la imagen */}
      <div className="w-full md:w-2/4 relative" style={{width: '100%'}}>
        <Image
          src="/carabaya.jpeg"
          alt="Universidad Nacional del Altiplano"
          fill
          style={{ objectFit: 'cover' }}
        />
      </div>
    </div>
  );
}
