import React from 'react';
import { CheckCircle, X } from 'lucide-react';
import { useRouter } from 'next/navigation';


interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  message?: string;
}

function RegistroExitoso({ 
  isOpen, 
  onClose,
  message = "Registro guardado exitosamente"
}: SuccessModalProps) {
  const router = useRouter();
  if (!isOpen) return null;
  
  const handleAccept = () => {
    // Puedes reemplazar la ruta a la que quieres navegar
    router.push('/contentmain'); // Cambia '/otra-pagina' por la URL deseada
    onClose(); // Cierra el modal después de hacer clic
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md mx-4 p-6">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={24} />
        </button>

        {/* Content */}
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 text-green-500">
            <CheckCircle size={64} />
          </div>
          
          <h3 className="mb-5 text-lg font-semibold text-gray-800">
            ¡Registro Exitoso!
          </h3>
          
          <p className="mb-6 text-gray-600">
            {message}
          </p>

          <button
            onClick={handleAccept}
            className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}
export default RegistroExitoso;