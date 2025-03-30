import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Porta padrão para desenvolvimento
  },
  build: {
    outDir: "dist", // Pasta de saída para o build
  },
});
