// src/pages/Profile.jsx
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import Header from "../../layouts/Header.jsx";
import Footer from "../../layouts/Footer.jsx";
import Wrapper from "../../layouts/Wrapper.jsx";

const Perfil = () => {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (!loading && user) {
      setUserData(user);
    }
  }, [loading, user]);

  return (
    <Wrapper>
      {/* Header */}
      <Header />

      {/* Conteúdo centralizado e responsivo */}
      <div className="flex min-h-screen">
        {/* Conteúdo principal, com padding à esquerda para compensar o menu */}
        <main className="flex-grow p-6">
          <h1 className="text-2xl font-bold mb-4">Perfil</h1>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center gap-4">
              <img
                src={user?.fotoUrl || "/default-avatar.jpg"}
                alt="Foto de perfil"
                className="w-24 h-24 rounded-full object-cover"
              />
              <div>
                <p className="text-2xl font-bold">{user?.nome}</p>
                <p className="text-lg text-gray-600">{user?.email}</p>
              </div>
            </div>
            <div className="mt-4">
              <h2 className="text-xl font-semibold mb-2">Informações de Conta</h2>
              <p>
                <strong>Nome Completo:</strong> {user?.nome}
              </p>
              <p>
                <strong>Email:</strong> {user?.email}
              </p>
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </Wrapper>
  );
};

export default Perfil;
