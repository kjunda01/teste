import { useContext, useState, useEffect, useRef, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaSignOutAlt, FaChevronDown, FaChevronRight, FaBars } from "react-icons/fa";
import { menuItems } from "../../config/menuConfig";
import { useMenu } from "../../contexts/MenuContext";
import { AuthContext } from "../../contexts/AuthContext";
import ConfirmModal from "../ConfirmModal";

const MenuPrincipal = () => {
  const [openSubmenus, setOpenSubmenus] = useState({});
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { user, signOutUser } = useContext(AuthContext);
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

  const handleLogout = () => setShowLogoutModal(true);

  const confirmLogout = () => {
    setShowLogoutModal(false);
    signOutUser();
  };

  const handleProfileRedirect = () => {
    navigate("/perfil");
    closeMenu();
  };

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
  }, [menuOpen, closeMenu]);

  const buildMenu = (items) =>
    items.map((item, idx) => {
      const isActive = pathname === item.path;
      const hasChildren = Array.isArray(item.children) && item.children.length > 0;

      const isSubmenuActive = (node) => node.children?.some((child) => pathname.startsWith(child.path) || isSubmenuActive(child));

      const isOpen = openSubmenus[item.label] || isSubmenuActive(item);

      return (
        <div key={idx} className="w-full">
          <div className="flex items-center justify-between px-4 py-2 w-full rounded hover:bg-yellow-700 hover:italic">
            {hasChildren ? (
              <button
                onClick={() => toggleSubmenu(item.label)}
                aria-expanded={isOpen}
                className="flex items-center gap-2 w-full text-left cursor-pointer"
              >
                {item.icon}
                {item.label}
              </button>
            ) : (
              <Link
                to={item.path}
                onClick={() => closeMenu()}
                className={`flex items-center gap-2 w-full ${isActive ? "bg-yellow-700 font-semibold rounded-sm" : ""}`}
              >
                {item.icon}
                {item.label}
              </Link>
            )}
            {hasChildren &&
              (isOpen ? (
                <FaChevronDown className="text-sm text-gray-400" />
              ) : (
                <FaChevronRight className="text-sm text-gray-400" />
              ))}
          </div>
          {hasChildren && isOpen && <div className="pl-6">{buildMenu(item.children)}</div>}
        </div>
      );
    });

  const menuContent = useMemo(() => buildMenu(menuItems), [menuItems, openSubmenus, pathname]);

  return (
    <>
      <button
        ref={buttonRef}
        onClick={toggleMenu}
        className="fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded shadow-lg hover:bg-gray-700 transition-colors"
        title="Abrir/Fechar Menu"
      >
        <FaBars size={24} />
      </button>

      <aside
        ref={menuRef}
        className={`fixed top-0 left-0 h-screen bg-gray-800 text-white flex flex-col shadow-lg transform transition-transform duration-300 z-50 w-full max-w-xs sm:max-w-sm md:max-w-md ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between gap-2 p-4 border-b border-gray-700">
          <div className="flex items-center gap-3 cursor-pointer" onClick={handleProfileRedirect}>
            <img src={user.picture} alt="Foto de perfil" className="w-10 rounded-full" />
            <div>
              <p className="text-sm font-semibold">{user?.name || "Usuário"}</p>
              <p className="text-xs text-gray-400">{user?.email || ""}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            title="Sair"
            className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
          >
            <FaSignOutAlt size={18} />
          </button>
        </div>

        <nav className="flex flex-col gap-2 p-4 flex-1 overflow-y-auto">{menuContent}</nav>
      </aside>

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
