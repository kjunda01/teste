import React from "react";
import Camera from "../../components/Camera";
import UltimoVeiculo from "../../components/UltimoVeiculo.jsx";

const AoVivo = () => {
  return (
    <div className="flex flex-col md:flex-row gap-4 px-3 pb-3 flex-1 overflow-hidden">
      {/* BlocoÚltimos veículos */}
      <div className="w-full md:w-1/2p-4 rounded-xl shadow-lg flex-1 overflow-y-auto max-h-[calc(100vh-10vh-20px)]">
        <h2 className="text-xl font-bold mb-4 text-gray-800 text-center">Últimos veículos</h2>
        <UltimoVeiculo />
      </div>

      {/* Bloco Câmeras */}
      <div className="w-full md:w-1/2 p-4 rounded-xl shadow-lg flex-1 overflow-y-auto max-h-[calc(100vh-10vh-20px)]">
        <h2 className="text-xl font-bold mb-4 text-gray-800 text-center">Câmeras</h2>

        {/* As câmeras devem ocupar o bloco todo */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Camera label="Câmera 1" src="https://www.youtube-nocookie.com/embed/rnXIjl_Rzy4?mute=1" />
          <Camera label="Câmera 2" src="https://www.youtube-nocookie.com/embed/juUt-rN5CVo?&mute=1" />
          <Camera label="Câmera 3" src="https://www.youtube-nocookie.com/embed/rnXIjl_Rzy4?&mute=1" />
          <Camera label="Câmera 4" src="https://www.youtube-nocookie.com/embed/juUt-rN5CVo?&mute=1" />
        </div>
      </div>
    </div>
  );
};

export default AoVivo;
