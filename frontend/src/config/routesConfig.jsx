import { Navigate } from "react-router-dom";

// Páginas públicas
import Login from "../pages/auth/Login.jsx";
import PasswordRecovery from "../pages/auth/PasswordRecovery.jsx";

// Páginas protegidas
import Home from "../pages/home/Home.jsx";
import Perfil from "../pages/auth/Perfil.jsx";
import AoVivo from "../pages/aovivo/AoVivo.jsx";

import Proprietarios from "../pages/proprietarios/Proprietarios.jsx";
import ConsultarPropretarios from "../pages/proprietarios/ConsultarProprietarios.jsx";
import NovoProprietario from "../pages/proprietarios/NovoProprietario.jsx";

import Veiculos from "../pages/veiculos/Veiculos.jsx";
import ConsultarVeiculos from "../pages/veiculos/ConsultarVeiculos.jsx";
import NovoVeiculo from "../pages/veiculos/NovoVeiculo.jsx";
import { NovoVeiculoProvider } from "../contexts/NovoVeiculoContext.jsx";

// Rotas públicas
export const publicRoutes = [
  { path: "/", element: <Login /> },
  { path: "/login", element: <Login /> },
  { path: "/passwordrecovery", element: <PasswordRecovery /> },
];

// Rotas protegidas
export const protectedRoutes = [
  {
    path: "/home",
    element: <Home />,
  },

  {
    path: "/perfil",
    element: <Perfil />,
  },

  {
    path: "/aovivo",
    element: <AoVivo />,
  },

  {
    path: "/proprietarios",
    element: <Proprietarios />,
    children: [
      {
        path: "consultar",
        element: <ConsultarPropretarios />,
      },
      {
        path: "cadastrar",
        element: <NovoProprietario />,
      },
    ],
  },

  {
    path: "/veiculos",

    element: (
      <NovoVeiculoProvider>
        <Veiculos />
      </NovoVeiculoProvider>
    ),

    children: [
      {
        path: "consultar",
        element: <ConsultarVeiculos />,
      },
      {
        path: "cadastrar",
        element: <NovoVeiculo />,
      },
    ],
  },
];

// Rota para página não encontrada
export const notFoundRoute = {
  path: "*",
  element: <Navigate to="/home" replace />,
};
