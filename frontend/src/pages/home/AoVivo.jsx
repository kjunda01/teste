import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

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
    <div>
      <h1>Ao vivo!</h1>

      {userData && <h2>Usuário logado: {userData.email}</h2>}

      <button className="bg-amber-600 rounded pointer" type="submit" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default AoVivo;
