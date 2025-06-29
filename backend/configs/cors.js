import createHttpError from "http-errors";
import logger from "./logger.js";

const isProd = process.env.NODE_ENV === "production";

const allowedOrigins = isProd
  ? ["https://frontend-teste-olive.vercel.app", "https://unipark-gamma.vercel.app", "https://backend-teste-two.vercel.app"]
  : process.env.CORS_URLS?.split(",").map((url) => url.trim()) || [];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    logger.warn(`CORS bloqueado para origem: ${origin}`);
    callback(createHttpError(403, "CORS bloqueado para esta origem"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

console.log("🌐 CORS_URLS carregado:", allowedOrigins);
export default corsOptions;
