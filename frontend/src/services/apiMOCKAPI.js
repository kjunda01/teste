import axios from "axios";

const URL_MOCKAPI_VEICULOS =
    "https://6727abed270bd0b9755344ee.mockapi.io/api/veiculos";

const URL_MOCKAPI_ULTIMO_VEICULO =
    "https://6727abed270bd0b9755344ee.mockapi.io/api/ultimoVeiculo";

const MOCKAPI = {
    async getVeiculos() {
        try {
            const response = await axios.get(URL_MOCKAPI_VEICULOS);
            return response.data;
        } catch (error) {
            console.error("Erro ao carregar veículos:", error);
            throw error;
        }
    },

    async getVeiculoUnico(id) {
        try {
            const response = await axios.get(URL_MOCKAPI_VEICULOS + `/${id}`);
            return response.data;
        } catch (error) {
            console.error("Erro ao carregar veículo:", error);
            throw error;
        }
    },

    async deleteVeiculo(id) {
        try {
            const response = await axios.delete(
                URL_MOCKAPI_VEICULOS + `/${id}`
            );
            return response.data;
        } catch (error) {
            console.error("Erro ao deletar veículo:", error);
            throw error;
        }
    },

    async putVeiculo(id, objeto) {
        try {
            const response = await axios.put(
                `${URL_MOCKAPI_VEICULOS}/${id}`,
                objeto
            );
            return response.data;
        } catch (error) {
            console.error("Erro ao atualizar veículo:", error);
            throw error;
        }
    },

    async postVeiculo(objeto) {
        try {
            const response = await axios.post(URL_MOCKAPI_VEICULOS, objeto);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    async getVeiculoPorPlaca(placa) {
        try {
            const response = await axios.get(
                `${URL_MOCKAPI_VEICULOS}?placa=${encodeURIComponent(placa)}`
            );
            return response.data;
        } catch (error) {
            console.error("Erro ao buscar veículo pela placa:", error);
            throw error;
        }
    },

    async getUltimoVeiculo() {
        try {
            const response = await axios.get(URL_MOCKAPI_ULTIMO_VEICULO);
            return response.data;
        } catch (error) {
            console.error("Erro ao carregar veículos:", error);
            throw error;
        }
    },

    async getUltimoVeiculoUnico(id) {
        try {
            const response = await axios.get(
                URL_MOCKAPI_ULTIMO_VEICULO + `/${id}`
            );
            return response.data;
        } catch (error) {
            console.error("Erro ao obter veículo:", error);
            throw error;
        }
    },

    async deleteUltimoVeiculo(id) {
        try {
            const response = await axios.delete(
                URL_MOCKAPI_VEICULOS + `/${id}`
            );
            return response.data;
        } catch (error) {
            console.error("Erro ao deletar veículo:", error);
            throw error;
        }
    },

    async putUltimoVeiculo(id, objeto) {
        try {
            const response = await axios.put(
                `${URL_MOCKAPI_ULTIMO_VEICULO}/${id}`,
                objeto
            );
            return response.data;
        } catch (error) {
            console.error("Erro ao atualizar veículo:", error);
            throw error;
        }
    },

    async postUltimoVeiculo(objeto) {
        try {
            const response = await axios.post(
                URL_MOCKAPI_ULTIMO_VEICULO,
                objeto
            );
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
};

export default MOCKAPI;
