import { useContext, useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { FaUserCircle, FaSignOutAlt, FaChevronDown, FaChevronRight, FaBars } from "react-icons/fa";
import { menuItems } from "../../config/menuConfig";
import { useMenu } from "../../contexts/MenuContext";
import ConfirmModal from "../ConfirmModal";

const MenuPrincipal = () => {
  const [openSubmenus, setOpenSubmenus] = useState({});
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { user, signOut, loading } = useContext(AuthContext);
  const { menuOpen, toggleMenu, closeMenu } = useMenu();
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const toggleSubmenu = (label) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    setShowLogoutModal(false);
    signOut();
  };

  const handleProfileRedirect = () => {
    navigate("/perfil");
    closeMenu();
  };

  // Fecha o menu ao clicar fora e com a tecla Esc
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        closeMenu();
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    if (menuOpen) {
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
  }, [menuOpen]);

  const renderMenuItems = (items) =>
    items.map((item, idx) => {
      const isActive = pathname === item.path;
      const hasChildren = item.children && item.children.length > 0;
      const isSubmenuActive = item.children && item.children.some((subItem) => pathname.includes(subItem.path));
      const isOpen = openSubmenus[item.label] || isSubmenuActive;

      return (
        <div key={idx} className="w-full">
          <button
            onClick={() => (hasChildren ? toggleSubmenu(item.label) : null)}
            className={`w-full flex items-center justify-between px-4 py-2 rounded hover:bg-gray-700 ${
              isActive ? "bg-gray-700 font-semibold" : ""
            }`}
          >
            <Link to={item.path} className="flex items-center gap-2 w-full">
              {item.icon}
              {item.label}
            </Link>
            {hasChildren &&
              (isOpen ? (
                <FaChevronDown className="text-sm text-gray-400" />
              ) : (
                <FaChevronRight className="text-sm text-gray-400" />
              ))}
          </button>

          {/* Submenu */}
          {hasChildren && isOpen && (
            <div className="pl-6">
              {item.children.map((subItem, subIdx) => (
                <Link
                  key={subIdx}
                  to={subItem.path}
                  className={`flex items-center gap-2 px-4 py-2 text-sm rounded hover:bg-gray-700 ${
                    pathname === subItem.path ? "bg-gray-700 font-semibold" : ""
                  }`}
                >
                  {subItem.icon}
                  {subItem.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      );
    });

  return (
    <>
      {/* Botão flutuante */}
      <button
        ref={buttonRef}
        onClick={toggleMenu}
        className="fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded shadow-lg hover:bg-gray-700 transition-colors"
        title="Abrir/Fechar Menu"
      >
        <FaBars size={24} />
      </button>

      {/* Menu lateral com animação */}
      <aside
        ref={menuRef}
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white flex flex-col shadow-lg transform transition-transform duration-300 z-40 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
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

        <nav className="flex flex-col gap-2 p-4 flex-1 overflow-y-auto">{renderMenuItems(menuItems)}</nav>
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
