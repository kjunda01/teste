import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/auth/Login.jsx";
import SignUp from "./pages/auth/SignUp.jsx";
import PasswordRecovery from "./pages/auth/PasswordRecovery.jsx";

import Consultar from "./pages/consulta/Consultar.jsx";
import Proprietarios from "./pages/consulta/Proprietarios.jsx";
import Veiculos from "./pages/consulta/Veiculos.jsx";

import Contato from "./pages/extras/Contato.jsx";
import Estatisticas from "./pages/extras/Estatisticas.jsx";

import AoVivo from "./pages/home/AoVivo.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* BARRA */}
        <Route path="/" element={<Login />} />

        {/* login */}
        <Route path="/login" element={<Login />} />

        {/* resetpassword */}
        <Route path="/passwordrecovery" element={<PasswordRecovery />} />

        {/* signup */}
        <Route path="/signup" element={<SignUp />} />

        {/* Home */}
        <Route path="/home" element={<AoVivo />} />

        {/* estatisticas */}
        <Route path="/estatisticas" element={<Estatisticas />} />

        {/* contato */}
        <Route path="/contato" element={<Contato />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
