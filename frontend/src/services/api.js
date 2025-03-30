import axios from 'axios';

// Defina a URL da API no ambiente de produção ou localmente
const API_URL = process.env.REACT_APP_API_URL || "https://seu-backend.vercel.app/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const createUser = async (userData) => {
  try {
    const response = await api.post("/users", userData);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar usuário", error);
    throw error;
  }
};

export const getUsers = async () => {
  try {
    const response = await api.get("/users");
    return response.data;
  } catch (error) {
    console.error("Erro ao obter usuários", error);
    throw error;
  }
};
