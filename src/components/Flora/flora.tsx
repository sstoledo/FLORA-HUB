"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart, Moon, Sun, RefreshCw, Info } from "lucide-react";
import useSound from "use-sound";
import Head from "next/head";

import 'swiper/css';
import 'swiper/css/navigation';
import Modal from "../Modal/modal";

export default function Flora() {

  const nombreAmor = "Eli"; // Nombre personalizado
  const [mostrarFlores, setMostrarFlores] = useState(false);
  const [modoOscuro, setModoOscuro] = useState(false);
  const [floresAnimadas, setFloresAnimadas] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);
  const [mostrarModal, setMostrarModal] = useState(false);

  const [playReveal] = useSound("/sounds/reveal.mp3");
  const [playPop] = useSound("/sounds/pop.mp3");

  useEffect(() => {
    document.body.classList.toggle("dark", modoOscuro);
  }, [modoOscuro]);

  const regalarFlores = () => {
    setMostrarFlores(true);
    playReveal();
  };

  const animarFlor = (index: number) => {
    playPop();
    setFloresAnimadas((prev) => {
      const newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });
  };

  const reiniciarAplicacion = () => {
    setMostrarFlores(false);
    setFloresAnimadas([false, false, false, false, false]);
  };

  const abrirModal = () => {
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
  };

  return (
    <>
      <Head>
        <title>Flores Amarillas Digitales</title>
        <meta property="og:title" content="Flores Amarillas Digitales" />
        <meta property="og:description" content="Regala flores amarillas digitales a tu amor" />
        <meta property="og:image" content="/images/floresAmarillas.ico" />
        <meta property="og:url" content="https://sstoledo.netlify.app/" />
        <meta property="og:type" content="website" />
      </Head>
      <div
        className={`min-h-screen transition-colors duration-300 ${modoOscuro
          ? "bg-gradient-to-b from-gray-900 to-purple-900"
          : "bg-gradient-to-b from-purple-400 to-pink-500"
          } flex flex-col items-center justify-center p-4`}
      >
        <button
          onClick={() => setModoOscuro(!modoOscuro)}
          className="absolute top-4 right-4 p-2 rounded-full bg-opacity-50 bg-white dark:bg-opacity-50 dark:bg-gray-800"
        >
          {modoOscuro ? (
            <Sun className="text-yellow-300" />
          ) : (
            <Moon className="text-gray-800" />
          )}
        </button>
        <button
          onClick={reiniciarAplicacion}
          className="absolute top-4 left-4 p-2 rounded-full bg-opacity-50 bg-white dark:bg-opacity-50 dark:bg-gray-800"
        >
          <RefreshCw className={modoOscuro ? "text-purple-300" : "text-purple-600"} />
        </button>
        <div
          className={`bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md transition-colors duration-300 relative`}
        >
          <h1
            className={`text-3xl font-bold text-center mb-6 ${modoOscuro ? "text-purple-300" : "text-purple-600"
              }`}
          >
            Flores Amarillas Digitales
          </h1>
          <div className="flex flex-col items-center space-y-6">
            {!mostrarFlores ? (
              <div className="w-full flex justify-center">
                <button
                  onClick={regalarFlores}
                  className="w-full max-w-xs bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-3 px-6 rounded-full transition duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  Regalar Flores Amarillas
                </button>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="text-center w-full"
              >
                <div className="flex justify-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1, rotate: 360 }}
                      transition={{ delay: i * 0.2 }}
                      className="text-5xl cursor-pointer mx-1"
                      onClick={() => animarFlor(i)}
                    >
                      <motion.div
                        animate={floresAnimadas[i] ? { scale: [1, 1.2, 1] } : { scale: 1 }}
                        transition={{ duration: 0.3, repeat: floresAnimadas[i] ? Infinity : 0, repeatType: "reverse" }}
                      >
                        🌻
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
                <p
                  className={`text-xl mb-6 ${modoOscuro ? "text-white" : "text-gray-700"
                    }`}
                >
                  Para {nombreAmor}, con todo mi{" "}
                  <Heart className="inline-block text-red-500" />
                </p>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                  className={`p-4 rounded-lg ${modoOscuro ? "bg-gray-700" : "bg-yellow-100"
                    }`}
                >
                  <p
                    className={`text-sm font-mono ${modoOscuro ? "text-gray-300" : "text-gray-800"
                      }`}
                  >
                    {`const amor = {
      tu: '${nombreAmor}',
      yo: 'Programador',
      sentimiento: 'infinito'
    };`}
                  </p>
                </motion.div>

                <div className="w-full flex justify-center mt-6">
                  <button
                    onClick={abrirModal}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 shadow-md hover:shadow-lg transform hover:scale-105 flex items-center justify-center"
                  >
                    <Info className="mr-2" /> Más información
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {mostrarModal && (
        <Modal 
          nombreAmor={nombreAmor}
          mostrarModal={mostrarModal}
          cerrarModal={cerrarModal}
        />
      )}


    </>
  );
}
