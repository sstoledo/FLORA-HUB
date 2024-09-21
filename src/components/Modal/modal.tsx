'use client';

import { Heart } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog';
import { useState } from 'react';
import mensajes from '../Flora/notas.json';

interface ModalProps {
  nombreAmor: string;
  mostrarModal: boolean;
  cerrarModal: () => void;
}


export default function Modal({ nombreAmor, mostrarModal, cerrarModal }: ModalProps) {

  const [indiceActual, setIndiceActual] = useState<number>(0);
  const avanzarMensaje = () => {
    if (indiceActual < mensajes.data.mensajes.length - 2) {
      setIndiceActual(indiceActual + 2);
    } else {
      cerrarModal();
    }

  }

  const mensajeActual = mensajes.data.mensajes[indiceActual];
  const mensajeSiguiente = mensajes.data.mensajes[indiceActual + 1];

  return (

    <Dialog open={mostrarModal} onOpenChange={cerrarModal}>
      <DialogContent className="max-w-md w-full bg-white dark:bg-gray-800 font-sans">
        <DialogHeader>
          <DialogTitle className="text-3xl font-extrabold text-yellow-400 text-center font-cursive">Hola {nombreAmor}</DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-center flex-grow overflow-y-auto">
          <p className="mb-4 text-lg font-medium text-gray-700 dark:text-gray-300 leading-relaxed">{mensajeActual.mensaje}</p>
          {mensajeSiguiente &&
            <p className="mb-4 text-lg font-medium text-gray-700 dark:text-gray-300 leading-relaxed">{mensajeSiguiente.mensaje}</p>
          }
        </DialogDescription>
        <div className="flex justify-center my-2">
          <Heart className="text-red-500 animate-pulse" size={48} />
        </div>
        <DialogFooter>
          <button onClick={avanzarMensaje} className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded-full transition duration-300 shadow-md hover:shadow-lg transform hover:scale-105 flex items-center justify-center text-lg">
            {indiceActual < mensajes.data.mensajes.length - 1 ? 'Siguiente' : 'Cerrar'}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}