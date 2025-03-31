const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: {
      message: err.message || "Erro interno do servidor",
      code: err.code || "INTERNAL_SERVER_ERROR",
    },
  });
};

export default errorHandler;
