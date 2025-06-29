import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import HoraAtual from "../components/HoraAtual";
import MenuPrincipal from "../components/menu/MenuPrincipal";
import ConfirmModal from "../components/ConfirmModal";
import { AuthContext } from "../contexts/AuthContext";

const Header = () => {
  const { signOutUser } = useContext(AuthContext);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = async () => {
    setShowLogoutModal(false);
    try {
      await signOutUser();
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Erro ao deslogar.");
    }
  };

  return (
    <header className="bg-gray-800 text-blue-900 h-16 md:h-20 flex items-center px-4 relative z-[100]">
      <nav className="flex flex-col md:flex-row justify-between items-center w-full gap-2 md:gap-0">
        {/* Menu Principal */}
        <div className="flex items-center justify-between w-full md:w-auto">
          <MenuPrincipal />
        </div>

        <div className="w-full md:w-auto">
          <ul className="flex flex-col md:flex-row gap-2 md:gap-4 items-center justify-end">
            <li className="flex items-center gap-4 text-white rounded ml-auto">
              {/* Hora: visível só a partir do md */}
              <Link to="/home" className="hidden md:block">
                <HoraAtual />
              </Link>

              {/* Botão de logout menor e mais discreto */}
              <button
                className="bg-red-700 hover:bg-red-800 text-white font-medium py-1 px-2 text-sm rounded"
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
