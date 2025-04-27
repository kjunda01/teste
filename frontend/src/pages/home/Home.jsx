import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Footer from "../../layouts/Footer";
import Header from "../../layouts/Header";
import Camera from "../../components/Camera";

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
        <div className="flex flex-row justify-evenly">
          <div className="flex flex-col">
            <h2 className="flex items-center justify-center">Camera 1</h2>
            <Camera src={"https://www.youtube.com/embed/rnXIjl_Rzy4?autoplay=1&mute=1&si=C7ctG6Pt9WssNFzg"} />
          </div>
          <div className="flex flex-col ">
            <h2 className="flex items-center justify-center">Camera 2</h2>
            <Camera src={"https://www.youtube.com/embed/juUt-rN5CVo?autoplay=1&mute=1&si=AbbGp1Vs9Gfc4JV1"} />
          </div>
        </div>

       
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
