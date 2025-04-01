import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";



const Entrar = () => {
  const API_URL = import.meta.env.VITE_BACKEND_URL;
  const [usuario, setUsuario] = useState({ email: "", password: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUsuario((prevUsuario) => ({
      ...prevUsuario,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, usuario);
      console.log("Resposta do servidor:", response.data);
    } catch (error) {
      console.error("Erro ao fazer login:", error.response?.data || error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white md:bg-gray-200">
      <div className="m-0 h-full w-full p-6 bg-white md:rounded-lg md:shadow-2xl md:w-md lg:w-lg xl:w-xl 2xl:w-2xl ">
        {/* Título */}
        <div className="flex flex-col items-center text-center justify-center">
          <a href="https://unilavras.edu.br/0" target="_blank">
            <img
              src="https://novoportal.unilavras.edu.br/assets/svg/logo-full.svg"
              alt=""
              className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24"
            />
          </a>

          <h1 className="text-3xl font-semibold text-center mb-4">
            <span className="text-sky-500 font-helvetica">UNI</span>
            <span className="text-blue-950 font-bold">PARK</span>
          </h1>
        </div>
        <h2 className="text-xl font-medium text-center mb-6">Login</h2>

        {/* Texto de inscrição */}
        <p className="text-center text-gray-600 mb-4">
          Não possui uma conta? <span></span>
          <Link to="/cadastrar" className="text-blue-500 hover:text-blue-950 text-xs">
            Crie uma conta agora!
          </Link>
        </p>

        {/* Formulário */}
        <form action="" className="space-y-4">
          {/* Campo de Email */}
          <fieldset className="Input">
            <label htmlFor="email" className="font-bold">
              Email
            </label>
            <div className="relative">
              <input
                type="text"
                id="email"
                name="email"
                maxLength="32"
                autoFocus
                autoComplete="off"
                className="bg-gray-50 w-full px-4 py-2 pr-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
                aria-required="true"
                placeholder="Digite seu email"
                value={usuario.email}
                onChange={handleChange}
              />
              <div className="absolute right-0 top-0 bottom-0 my-auto flex items-center justify-center bg-gray-200 px-2 py-2 rounded-r-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-gray-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
            </div>
          </fieldset>

          {/* Campo de Senha */}
          <fieldset className="Input">
            <label htmlFor="password" className="font-bold">
              Senha
            </label>
            <div className="relative">
              <input
                type="password"
                id="password"
                name="password"
                maxLength="32"
                autoComplete="off"
                className="bg-gray-50 w-full px-4 py-2 pr-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
                aria-required="true"
                placeholder="Digite sua senha"
                value={usuario.password}
                onChange={handleChange}
              />
              <div className="absolute right-0 top-0 bottom-0 my-auto flex items-center justify-center bg-gray-200 px-2 py-2 rounded-r-md">
                {/* Ícone de olho fechado (visibility_off) */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-gray-500"
                  viewBox="0 -960 960 960"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M791-125 666-250q-50 35-107 52.5T440-180q-139 0-258-82T40-480q36-92 98-163t142-114L125-791l43-43 666 666-43 43Zm-351-85q47 0 89.5-13.5T608-256L323-541q-28 24-50.5 54T232-418q36 66 94.5 102T440-280Zm321-29-45-45q54-36 97.5-87.5T880-480q-37-92-100-163T637-758l-85 85q86 24 154 83t94 130q-14 37-42 77t-57 74ZM487-487Zm-67 51Zm168 42Z" />
                </svg>

                {/* Ícone de olho aberto (visibility) */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-gray-500"
                  viewBox="0 -960 960 960"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M480-320q67 0 113.5-46.5T640-480q0-67-46.5-113.5T480-640q-67 0-113.5 46.5T320-480q0 67 46.5 113.5T480-320Zm0-80q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400ZM480-200q-132 0-240.5-72T40-480q59-136 167.5-208T480-760q132 0 240.5 72T920-480q-59 136-167.5 208T480-200Zm0-280Zm0 200q100 0 185.5-50T840-480q-45-90-130.5-140T480-670q-100 0-185.5 50T120-480q45 90 130.5 140T480-290Z" />
                </svg>
              </div>
            </div>
          </fieldset>

          {/* Botão de Submissão */}
          <div>
            <button
              type="submit"
              className="w-full py-2 bg-sky-500 text-white font-semibold rounded-md hover:bg-blue-950 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
              onClick={handleSubmit}
            >
              Acessar
            </button>
          </div>

          {/* Esqueci a Senha */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              <Link to="/recuperar" className="text-sky-500 hover:text-blue-950">
                Esqueceu sua senha?
              </Link>
            </p>
          </div>
        </form>

        {/* Rodapé */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Todos os direitos reservados a Unilavras</p>
          <p>
            <Link to="/contato" className="text-sky-500 hover:text-blue-950">
              Contato
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Entrar;
