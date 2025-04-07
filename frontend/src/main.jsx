import "./index.css";
import App from "./App.jsx";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    <ToastContainer position="bottom-left" autoClose={3000} />
  </StrictMode>
);
