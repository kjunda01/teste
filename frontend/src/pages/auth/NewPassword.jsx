import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import OlhoFechadoSVG from "../../assets/svgs/OlhoFechadoSVG";
import OlhoAbertoSVG from "../../assets/svgs/OlhoAbertoSVG";
import LoadingCircle from "../../components/LoadingCircle.jsx";
import axios from "axios";

const NewPassword = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState({ password: "", confirmPassword: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [erroDaApi, setErroDaApi] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const showPasswordIcon = () => {
    showPassword ? setShowPassword(false) : setShowPassword(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    // Extrai o hash da URL sem o símbolo #
    const hash = window.location.hash.slice(1);
    const hashParams = new URLSearchParams(hash);

    // Inicializa o objeto vazio
    const urlData = {};

    // cria o objeto com as entradas do hash
    [...hashParams.entries()].forEach(([key, value]) => {
      urlData[key] = value;
    });

    // Armazena o objeto completo no localStorage como string JSON
    localStorage.setItem("supabaseRecoverySession", JSON.stringify(urlData));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Percorre o localstorage pra ver qual é a chave
    // for (let key in localStorage) {
    //   if (key.startsWith("sb") && key.endsWith("auth-token")) {
    //     const session = localStorage.getItem(key);
    //     setLocalStorageSession(JSON.parse(session));
    //   }
    // }

    if (!localStorage.getItem("supabaseRecoverySession")) {
      toast.error("Sessão não encontrada no localStorage.");
      return;
    }

    try {
      setIsLoading(true);
      const { setSessionData, setSessionStatus } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/setsession`,
        localStorage.getItem("supabaseRecoverySession")
      );
      console.log(setSessionData)
      console.log(setSessionStatus);

      // if (setSessionStatus === 200) {
      //   const { updateUserPasswordData, updateUserPasswordStatus } = await axios.post(
      //     `${import.meta.env.VITE_BACKEND_URL}/api/auth/updateuserpassword`,
      //     {
      //       password: usuario.password,
      //     }
      //   );
      //   console.log(updateUserPasswordData.message);
      // } else {
      //   throw new Error("Erro ao definir a sessão.");
      // }

      // if ((await setSession).status !== 200) {
      //   const error = updateUserPassword.data.message;
      //   throw error;
      // }
    } catch (error) {
      console.log(error);
      const msg = error.response?.data?.message || "Erro inesperado.";
      toast.error(msg);
      setErroDaApi(msg);
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
      )}
    </>
  );
};
export default NewPassword;
