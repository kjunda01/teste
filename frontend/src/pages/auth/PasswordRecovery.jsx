import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import PessoaSVG from "../../assets/svgs/PessoaSVG";

import axios from "axios";
import LoadingCircle from "../../components/LoadingCircle";

const PasswordRecovery = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [erroDaApi, setErroDaApi] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    const emailAtual = event.target.value;
    setEmail(emailAtual);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email) {
      toast.error("Email obrigatório.");
      throw new Error("Email obrigatório.");
    }

    try {
      setIsLoading(true);
      toast.success("Siga as instruções no seu e-mail");
      const { data, error } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/newpassword`, { email });
      if (error) throw error;
    } catch (error) {
      const msg = error.response?.data?.error || "Erro inesperado.";
      toast.error(msg);
      setErroDaApi(msg);
    } finally{
      setIsLoading(false)
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
                  className="w-14 h-14 md:w-18 md:h-18 lg:w-22 lg:h-22"
                />
              </a>

              <h1 className="text-3xl font-semibold text-center mb-4">
                <span className="text-sky-500 font-helvetica">UNI</span>
                <span className="text-blue-950 font-bold">PARK</span>
              </h1>
            </div>
            <h2 className="text-xl font-medium text-center mb-6">Recuperar conta</h2>

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
                    type="email"
                    id="email"
                    name="email"
                    className={`bg-gray-50 w-full px-4 py-2 pr-12 border rounded-md focus:outline-none focus:ring-2 ${
                      erroDaApi ? "border-red-300 ring-red-300" : "border-gray-300 focus:ring-blue-400"
                    }`}
                    aria-required="true"
                    placeholder="Digite seu email"
                    autoComplete="true"
                    value={email}
                    onChange={handleChange}
                  />
                  <div className="flex items-center justify-center bg-gray-200 ml-2 p-2 rounded cursor-default">
                    <PessoaSVG />
                  </div>
                </div>
              </fieldset>

              {/* Botão de Submissão */}
              <div>
                <button
                  type="submit"
                  className="w-full py-2 bg-sky-500 text-white font-semibold rounded-md hover:bg-blue-950 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
                >
                  Enviar email de recuperação
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

export default PasswordRecovery;
