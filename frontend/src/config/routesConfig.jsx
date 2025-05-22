import Login from "../pages/auth/Login.jsx";
import SignUp from "../pages/auth/SignUp.jsx";
import PasswordRecovery from "../pages/auth/PasswordRecovery.jsx";
import NewPassword from "../pages/auth/NewPassword.jsx";
import Perfil from "../pages/auth/Perfil.jsx";

import Home from "../pages/home/Home.jsx";
import Contato from "../pages/extras/Contato.jsx";
import Estatisticas from "../pages/extras/Estatisticas.jsx";
import AoVivo from "../pages/aovivo/AoVivo.jsx";

import Proprietarios from "../pages/proprietarios/Proprietarios.jsx";
import NovoProprietario from "../pages/proprietarios/NovoProprietario.jsx";
import ConsultarProprietarios from "../pages/proprietarios/ConsultarProprietarios.jsx";

import Veiculos from "../pages/veiculos/Veiculos.jsx";
import NovoVeiculo from "../pages/veiculos/NovoVeiculo.jsx";
import ConsultarVeiculos from "../pages/veiculos/ConsultarVeiculos.jsx";

import Teste from "../pages/teste/Teste.jsx";
import { Navigate } from "react-router-dom";
import { NovoVeiculoProvider } from "../contexts/NovoVeiculoContext.jsx";

// Rotas públicas
export const publicRoutes = [
  { path: "/", element: <Login /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
  { path: "/passwordrecovery", element: <PasswordRecovery /> },
  { path: "/contato", element: <Contato /> },
  { path: "/newpassword", element: <NewPassword /> },
];

// Rotas protegidas
export const protectedRoutes = [
  { path: "/home", element: <Home /> },
  { path: "/aovivo", element: <AoVivo /> },
  { path: "/estatisticas", element: <Estatisticas /> },
  { path: "/perfil", element: <Perfil /> },
  { path: "/veiculos", element: <Veiculos /> },
  { path: "/veiculos/consultar", element: <ConsultarVeiculos /> },
  {
    path: "/veiculos/cadastrar",
    element: (
      <NovoVeiculoProvider>
        <NovoVeiculo />
      </NovoVeiculoProvider>
    ),
  },
  { path: "/proprietarios", element: <Proprietarios /> },
  { path: "/proprietarios/consultar", element: <ConsultarProprietarios /> },
  { path: "/proprietarios/cadastrar", element: <NovoProprietario /> },
  { path: "/teste", element: <Teste /> },
];

// Opcional: Rota para página não encontrada
export const notFoundRoute = {
  path: "*",
  element: <Navigate to="/home" replace />,
};
