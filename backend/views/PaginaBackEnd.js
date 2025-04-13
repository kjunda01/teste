export default function PaginaLoginHTML(frontendUrl = process.env.FRONTEND_URL) {
  return `
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
`;
}
