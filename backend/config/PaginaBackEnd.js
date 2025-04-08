// // config/PaginaBackEnd.js
// import fs from "fs/promises";
// import path from "path";

// /**
//  * Gera HTML a partir de um arquivo da pasta /views substituindo os %%placeholders%%
//  * @param {string} nome - Nome do arquivo HTML (sem extensão)
//  * @param {Object} variaveis - Objeto com variáveis a substituir (ex: { FRONTEND_URL: "http://localhost:3000" })
//  * @returns {Promise<string>} HTML final
//  */
// export const gerarPaginaHTML = async (nome, variaveis = {}) => {
//   try {
//     const filePath = path.resolve("views", `${nome}.html`);
//     let html = await fs.readFile(filePath, "utf-8");

//     for (const [chave, valor] of Object.entries(variaveis)) {
//       const regex = new RegExp(`%%${chave}%%`, "g");
//       html = html.replace(regex, valor);
//     }

//     return html;
//   } catch (erro) {
//     console.error("Erro ao gerar página HTML:", erro.message);
//     return `<h1>Erro interno</h1><p>Não foi possível carregar a página</p>`;
//   }
// };
export default function PaginaLoginHTML(frontendUrl = process.env.FRONTEND_URL) {
//   return `
// <!DOCTYPE html>
// <html lang="pt-br">
// <head>
//   <meta charset="UTF-8" />
//   <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
//   <title>Unipark Backend</title>
//   <link href="https://cdn.jsdelivr.net/npm/tailwindcss@3.4.1/dist/tailwind.min.css" rel="stylesheet">
// </head>
// <body class="flex items-center justify-center min-h-screen bg-gray-100">
//   <div class="w-full max-w-md bg-white p-8 rounded shadow-lg">
//     <div class="flex flex-col items-center">
//       <img src="https://novoportal.unilavras.edu.br/assets/svg/logo-full.svg" class="w-20 h-20 mb-4" alt="Unilavras">
//       <h1 class="text-3xl font-bold"><span class="text-sky-500">UNI</span><span class="text-blue-950">PARK</span></h1>
//       <h2 class="text-xl text-gray-600 mb-6">ACESSE ABAIXO:</h2>
//     </div>
//     <p class="text-center text-gray-500 text-sm mb-4">
//       Acesso ao sistema UNIPARK? <a href="${frontendUrl}/login" class="text-blue-500 hover:underline">Entre agora</a>
//     </p>
//     <div class="mt-6 text-center text-xs text-gray-400">
//       <p>Todos os direitos reservados a Unilavras</p>
//       <p><a href="${frontendUrl}/contato" class="text-sky-500 hover:text-blue-950">Contato</a></p>
//     </div>
//   </div>
// </body>
// </html>
// `;

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
`
}
