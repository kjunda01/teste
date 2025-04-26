// Importa funções necessárias do SDK
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Configurações do Firebase, usando variáveis do .env
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Inicializa o app Firebase apenas uma vez (evita duplicação em Hot Reload)
const app = initializeApp(firebaseConfig);

// Exporta o Auth (e se precisar depois, dá para exportar outros serviços também)
export const auth = getAuth(app);
