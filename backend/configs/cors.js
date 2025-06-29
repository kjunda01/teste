import createError from "http-errors";
import logger from "./logger.js";

const isDev = process.env.NODE_ENV === "development";

const allowedOrigins = process.env.CORS_URLS?.split(",").map((url) => url.trim()) || [];

const corsOptions = {
  origin: (origin, callback) => {
    // Permite sem verificação em dev ou sem origin (ex: Postman)
    if (isDev || !origin) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    logger.warn(`CORS bloqueado para origem: ${origin}`);
    callback(createError(403, "CORS bloqueado para esta origem"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
console.log("🌐 CORS_URLS carregado:", allowedOrigins);

export default corsOptions;
