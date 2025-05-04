import { useContext, useEffect, useState, useCallback } from "react";
import { FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import HoraAtual from "../components/HoraAtual";
import MenuPrincipal from "../components/menu/MenuPrincipal";
import ConfirmModal from "../components/ConfirmModal";

const Header = () => {
  const { user, signOut, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      setUserData(user);
    }
  }, [loading, user]);

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = async () => {
    setShowLogoutModal(false);
    try {
      const { success, error } = await signOut();
      if (success) {
        toast.success("Volte sempre!");
        navigate("/");
      } else {
        toast.error(error);
      }
    } catch (error) {
      toast.error(error.message || "Erro ao deslogar.");
    }
  };

  return (
    <header className="bg-gray-800 text-blue-900 h-16 flex justify-between items-center p-4 relative z-[100]">
      <nav className="flex justify-between w-full">
        {/* Menu Principal */}
        <div className="flex flex-row items-center justify-center">
          <MenuPrincipal />
        </div>

        <div>
          <ul>
            <li className="cursor-pointer transition-all text-white rounded flex flex-row items-center justify-center gap-4">
              <Link to="/home">
                <HoraAtual />
              </Link>
              <Link
                to="/perfil"
                className="flex items-center gap-2 text-white hover:bg-yellow-400 px-2 py-1 rounded transition-all"
              >
                <FaUser />
                {user?.email}
              </Link>

              <button
                className="bg-red-700 hover:bg-red-800 text-white font-semibold py-2 px-4 rounded cursor-pointer"
                type="button"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>
      <ConfirmModal
        isOpen={showLogoutModal}
        title="Deseja sair?"
        message="Você realmente deseja encerrar a sessão?"
        onConfirm={confirmLogout}
        onCancel={() => setShowLogoutModal(false)}
      />
    </header>
  );
};

export default Header;
