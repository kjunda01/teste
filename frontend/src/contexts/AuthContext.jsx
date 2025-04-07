import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Verifica se há sessão ativa
  const fetchSession = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) return setLoading(false);

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/getsession`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setUser(data.user);
    } catch (error) {
      console.warn("Sessão inválida");
      localStorage.removeItem("access_token");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSession();
  }, []);

  const login = (userData, token) => {
    localStorage.setItem("access_token", token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, login, logout, loading }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
