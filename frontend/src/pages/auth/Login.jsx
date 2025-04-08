import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import PessoaSVG from "../../assets/svgs/PessoaSVG";
import OlhoFechadoSVG from "../../assets/svgs/OlhoFechadoSVG";
import OlhoAbertoSVG from "../../assets/svgs/OlhoAbertoSVG";
import { AuthContext } from "../../contexts/AuthContext";
import LoadingCircle from "../../components/LoadingCircle";

const Login = () => {
  const [usuario, setUsuario] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [erroDaApi, setErroDaApi] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { signInWithPassword } = useContext(AuthContext);

  const showPasswordIcon = () => {
    showPassword ? setShowPassword(false) : setShowPassword(true);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUsuario((prevUsuario) => ({ ...prevUsuario, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setIsLoading(true);
      const { success, user, error } = await signInWithPassword(usuario.email, usuario.password);
      if (error) throw error;

      if (success) {
        setTimeout(() => {
          toast.success("Bem vindo(a), " + user.data.email);
        }, 500);
      }
    } catch (error) {
      toast.error(error);
      setErroDaApi(error);
      setIsLoading(false);
    }
  };

  const handleLoadingComplete = () => {
    navigate("/home");
  };

  // Para conseguir redirecionar do email de recuperação de senha para uma nova pagina
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const params = new URLSearchParams(hash.slice(1)); // remove o `#`
      const accessToken = params.get("access_token");
      const type = params.get("type"); // pode ser `recovery` ou `signup`

      if (accessToken && type === "recovery") {
        // Limpa o hash da URL
        window.history.replaceState(null, null, window.location.pathname);
        // Redireciona para a página de redefinição de senha
        navigate(`/newpassword?access_token=${accessToken}`);
      }
    }
  }, []);

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
                  className="w-14 h-14 md:w-18 md:h-18 lg:w-22 lg:h-22"
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
              <Link to="/signup" className="text-blue-500 hover:text-blue-950 text-xs">
                Crie uma agora mesmo!
              </Link>
            </p>

            {/* Formulário */}
            <form onSubmit={handleSubmit} className="space-y-4">
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
                    className={`bg-gray-50 w-full px-4 py-2 pr-12 border rounded-md focus:outline-none focus:ring-2 ${
                      erroDaApi ? "border-red-300 ring-red-300" : "border-gray-300 focus:ring-blue-400"
                    }`}
                    aria-required="true"
                    placeholder="Digite seu email"
                    autoComplete="true"
                    value={usuario.email}
                    onChange={handleChange}
                  />
                  <div className="flex items-center justify-center bg-gray-200 ml-2 p-2 rounded cursor-default">
                    <PessoaSVG />
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
                    className=" flex items-center justify-center bg-gray-200 ml-2 p-2 rounded cursor-pointer"
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
                  Entrar
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

export default Login;
