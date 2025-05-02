import React from "react";
import Wrapper from "../../layouts/Wrapper.jsx";
import Footer from "../../layouts/Footer.jsx";
import Header from "../../layouts/Header";
import Camera from "../../components/Camera";

const AoVivo = () => {
  return (
    <Wrapper>
      <Header />

      <main className="flex-1 flex justify-center items-start w-full mb-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-5xl w-full px-4">
          <Camera nome="Câmera 1" src="https://www.youtube-nocookie.com/embed/rnXIjl_Rzy4?autoplay=1&mute=1" />
          <Camera nome="Câmera 2" src="https://www.youtube-nocookie.com/embed/juUt-rN5CVo?autoplay=1&mute=1" />
 
        </div>
      </main>

      <Footer />
    </Wrapper>
  );
};

export default AoVivo;
