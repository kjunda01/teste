import React from "react";
import Wrapper from "../../layouts/Wrapper.jsx";
import Footer from "../../layouts/Footer.jsx";
import Header from "../../layouts/Header";
import Camera from "../../components/Camera";
import UltimoVeiculo from "../../components/UltimoVeiculo.jsx";

const AoVivo = () => {
  return (
    <Wrapper>
      <Header />

      <main className="flex flex-row flex-1 w-full p-3 gap-4">
        {/* Coluna da esquerda: Últimos veículos */}
        <div className="w-1/2 bg-amber-50 p-4 rounded-xl shadow-lg overflow-auto max-h-[calc(100vh-12vh)]">
          <h2 className="text-xl font-bold mb-4 text-gray-800 text-center">Últimos veículos</h2>
          <UltimoVeiculo />
        </div>

        {/* Coluna da direita: Câmeras */}
        <div className="w-1/2 grid grid-cols-2 grid-rows-2 gap-4">
          <Camera nome="Câmera 1" src="https://www.youtube-nocookie.com/embed/rnXIjl_Rzy4?autoplay=1&mute=1" />
          <Camera nome="Câmera 2" src="https://www.youtube-nocookie.com/embed/juUt-rN5CVo?autoplay=1&mute=1" />
          <Camera nome="Câmera 3" src="https://www.youtube-nocookie.com/embed/rnXIjl_Rzy4?autoplay=1&mute=1" />
          <Camera nome="Câmera 4" src="https://www.youtube-nocookie.com/embed/juUt-rN5CVo?autoplay=1&mute=1" />
        </div>
      </main>

      <Footer />
    </Wrapper>
  );
};

export default AoVivo;
