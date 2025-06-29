import axios from "axios";
import { fipeAPI } from "../../configs/fipeConfig.js";

//const URL_CONSULTAR_MARCAS = "https://veiculos.fipe.org.br/api/veiculos/ConsultarMarcas";
// Tem que passar "codigoTipoVeiculo" - Vai de 1 a 3
// Tem que passar "codigoTabelaReferencia" - 321 é junho de 2025

//const URL_CONSULTAR_MODELOS = "https://veiculos.fipe.org.br/api/veiculos/ConsultarModelos";
// Tem que passar "codigoTipoVeiculo" - Vai de 1 a 3
// Tem que passar "codigoTabelaReferencia" - 321 é junho de 2025
// Tem que passar "codigoMarca" - Código referente a marca específica

//const URL_CONSULTAR_ANOS = "https://veiculos.fipe.org.br/api/veiculos/ConsultarAnoModelo";
// Tem que passar "codigoTipoVeiculo" - Vai de 1 a 3
// Tem que passar "codigoTabelaReferencia" - 321 é junho de 2025
// Tem que passar "codigoMarca" - Código referente a marca específica
// Tem que passar "codigoModelo" - Codigo do modelo específico

// ##################################
// ALTERAR AQUI PARA O MES DE REFERENCIA
// ##################################
const codigoTabela = 321;

// CONSEGUIR OS DADOS REFERENTES AS MARCAS - 1 ETAPA
const obterMarcas = async (codigoTipoVeiculo, codigoTabelaReferencia = codigoTabela) => {
  const response = await axios.post(
    fipeAPI.URL_CONSULTAR_MARCAS,
    new URLSearchParams({
      codigoTipoVeiculo,
      codigoTabelaReferencia,
    }).toString(),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  return response.data;
};

// CONSEGUIR OS DADOS REFERENTES AOS MODELOS - 2 ETAPA
const obterModelos = async (codigoTipoVeiculo, codigoMarca, codigoTabelaReferencia = codigoTabela) => {
  const response = await axios.post(
    fipeAPI.URL_CONSULTAR_MODELOS,
    new URLSearchParams({
      codigoTipoVeiculo,
      codigoMarca,
      codigoTabelaReferencia,
    }).toString(),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  return response.data.Modelos;
};

// CONSEGUIR OS DADOS REFERENTES AOS ANOS- 3 ETAPA
const obterAnos = async (codigoTipoVeiculo, codigoMarca, codigoModelo, codigoTabelaReferencia = codigoTabela) => {
  const response = await axios.post(
    fipeAPI.URL_CONSULTAR_ANOS,
    new URLSearchParams({
      codigoTipoVeiculo,
      codigoMarca,
      codigoModelo,
      codigoTabelaReferencia,
    }).toString(),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  return response.data;
};

export const fipeService = {
  obterMarcas,
  obterModelos,
  obterAnos,
};
