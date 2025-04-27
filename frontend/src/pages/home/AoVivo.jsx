import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Footer from "../../layouts/Footer";
import Header from "../../layouts/Header";

const AoVivo = () => {
  const { user, signOut, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);

  // UseEffect para garantir que o usuário seja exibido assim que o estado for atualizado
  useEffect(() => {
    if (!loading && user) {
      setUserData(user); // Atualiza userData com os dados do usuário
    }
  }, [loading, user]);

  const handleLogout = async (event) => {
    event.preventDefault();
    try {
      const { success, error } = await signOut();

      if (success) {
        navigate("/");
      } else {
        toast.error(error);
        throw new Error(error);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  // Mostra uma tela de loading até que os dados do usuário estejam disponíveis
  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header/>

      {/* Conteúdo principal */}
      <main className="flex-1 p-4">
        <h1 className="text-2xl font-bold mb-4">Ao vivo!</h1>
        <p>Conteúdo</p>

        {userData && <h2 className="text-lg mt-4">Usuário logado: {userData.email}</h2>}

        <button
          className="mt-6 bg-amber-600 hover:bg-amber-700 text-white font-semibold py-2 px-4 rounded cursor-pointer"
          type="button"
          onClick={handleLogout}
        >
          Logout
        </button>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AoVivo;
