import axios from "axios";

const URL_CONSULTAR_MARCAS =
    "https://veiculos.fipe.org.br/api/veiculos///ConsultarMarcas";
// Tem que passar "codigoTipoVeiculo" - Vai de 1 a 3
// Tem que passar "codigoTabelaReferencia" - 315 é nov/2024

const URL_CONSULTAR_MODELOS =
    "https://veiculos.fipe.org.br/api/veiculos//ConsultarModelos";
// Tem que passar "codigoTipoVeiculo" - Vai de 1 a 3
// Tem que passar "codigoTabelaReferencia" - 315 é nov/2024
// Tem que passar "codigoMarca" - Código referente a marca específica

const URL_CONSULTAR_ANOS =
    "https://veiculos.fipe.org.br/api/veiculos//ConsultarAnoModelo";
// Tem que passar "codigoTipoVeiculo" - Vai de 1 a 3
// Tem que passar "codigoTabelaReferencia" - 315 é nov/2024
// Tem que passar "codigoMarca" - Código referente a marca específica
// Tem que passar "codigoModelo" - Codigo do modelo específico

const codigoTabela = 315;

const APIFIPE = {
    // CONSEGUIR OS DADOS REFERENTES AS MARCAS - 1 ETAPA
    async getMarcas(codigoTipoVeiculo, codigoTabelaReferencia = codigoTabela) {
        const response = await axios.post(
            URL_CONSULTAR_MARCAS,
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
    },

    // CONSEGUIR OS DADOS REFERENTES AOS MODELOS - 2 ETAPA
    async getModelos(
        codigoTipoVeiculo,
        codigoMarca,
        codigoTabelaReferencia = codigoTabela
    ) {
        const response = await axios.post(
            URL_CONSULTAR_MODELOS,
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
    },

    // CONSEGUIR OS DADOS REFERENTES AOS ANOS- 3 ETAPA
    async getAnos(
        codigoTipoVeiculo,
        codigoMarca,
        codigoModelo,
        codigoTabelaReferencia = codigoTabela
    ) {
        const response = await axios.post(
            URL_CONSULTAR_ANOS,
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
    },
};

export default APIFIPE;