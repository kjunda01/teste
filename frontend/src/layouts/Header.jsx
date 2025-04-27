import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-gray-800 text-blue-900 h-[10vh] flex justify-between items-center p-4 relative z-[100] md:flex-col md:h-auto md:py-2">
      {/* Logo */}
      {/* <Link to="/home">
        <img
          src="https://unilavras.edu.br/new_site/wp-content/uploads/2018/10/Logo-para-site-barra-de-menu-1.png"
          alt="Logo do projeto Unipark"
          loading="lazy"
          className="h-10 md:h-8"
        />
      </Link> */}

      {/* Navegação */}
      <nav>
        <ul className="flex justify-center items-center list-none m-0 p-0 flex-wrap">
          {/* AO VIVO */}
          <li className="mx-4 px-2 py-1 cursor-pointer transition-all hover:bg-yellow-400 rounded">
            <Link to="/aovivo" className="text-blue-900 font-bold no-underline transition-colors hover:text-blue-500">
              AO VIVO
            </Link>
          </li>

          {/* CONSULTAR */}
          <li className="mx-4 px-2 py-1 cursor-pointer transition-all hover:bg-yellow-400 rounded">
            <Link to="/buscarveiculo" className="text-blue-900 font-bold no-underline transition-colors hover:text-blue-500">
              Consultar
            </Link>
          </li>

          {/* NOVO VEICULO */}
          <li className="mx-4 px-2 py-1 cursor-pointer transition-all hover:bg-yellow-400 rounded">
            <Link to="/cadastrarveiculo" className="text-blue-900 font-bold no-underline transition-colors hover:text-blue-500">
              Novo Veículo
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
