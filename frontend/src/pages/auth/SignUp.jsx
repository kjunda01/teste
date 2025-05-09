import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { FaRegEnvelope, FaRegEye, FaRegEyeSlash } from "react-icons/fa";

import LoadingCircle from "../../components/LoadingCircle";

const SignUp = () => {
  const [usuario, setUsuario] = useState({ email: "", password: "", confirmPassword: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [erroDaApi, setErroDaApi] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const showPasswordIcon = () => {
    showPassword ? setShowPassword(false) : setShowPassword(true);
  };
  const showConfirmPasswordIcon = () => {
    showConfirmPassword ? setShowConfirmPassword(false) : setShowConfirmPassword(true);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUsuario((prevUsuario) => ({ ...prevUsuario, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setIsLoading(false);
      if (usuario.password !== usuario.confirmPassword) {
        toast.error("As senhas não coincidem.");
        return;
      }

      const { data, error } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/createUserWithEmailAndPassword`, {
        email: usuario.email,
        password: usuario.password,
      });

      setIsLoading(true);
      if (error) throw error;
      toast.success("Usuário criado com sucesso!");
      navigate("/home");
    } catch (error) {
      let msg = error?.response?.data?.error;
      if (msg == "Firebase: Error (auth/email-already-in-use).") {
        msg = "Email já cadastrado.";
      }
      toast.error(msg);
      setErroDaApi(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadingComplete = () => {
    navigate("/home");
  };

  return (
    <>
      {isLoading && <LoadingCircle onComplete={handleLoadingComplete} />}
      {!isLoading && (
        <div className="flex items-center justify-center min-h-screen bg-white md:bg-gray-200">
          <div className="m-0 h-full w-full p-6 bg-white md:rounded-lg md:shadow-2xl md:w-md lg:w-lg xl:w-xl 2xl:w-2xl ">
            {/* Título */}
            <div className="flex flex-col items-center text-center justify-center">
              <a href="https://unilavras.edu.br/0" target="_blank">
                <img
                  src="https://novoportal.unilavras.edu.br/assets/svg/logo-full.svg"
                  alt=""
                  className="w-8 h-8 md:w-12 md:h-12 lg:w-16 lg:h-16"
                />
              </a>

              <h1 className="text-1xl font-semibold text-center mb-4">
                <span className="text-sky-500 font-helvetica">UNI</span>
                <span className="text-blue-950 font-bold">PARK</span>
              </h1>
            </div>
            <h2 className="text-xl font-medium text-center mb-6">Novo usuário</h2>

            {/* Texto de inscrição */}
            <p className="text-center text-gray-600 mb-3">
              Já possui uma conta? <span></span>
              <Link to="/login" className="text-blue-500 hover:text-blue-950 text-xs">
                Faça login agora!
              </Link>
            </p>

            {/* Formulário */}
            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Campo de Email */}
              <fieldset className="Input">
                <label htmlFor="email" className="font-bold">
                  Email
                </label>
                <div className="flex flex-row">
                  <input
                    type="text"
                    id="email"
                    name="email"
                    className={`bg-gray-50 w-full px-3 py-1 pr-12 border rounded-md focus:outline-none focus:ring-2 ${
                      erroDaApi ? "border-red-300 ring-red-300" : "border-gray-300 focus:ring-blue-400"
                    }`}
                    aria-required="true"
                    placeholder="Digite seu email"
                    autoComplete="true"
                    value={usuario.email}
                    onChange={handleChange}
                  />
                  <div className="flex items-center justify-center bg-gray-200 ml-2 p-2 rounded cursor-default">
                    <FaRegEnvelope />
                  </div>
                </div>
              </fieldset>

              {/* Campo de Senha */}
              <fieldset className="Input">
                <label htmlFor="password" className="font-bold">
                  Senha
                </label>
                <div className="flex flex-row">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    className={`bg-gray-50 w-full px-3 py-1 pr-12 border rounded-md focus:outline-none focus:ring-2 ${
                      erroDaApi ? "border-red-300 ring-red-300" : "border-gray-300 focus:ring-blue-400"
                    }`}
                    aria-required="true"
                    autoComplete="true"
                    placeholder="Digite sua senha"
                    value={usuario.password}
                    onChange={handleChange}
                  />
                  <div
                    className=" flex items-center justify-center bg-gray-200 ml-2 p-2 rounded cursor-pointer"
                    onClick={showPasswordIcon}
                  >
                    {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                  </div>
                </div>
              </fieldset>

              {/* Campo de confirmar Senha */}
              <fieldset className="Input">
                <label htmlFor="confirmPassword" className="font-bold">
                  Confirma Senha
                </label>
                <div className="flex flex-row">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    autoComplete="true"
                    className={`bg-gray-50 w-full px-3 py-1 pr-12 border rounded-md focus:outline-none focus:ring-2 ${
                      erroDaApi ? "border-red-300 ring-red-300" : "border-gray-300 focus:ring-blue-400"
                    }`}
                    aria-required="true"
                    placeholder="Digite a confirmação da senha"
                    value={usuario.confirmPassword}
                    onChange={handleChange}
                  />
                  <div
                    className=" flex items-center justify-center bg-gray-200 ml-2 p-2 rounded cursor-pointer"
                    onClick={showConfirmPasswordIcon}
                  >
                    {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                  </div>
                </div>
              </fieldset>

              {/* Botão de Submissão */}
              <div>
                <button
                  type="submit"
                  className="w-full py-2 bg-sky-500 text-white font-semibold rounded-md hover:bg-blue-950 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
                >
                  Criar conta!
                </button>
              </div>

              {/* Esqueci a Senha */}
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  <Link to="/passwordrecovery" className="text-sky-500 hover:text-blue-950">
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
      )}
    </>
  );
};

export default SignUp;
