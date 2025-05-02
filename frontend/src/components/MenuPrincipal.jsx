import { useContext, useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaUserCircle, FaBars, FaSignOutAlt } from "react-icons/fa";
import { AuthContext } from "../contexts/AuthContext";
import ConfirmModal from "../components/ConfirmModal";

const MenuPrincipal = () => {
  const { user, signOut } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const buttonRef = useRef(null);

  // Mapeamento dos setores
  const setoresMap = {
    almoxarifado: "Almoxarifado",
    compras: "Compras",
    gabinete: "Gabinete do Prefeito",
    licitacao: "Licitação",
    semed: "Secretaria de Educação",
    terceiros: "Terceiros",
  };

  const setorAtualSlug = pathname.startsWith("/setores/") ? pathname.split("/")[2] : null;
  const setorAtualNome = setoresMap[setorAtualSlug] || null;

  // Menu base
  const menuItems = [
    { label: "🏠 Home", path: "/home" },
    { label: "🔐 Alterar Senha", path: "/alterarsenha" },
  ];

  if (setorAtualSlug) {
    menuItems.unshift({
      label: `🏢 ${setorAtualNome}`,
      path: `/setores/${setorAtualSlug}`,
    });
  }

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    setShowLogoutModal(false);
    signOut();
  };

  const handleProfileRedirect = () => {
    navigate("/perfil");
    setIsOpen(false);
  };

  // Fecha ao clicar fora e com a tecla esc
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      {/* Botão flutuante */}
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded shadow-lg hover:bg-gray-700 transition-colors"
        title="Abrir/Fechar Menu"
      >
        <FaBars size={24} />
      </button>

      {/* Menu lateral com animação */}
      <aside
        ref={menuRef}
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white flex flex-col shadow-lg transform transition-transform duration-300 z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between gap-2 p-4 border-b border-gray-700">
          <div className="flex items-center gap-3 cursor-pointer" onClick={handleProfileRedirect}>
            <FaUserCircle className="text-3xl text-white" />
            <div>
              <p className="text-sm font-semibold">{user?.nome || "Usuário"}</p>
              <p className="text-xs text-gray-400">{user?.email}</p>
            </div>
          </div>
          <button onClick={handleLogout} title="Sair" className="text-gray-400 hover:text-red-500 transition-colors">
            <FaSignOutAlt size={18} />
          </button>
        </div>

        <nav className="flex flex-col gap-2 p-4 flex-1 overflow-y-auto">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={`hover:bg-gray-700 px-3 py-2 rounded ${pathname === item.path ? "bg-gray-700 font-bold" : ""}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Modal de confirmação */}
      <ConfirmModal
        isOpen={showLogoutModal}
        title="Deseja sair?"
        message="Você realmente deseja encerrar a sessão?"
        onConfirm={confirmLogout}
        onCancel={() => setShowLogoutModal(false)}
      />
    </>
  );
};

export default MenuPrincipal;
