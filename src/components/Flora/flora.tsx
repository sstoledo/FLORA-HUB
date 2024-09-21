"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart, Moon, Sun, RefreshCw } from "lucide-react";
import useSound from "use-sound";
import Head from "next/head";

export default function Flora() {
  const [nombre, setNombre] = useState("");
  const [mostrarFlores, setMostrarFlores] = useState(false);
  const [modoOscuro, setModoOscuro] = useState(false);
  const [floresAnimadas, setFloresAnimadas] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);

  const [playReveal] = useSound("/sounds/reveal.mp3");
  const [playPop] = useSound("/sounds/pop.mp3");

  useEffect(() => {
    document.body.classList.toggle("dark", modoOscuro);
  }, [modoOscuro]);

  const regalarFlores = () => {
    if (nombre) {
      setMostrarFlores(true);
      playReveal();
    }
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
    setNombre("");
    setMostrarFlores(false);
    setFloresAnimadas([false, false, false, false, false]);
  };

  return (
    <>
      <Head>
        <title>Flores Amarillas Digitales</title>
        <meta property="og:title" content="Flores Amarillas Digitales" />
        <meta property="og:description" content="Regala flores amarillas digitales a tu amor" />
        <meta property="og:image" content="/public/images/floresAmarillas.ico" />
        <meta property="og:url" content="https://sstoledo.netlify.app/" />
        <meta property="og:type" content="website" />
      </Head>
      <div
        className={`min-h-screen transition-colors duration-300 ${
          modoOscuro
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
        <div
          className={`bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md transition-colors duration-300`}
        >
          <h1
            className={`text-3xl font-bold text-center mb-4 ${
              modoOscuro ? "text-purple-300" : "text-purple-600"
            }`}
          >
            Flores Amarillas Digitales
          </h1>
          {!mostrarFlores ? (
            <>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Nombre de tu amor"
                className="w-full p-2 mb-4 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
              />
              <button
                onClick={regalarFlores}
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded transition duration-300"
              >
                Regalar Flores Amarillas
              </button>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="text-center"
            >
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, rotate: 360 }}
                    transition={{ delay: i * 0.2 }}
                    className="text-4xl cursor-pointer"
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
                className={`text-xl mb-4 ${
                  modoOscuro ? "text-white" : "text-gray-200"
                }`}
              >
                Para {nombre.charAt(0).toUpperCase() + nombre.slice(1)}, con todo
                mi{" "}
                <Heart className="inline-block text-red-500" />
              </p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className={`p-4 rounded ${
                  modoOscuro ? "bg-gray-700" : "bg-gray-100"
                }`}
              >
                <p
                  className={`text-sm font-mono ${
                    modoOscuro ? "text-gray-300" : "text-gray-800"
                  }`}
                >
                  {`const amor = {
    tu: '${nombre}',
    yo: 'Programador',
    sentimiento: 'infinito'
  };`}
                </p>
              </motion.div>
              <div className="flex justify-center mt-6">
                <button
                  onClick={reiniciarAplicacion}
                  className={`bg-gradient-to-r from-yellow-400 to-pink-500 hover:from-yellow-500 hover:to-pink-600 text-white font-bold py-2 px-6 rounded-full transition duration-300 flex items-center justify-center shadow-lg ${
                    modoOscuro ? "hover:shadow-purple-500/50" : "hover:shadow-pink-500/50"
                  }`}
                >
                  <RefreshCw className="mr-2" /> Reiniciar
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
}
