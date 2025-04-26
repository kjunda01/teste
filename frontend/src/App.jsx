import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "./pages/auth/Login.jsx";
import SignUp from "./pages/auth/SignUp.jsx";
import PasswordRecovery from "./pages/auth/PasswordRecovery.jsx";
import AoVivo from "./pages/home/AoVivo.jsx";
import Contato from "./pages/extras/Contato.jsx";
import Estatisticas from "./pages/extras/Estatisticas.jsx";
import Consultar from "./pages/consulta/Consultar.jsx";
import Proprietarios from "./pages/consulta/Proprietarios.jsx";
import Veiculos from "./pages/consulta/Veiculos.jsx";

import ProtectedRoute from "./services/ProtectedRoute.jsx";
import NewPassword from "./pages/auth/NewPassword.jsx";

// Rotas públicas
const publicRoutes = [
  { path: "/", element: <Login /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
  { path: "/passwordrecovery", element: <PasswordRecovery /> },
  { path: "/contato", element: <Contato /> },
  { path: "/newpassword", element: <NewPassword /> },
];

// Rotas protegidas
const protectedRoutes = [
  { path: "/home", element: <AoVivo /> },
  { path: "/estatisticas", element: <Estatisticas /> },
  { path: "/consultar", element: <Consultar /> },
  { path: "/proprietarios", element: <Proprietarios /> },
  { path: "/veiculos", element: <Veiculos /> },
];

const App = () => {
  return (
    <Routes>
      {publicRoutes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}

      {protectedRoutes.map(({ path, element }) => (
        <Route key={path} path={path} element={<ProtectedRoute>{element}</ProtectedRoute>} />
      ))}
    </Routes>
  );
};

export default App;
