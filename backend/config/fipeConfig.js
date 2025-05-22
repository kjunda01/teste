import dotenv from "dotenv";
dotenv.config();

export const fipeAPI = {
  URL_CONSULTAR_MARCAS: process.env.URL_CONSULTAR_MARCAS,
  URL_CONSULTAR_MODELOS: process.env.URL_CONSULTAR_MODELOS,
  URL_CONSULTAR_ANOS: process.env.URL_CONSULTAR_ANOS,
};
