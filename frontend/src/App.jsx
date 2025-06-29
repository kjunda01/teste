import ProtectedRoute from "./services/ProtectedRoute";
import MainLayout from "./layouts/MainLayout";
import { Routes, Route, Navigate } from "react-router-dom";
import { MenuProvider } from "./contexts/MenuContext";
import { publicRoutes, protectedRoutes } from "./config/routesConfig";

// Função recursiva para montar rotas e suas rotas filhas
function renderRoutes(routes) {
  return routes.map(({ path, element, children }) => (
    <Route key={path} path={path} element={element}>
      {children && renderRoutes(children)}
    </Route>
  ));
}

const App = () => {
  return (
    <MenuProvider>
      <Routes>
        {/* Rotas públicas */}
        {publicRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}

        {/* Rotas protegidas com aninhamento */}
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>{renderRoutes(protectedRoutes)}</Route>
        </Route>

        {/* Rota fallback */}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </MenuProvider>
  );
};

export default App;
