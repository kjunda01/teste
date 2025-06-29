import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext.jsx";
import LoadingCircle from "../components/LoadingCircle.jsx";

const ProtectedRoute = () => {
  const { user, loading } = useContext(AuthContext);

  // Enquanto carrega...
  if (loading) {
    return <LoadingCircle message="Entrando..." />;
  }

  // Se usuário válido, libera
  if (user) {
    return <Outlet />;
  }

  // Caso contrário, redireciona
  return <Navigate to="/" replace />;
};

export default ProtectedRoute;
