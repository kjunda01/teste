import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
    setLoading(false); 
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const signInWithPassword = async (email, password) => {
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/signinwithpassword`, { email, password });
      setUser(data);
      return { success: true, user: data };
    } catch (error) {
      const msg = error.response?.data?.error || "Erro ao fazer login";
      return { success: false, error: msg };
    }
  };

  const signOut = async () => {
    try {
      const { data, error } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/signout`);
      setUser(null);
      if (error) throw new Error(error);
      return { success: true };
    } catch (error) {
      const msg = error.response?.data?.error || "Erro ao fazer logout";
      return { success: false, error: msg };
    }
  };

  return <AuthContext.Provider value={{ user, loading, signInWithPassword, signOut }}>{children}</AuthContext.Provider>;
};
