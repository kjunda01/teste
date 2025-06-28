import logger from "../../configs/logger.js";

export const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  logger.error(`${req.method} ${req.originalUrl} - ${status} - ${err.message}`);

  res.status(status).json({
    error: {
      status,
      message: err.message || "Erro interno no servidor",
    },
  });
};
