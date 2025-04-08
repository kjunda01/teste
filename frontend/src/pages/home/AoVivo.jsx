import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AoVivo = () => {
  const { user, signOut } = useContext(AuthContext);
  const navigate = useNavigate()

 const handleLogout = async (event) => {
   event.preventDefault();
   

   try {
     const { success, error } = await signOut();

     if (success) {
      //  toast.success("Usuário deslogado: " + user.data.email);
       navigate("/");
     } else {
       toast.error(error);
       throw new Error(error);
     }
   } catch (error) {
     // console.error("Erro completo:", error); // Mostra tudo
     // console.error("Erro.response:", error.response); // Mostra a resposta da API
     // console.error("Erro.response.data:", error.response?.data); // Mostra os dados de erro enviados pelo backend
     //const msg = error.response?.data?.error || "Erro ao fazer login conta";
     //setErroDaApi(msg);
     //toast.error(msg);
     toast.error(error);
     
   }
 };

  return (
    <div>
      <h1>Ao vivo!</h1>
       
      <h2>Usuário logado: {user.data.email}</h2>

      <button className="bg-amber-600 rounded pointer" type="submit" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default AoVivo;
