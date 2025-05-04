import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { FaRegEnvelope, FaRegEye, FaRegEyeSlash } from "react-icons/fa";

import { AuthContext } from "../../contexts/AuthContext";
import LoadingCircle from "../../components/LoadingCircle";
import ComponentLoader from "../../components/ComponentLoader";

const Login = () => {
  const [mensagem, setMensagem] = useState({ remetente: "", email: "", text: "" });
  const [logoLoaded, setLogoLoaded] = useState(false);
  const [erroMensagemInvalida, setErroMensagemInvalida] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMensagem((prevMessage) => ({ ...prevMessage, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = {};
    let hasErrors = false;

    try {
      if (mensagem.remetente === "" || mensagem.remetente.length <= 2) {
        errors.name = "Nome vazio ou muito pequeno.";
        hasErrors = true;
      }
      if (mensagem.email === "" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mensagem.email)) {
        errors.email = "Email inválido ou vazio.";
        hasErrors = true;
      }
      if (mensagem.text === "" || mensagem.text.length <= 2) {
        errors.text = "Mensagem vazia ou muito pequena.";
        hasErrors = true;
      }

      if (hasErrors) {
        throw { message: "Por favor, corrija os seguintes erros:", details: errors };
      }

      setIsLoading(true);
      if (hasErrors) throw errors;
      toast.success(`${mensagem.remetente}, sua mensagem foi enviada com sucesso!`);
      navigate("/home");
    } catch (error) {
      setErroMensagemInvalida(error.details || error.message);
      toast.error(
        <div>
          {error.details ? (
            <>
              <div>{error.message}</div> {/* Mensagem principal */}
              {Object.values(error.details).map((detail, index) => (
                <div key={index} style={{ marginLeft: "10px" }}>
                  ⚠️ {detail}
                </div>
              ))}
            </>
          ) : (
            error.message
          )}
        </div>
      );
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
              <ComponentLoader isLoading={!logoLoaded}>
                <a href="https://unilavras.edu.br/0" target="_blank" rel="noopener noreferrer">
                  <img
                    src="https://novoportal.unilavras.edu.br/assets/svg/logo-full.svg"
                    alt="Logo Unilavras"
                    onLoad={() => setLogoLoaded(true)}
                    className="w-14 h-14 md:w-18 md:h-18 lg:w-22 lg:h-22"
                  />
                </a>
              </ComponentLoader>

              <h1 className="text-3xl font-semibold text-center mb-4">
                <span className="text-sky-500 font-helvetica">UNI</span>
                <span className="text-blue-950 font-bold">PARK</span>
              </h1>
            </div>
            <h2 className="text-xl font-medium text-center mb-6">Contato</h2>

            {/* Texto de inscrição */}
            <p className="text-center text-gray-600 mb-4">
              Deseja entrar em contato? Informe seu nome, email e sua mensagem abaixo!
            </p>

            {/* Formulário */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Campo de Nome */}
              <fieldset className="Input">
                <label htmlFor="name" className="font-bold">
                  Nome
                </label>
                <div className="flex flex-row">
                  <input
                    type={"text"}
                    id="remetente"
                    name="remetente"
                    className={`bg-gray-50 w-full px-4 py-2 pr-12 border rounded-md focus:outline-none focus:ring-2 ${
                      erroMensagemInvalida ? "border-red-300 ring-red-300" : "border-gray-300 focus:ring-blue-400"
                    }`}
                    placeholder="Digite seu nome"
                    value={mensagem.remetente}
                    onChange={handleChange}
                  />
                </div>
              </fieldset>

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
                      erroMensagemInvalida ? "border-red-300 ring-red-300" : "border-gray-300 focus:ring-blue-400"
                    }`}
                    placeholder="Digite seu email"
                    value={mensagem.email}
                    onChange={handleChange}
                  />
                </div>
              </fieldset>

              {/* Campo de Email */}
              <fieldset className="Input">
                <label htmlFor="email" className="font-bold">
                  Mensagem
                </label>
                <div className="flex flex-row">
                  <textarea
                    type="text"
                    id="text"
                    name="text"
                    className={`bg-gray-50 w-full px-4 py-2 pr-12 border rounded-md focus:outline-none focus:ring-2 ${
                      erroMensagemInvalida ? "border-red-300 ring-red-300" : "border-gray-300 focus:ring-blue-400"
                    }`}
                    placeholder="Digite sua mensagem"
                    value={mensagem.text}
                    onChange={handleChange}
                  />
                </div>
              </fieldset>

              {/* Botão de Submissão */}
              <div>
                <button
                  type="submit"
                  className="w-full py-2 bg-sky-500 text-white font-semibold rounded-md hover:bg-blue-950 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
                >
                  Enviar mensagem
                </button>
              </div>

              {/* Fazer login */}
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  <Link to="/login" className="text-sky-500 hover:text-blue-950">
                    Faça login no sistema UniPark!
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
