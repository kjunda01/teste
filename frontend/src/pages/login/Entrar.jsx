import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import PessoaSVG from "../../assets/svgs/PessoaSVG";
import OlhoFechadoSVG from "../../assets/svgs/OlhoFechadoSVG";
import OlhoAbertoSVG from "../../assets/svgs/OlhoAbertoSVG";

const Entrar = () => {
  const API_URL = import.meta.env.VITE_BACKEND_URL;
  const [usuario, setUsuario] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
  
    const showPasswordIcon = () => {
      showPassword ? setShowPassword(false) : setShowPassword(true);
    };

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
      const response = await axios.post(`${API_URL}/api/auth/signinwithpassword`, usuario);
      console.log("Resposta do servidor:", response.data);
    } catch (error) {
      console.error("Erro ao fazer login:", error.response?.data || error.message);
    }
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-white md:bg-gray-200">
      <div className="p-6 bg-white w-screen md:w-2xl md:rounded-xl">
        {/* Título */}
        <div className="flex flex-col items-center text-center justify-center h-full">
          <Link to="https://unilavras.edu.br/0">
            <img
              src="https://novoportal.unilavras.edu.br/assets/svg/logo-full.svg"
              alt=""
              className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24"
            />
          </Link>

          <h1 className="text-3xl font-semibold text-center ">
            <span className="text-sky-500 font-helvetica">UNI</span>
            <span className="text-blue-950 font-bold">PARK</span>
          </h1>
        </div>
        <h2 className="text-xl font-medium text-center mb-6">Login</h2>

        {/* Texto de inscrição */}
        <p className="text-center text-gray-600 ">
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
                type="email"
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
                <PessoaSVG />
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
                type={showPassword ? "text" : "password"}
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
              <div
                className="absolute right-0 top-0 bottom-0 my-auto flex items-center justify-center bg-gray-200 px-2 py-2 rounded-r-md cursor-pointer"
                onClick={showPasswordIcon}
              >
                {showPassword ? <OlhoAbertoSVG /> : <OlhoFechadoSVG />}
              </div>
            </div>
          </fieldset>

          {/* Botão de Submissão */}
          <div>
            <button
              type="submit"
              className="w-full p-2 bg-sky-500 text-white font-semibold rounded-md hover:bg-blue-950 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
              onClick={handleSubmit}
            >
              Acessar
            </button>
          </div>

          {/* Esqueci a Senha */}
          <div className="text-center">
            <p className="text-md text-gray-600">
              <Link to="/recuperar" className="text-sky-500 hover:text-blue-950">
                Esqueceu sua senha?
              </Link>
            </p>
          </div>
        </form>

        {/* Rodapé */}
        <div className="mt-2 text-center text-sm text-gray-500">
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
