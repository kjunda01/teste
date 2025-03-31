import "./index.css";
import App from "./App.jsx";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { ThemeProvider } from "./contexts/ThemeContext.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Entrar from "./pages/login/Entrar.jsx";
import NovoUsuario from "./pages/login/NovoUsuario.jsx";
import AoVivo from "./pages/home/AoVivo.jsx";
import RecuperarUsuario from "./pages/login/RecuperarUsuario.jsx";
import Contato from "./pages/extras/Contato.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/login", element: <Entrar /> },
      { path: "/cadastrar", element: <NovoUsuario /> },
      { path: "/home", element: <AoVivo /> },
      { path: "/cadastrar", element: <AoVivo /> },
      { path: "/recuperar", element: <RecuperarUsuario /> },
      { path: "/contato", element: <Contato /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
);
