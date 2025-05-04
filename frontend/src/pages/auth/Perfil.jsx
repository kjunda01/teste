// src/pages/Profile.jsx
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext.jsx";
import { useNavigate } from "react-router-dom";


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
    <div className="flex max-h-screen">

      {/* Conteúdo principal, com padding à esquerda para compensar o menu */}
      <main className="flex-grow">
        <h1 className="text-2xl font-bold mb-4 flex justify-center">Perfil</h1>
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
  );
};

export default Perfil;
