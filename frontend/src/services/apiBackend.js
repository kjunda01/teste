import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

// CIDADES
const getCidades = async () => 
  await axios.get(`${backendUrl}/db/cidades`);

const getCidadesPorTermo = async (termo) => 
  await axios.get(`${backendUrl}/db/cidades/busca`, { params: { q: termo } });

// FIPE
const getFipeMarcas = async (tipo) => 
  await axios.post(`${backendUrl}/fipe/${tipo}`);

const getFipeModelos = async (tipo, marca) => 
  await axios.post(`${backendUrl}/fipe/${tipo}/${marca}`);

const getFipeAnos = async (tipo, marca, modelo) => 
  await axios.post(`${backendUrl}/fipe/${tipo}/${marca}/${modelo}`);

// PROPRIETÁRIOS
const getProprietarios = async () =>
  await axios.get(`${backendUrl}/db/proprietarios`);

const getProprietariosPorTermo = async (termo) =>
  await axios.get(`${backendUrl}/db/proprietarios/busca`, { params: { q: termo } });

const addProprietario = async (proprietario) =>
  await axios.post(`${backendUrl}/db/proprietarios`, proprietario);

const updateProprietario = async (proprietario) =>
  await axios.put(`${backendUrl}/db/proprietarios/${proprietario.matricula}`, { nome: proprietario.nome });

const deleteProprietario = async (matricula) =>
  await axios.delete(`${backendUrl}/db/proprietarios/${matricula}`);


// VEÍCULOS
const getVeiculos = async () =>
  await axios.get(`${backendUrl}/db/veiculos`);

const getVeiculosPorTermo = async (termo) =>
  await axios.get(`${backendUrl}/db/veiculos/busca`, { params: { q: termo } });

const addVeiculo = async (veiculo) =>
  await axios.post(`${backendUrl}/db/veiculos`, veiculo);

const updateVeiculo = async (veiculo) =>
  await axios.put(`${backendUrl}/db/veiculos/${veiculo.placa}`, veiculo);

const deleteVeiculo = async (placa) =>
  await axios.delete(`${backendUrl}/db/veiculos/${placa}`);


export const apiBackend = {
  getCidades,
  getCidadesPorTermo,
  getFipeMarcas,
  getFipeModelos,
  getFipeAnos,
  getProprietarios,
  getProprietariosPorTermo,
  addProprietario,
  updateProprietario,
  deleteProprietario,
  getVeiculos,
  getVeiculosPorTermo,
  addVeiculo,
  updateVeiculo,
  deleteVeiculo,
};
