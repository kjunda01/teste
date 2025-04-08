// config/PaginaBackEnd.js
import fs from "fs/promises";
import path from "path";

/**
 * Gera HTML a partir de um arquivo da pasta /views substituindo os %%placeholders%%
 * @param {string} nome - Nome do arquivo HTML (sem extensão)
 * @param {Object} variaveis - Objeto com variáveis a substituir (ex: { FRONTEND_URL: "http://localhost:3000" })
 * @returns {Promise<string>} HTML final
 */
export const gerarPaginaHTML = async (nome, variaveis = {}) => {
  try {
    const filePath = path.resolve("views", `${nome}.html`);
    let html = await fs.readFile(filePath, "utf-8");

    for (const [chave, valor] of Object.entries(variaveis)) {
      const regex = new RegExp(`%%${chave}%%`, "g");
      html = html.replace(regex, valor);
    }

    return html;
  } catch (erro) {
    console.error("Erro ao gerar página HTML:", erro.message);
    return `<h1>Erro interno</h1><p>Não foi possível carregar a página</p>`;
  }
};
