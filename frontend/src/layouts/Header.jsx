import { useContext, useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import HoraAtual from "../components/HoraAtual";

const Header = () => {
  const { user, signOut, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (!loading && user) {
      setUserData(user); // Atualiza userData com os dados do usuário
    }
  }, [loading, user]);

  const handleLogout = async (event) => {
    event.preventDefault();
    try {
      const { success, error } = await signOut();

      if (success) {
        toast.info("Desconectado");
        navigate("/");
      } else {
        toast.error(error);
        throw new Error(error);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <header className="bg-gray-800 text-blue-900 h-[10vh] flex justify-between items-start p-4 relative z-[100] md:flex-col md:h-auto md:py-2">
      {/* Navegação */}

      <nav className="flex justify-between w-full md:flex-row md:justify-between">
        <div className="flex flex-row items-center justify-center">
          <ul className="flex justify-center items-center list-none m-0 p-0 flex-wrap">
            <li>
              {/* Logo */}
              <Link to="/home">
                <img
                  src="https://unilavras.edu.br/new_site/wp-content/uploads/2018/10/Logo-para-site-barra-de-menu-1.png"
                  alt="Logo do projeto Unipark"
                  loading="lazy"
                  className="h-5 md:h-5"
                />
              </Link>
            </li>
            {/* AO VIVO */}
            <li className="mx-4 px-2 py-1 cursor-pointer transition-all hover:bg-yellow-400 rounded">
              <Link to="/aovivo" className="text-white font-bold no-underline transition-colors hover:text-gray-800">
                AO VIVO
              </Link>
            </li>

            {/* CONSULTAR */}
            <li className="mx-4 px-2 py-1 cursor-pointer transition-all hover:bg-yellow-400 rounded">
              <Link to="/consultar" className="text-white font-bold no-underline transition-colors hover:text-gray-800">
                Consultar
              </Link>
            </li>

            {/* NOVO VEICULO */}
            <li className="mx-4 px-2 py-1 cursor-pointer transition-all hover:bg-yellow-400 rounded">
              <Link to="/novoveiculo" className="text-white font-bold no-underline transition-colors hover:text-gray-800">
                Novo Veículo
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <ul>
            <li className="mx-4 px-2 py-1 cursor-pointer transition-all text-white rounded flex flex-row items-center justify-center gap-4">
              <HoraAtual />
              <p className="mx-4 px-2 py-1 cursor-pointer transition-all hover:bg-yellow-400 rounded flex gap-2 items-center justify-center">
                <FaUser />
                {user ? <Link to="/home">{user.email}</Link> : <span>Indisponível...</span>}
              </p>

              <button
                className="bg-amber-600 hover:bg-amber-700 text-white font-semibold py-2 px-4 rounded cursor-pointer"
                type="button"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
