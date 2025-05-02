import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import Footer from "../../layouts/Footer";
import Header from "../../layouts/Header";
import Camera from "../../components/Camera";

import UltimoVeiculo from "../../components/UltimoVeiculo";

const Home = () => {
  const { user, signOut, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (!loading && user) {
      setUserData(user); // Atualiza userData com os dados do usuário
    }
  }, [loading, user]);

  // Mostra uma tela de loading até que os dados do usuário estejam disponíveis
  // if (loading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      {/* Conteúdo principal */}
      <main className="flex-1 p-4">
        <div className="flex justify-center w-full mb-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-5xl w-full px-4">
            <div className="flex flex-col items-center">
              <h2 className="text-center font-semibold text-lg mb-2">Câmera 1</h2>
              <Camera src="https://www.youtube-nocookie.com/embed/rnXIjl_Rzy4?autoplay=1&mute=1" />
            </div>
            <div className="flex flex-col items-center">
              <h2 className="text-center font-semibold text-lg mb-2">Câmera 2</h2>
              <Camera src="https://www.youtube-nocookie.com/embed/juUt-rN5CVo?autoplay=1&mute=1" />
            </div>
          </div>
        </div>

        <div className="flex items-center max-w-screen">
          <div className="bg-amber-100 w-full flex flex-col items-center m-2">
            <h2>Últimos veículos</h2>
            <div className="flex flex-wrap gap-4">
              <div className="w-full">
                <UltimoVeiculo />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
