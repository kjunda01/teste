import "./index.css";
import App from "./App.jsx";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom"; // Mover para cá
import { AuthProvider } from "./contexts/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
        <ToastContainer position="top-center" autoClose={2000} />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
