import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingCircle from "../../components/LoadingCircle.jsx";
import { getAuth, confirmPasswordReset } from "firebase/auth";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const NewPassword = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState({ password: "", confirmPassword: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [erroDaApi, setErroDaApi] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const showPasswordIcon = () => {
    showPassword ? setShowPassword(false) : setShowPassword(true);
  };
  const showConfirmPasswordIcon = () => {
    showConfirmPassword ? setShowConfirmPassword(false) : setShowConfirmPassword(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    // Verificando se o código de redefinição (oobCode) está presente na URL
    const urlParams = new URLSearchParams(window.location.search);
    const oobCode = urlParams.get("oobCode");
    if (!oobCode) {
      toast.error("Link inválido.");
      navigate("/login"); // Redireciona para a página de login caso o código não seja válido
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    const oobCode = urlParams.get("oobCode");

    if (!usuario.password) {
      toast.error("Por favor, insira uma nova senha.");
      return;
    }

    if (usuario.password !== usuario.confirmPassword) {
      toast.error("As senhas não coincidem.");
      return;
    }

    try {
      setIsLoading(true);
      const auth = getAuth();
      await confirmPasswordReset(auth, oobCode, usuario.password);
      toast.success("Senha redefinida com sucesso!");
      navigate("/login");
    } catch (err) {
      setErroDaApi(err.message);
      toast.error("Erro ao redefinir a senha.");
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
                    {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
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
