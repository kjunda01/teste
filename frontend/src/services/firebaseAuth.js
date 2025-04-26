// src/api/firebaseAuth.js

import axios from "axios";
import { auth } from "../firebase/firebaseClient";

// Função para pegar o token JWT do usuário logado
async function getIdToken() {
  const user = auth.currentUser;
  if (user) {
    return await user.getIdToken();
  }
  return null;
}

// Função genérica para fazer requisições autenticadas para o backend
async function authenticatedRequest(method, url, data = {}) {
  const idToken = await getIdToken();
  if (!idToken) {
    throw new Error("Usuário não autenticado.");
  }

  const config = {
    method,
    url,
    baseURL: import.meta.env.VITE_BACKEND_URL, // define no seu .env
    headers: {
      Authorization: `Bearer ${idToken}`,
      "Content-Type": "application/json",
    },
    data,
  };

  const response = await axios(config);
  return response.data;
}

// Exemplos de funções específicas:

export async function createSomething(payload) {
  return authenticatedRequest("POST", "/api/something", payload);
}

export async function getUserData() {
  return authenticatedRequest("GET", "/api/userdata");
}

export async function updateUserProfile(payload) {
  return authenticatedRequest("PUT", "/api/user/profile", payload);
}

// Você pode adicionar outras funções conforme suas rotas de backend
