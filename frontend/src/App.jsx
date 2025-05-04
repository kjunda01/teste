import React from "react";
import ProtectedRoute from "./services/ProtectedRoute";
import MainLayout from "./layouts/MainLayout";
import { Routes, Route, Navigate } from "react-router-dom";
import { MenuProvider } from "./contexts/MenuContext";
import { publicRoutes, protectedRoutes } from "./config/routesConfig";

const App = () => {
  return (
    <MenuProvider>
      <Routes>
        {/* Rotas públicas */}
        {publicRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}

        {/* Rotas protegidas */}
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            {protectedRoutes.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}
          </Route>
        </Route>

        {/* Se não encontrar nenhuma rota vai para o home */}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </MenuProvider>
  );
};

export default App;
