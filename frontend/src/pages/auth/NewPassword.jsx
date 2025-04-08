import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { supabase } from "../../config/supabaseClient.js";

import OlhoFechadoSVG from "../../assets/svgs/OlhoFechadoSVG";
import OlhoAbertoSVG from "../../assets/svgs/OlhoAbertoSVG";

const NewPassword = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState({ password: "", confirmPassword: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [erroDaApi, setErroDaApi] = useState("");

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "PASSWORD_RECOVERY") {
        toast.info("Token validado. Agora você pode redefinir sua senha.");
      }
    });

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  const showPasswordIcon = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUsuario((prevUsuario) => ({ ...prevUsuario, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (usuario.password !== usuario.confirmPassword) {
      toast.error("As senhas não coincidem.");
      return;
    }

    if (usuario.password.length < 6) {
      toast.error("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    try {
      const { data, error } = await supabase.auth.updateUser({
        password: usuario.password,
      });

      if (error) {
        setErroDaApi(error.message);
        toast.error("Erro ao atualizar a senha.");
      } else {
        toast.success("Senha redefinida com sucesso!");
        navigate("/login");
      }
    } catch (error) {
      toast.error("Erro inesperado ao redefinir senha.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white md:bg-gray-200">
      <div className="m-0 h-full w-full p-6 bg-white md:rounded-lg md:shadow-2xl md:w-md lg:w-lg xl:w-xl 2xl:w-2xl">
        {/* Título */}
        <div className="flex flex-col items-center text-center justify-center">
          <a href="https://unilavras.edu.br/0" target="_blank">
            <img
              src="https://novoportal.unilavras.edu.br/assets/svg/logo-full.svg"
              alt=""
              className="w-14 h-14 md:w-18 md:h-18 lg:w-22 lg:h-22"
            />
          </a>

          <h1 className="text-3xl font-semibold text-center mb-4">
            <span className="text-sky-500 font-helvetica">UNI</span>
            <span className="text-blue-950 font-bold">PARK</span>
          </h1>
        </div>
        <h2 className="text-xl font-medium text-center mb-6">Redefinição de senha</h2>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Campo de Senha */}
          <fieldset className="Input">
            <label htmlFor="password" className="font-bold">
              Nova Senha
            </label>
            <div className="flex flex-row">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className={`bg-gray-50 w-full px-4 py-2 pr-12 border rounded-md focus:outline-none focus:ring-2 ${
                  erroDaApi ? "border-red-300 ring-red-300" : "border-gray-300 focus:ring-blue-400"
                }`}
                aria-required="true"
                autoComplete="true"
                placeholder="Digite sua senha"
                value={usuario.password}
                onChange={handleChange}
              />
              <div
                className="flex items-center justify-center bg-gray-200 ml-2 p-2 rounded cursor-pointer"
                onClick={showPasswordIcon}
              >
                {showPassword ? <OlhoAbertoSVG /> : <OlhoFechadoSVG />}
              </div>
            </div>
          </fieldset>

          {/* Campo de confirmar Senha */}
          <fieldset className="Input">
            <label htmlFor="confirmPassword" className="font-bold">
              Confirmar Nova Senha
            </label>
            <div className="flex flex-row">
              <input
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                autoComplete="true"
                className={`bg-gray-50 w-full px-4 py-2 pr-12 border rounded-md focus:outline-none focus:ring-2 ${
                  erroDaApi ? "border-red-300 ring-red-300" : "border-gray-300 focus:ring-blue-400"
                }`}
                aria-required="true"
                placeholder="Digite a confirmação da senha"
                value={usuario.confirmPassword}
                onChange={handleChange}
              />
              <div
                className="flex items-center justify-center bg-gray-200 ml-2 p-2 rounded cursor-pointer"
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
              className="w-full py-2 bg-sky-500 text-white font-semibold rounded-md hover:bg-blue-950 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
            >
              Alterar senha
            </button>
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

export default NewPassword;
