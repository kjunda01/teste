import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Importar useNavigate
import { auth } from "../config/firebaseClient.js";
import { signInWithEmailAndPassword, onAuthStateChanged, signOut as firebaseSignOut } from "firebase/auth";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Definir o hook useNavigate aqui

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const userFromStorage = JSON.parse(savedUser);
      setUser(userFromStorage);
      axios.defaults.headers.common["Authorization"] = `Bearer ${userFromStorage.access_token}`;
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const token = await currentUser.getIdToken();
        const currentUserData = { ...currentUser, access_token: token };
        setUser(currentUserData);
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        localStorage.setItem("user", JSON.stringify(currentUserData));
      } else {
        setUser(null);
        delete axios.defaults.headers.common["Authorization"];
        localStorage.removeItem("user");
      }
    });

    return () => unsubscribe();
  }, []);

  const signInWithPassword = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();
      const currentUser = { ...userCredential.user, access_token: token };

      setUser(currentUser);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      localStorage.setItem("user", JSON.stringify(currentUser));

      // Navegação após o login bem-sucedido
      navigate("/home"); // Aqui é onde o redirecionamento ocorre

      return { success: true, user: currentUser };
    } catch (error) {
      let msg = error.message || "Erro ao fazer login";
      if (error == "FirebaseError: Firebase: Error (auth/invalid-email).") {
        msg = "Email inválido.";
      }
      if (error == "FirebaseError: Firebase: Error (auth/missing-password).") {
        msg = "Senha não pode estar em branco.";
      }
      if (error == "FirebaseError: Firebase: Error (auth/invalid-credential).") {
        msg = "Credenciais inválidas.";
      }
      return { success: false, error: msg };
    }
  };

  const signOutUser = async () => {
    try {
      await firebaseSignOut(auth);
      setUser(null);
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("user");
      return { success: true };
    } catch (error) {
      console.error("Erro no logout:", error);
      return { success: false, error: error.message };
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signInWithPassword, signOut: signOutUser }}>{children}</AuthContext.Provider>
  );
};
