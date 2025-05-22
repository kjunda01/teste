export function errorMiddleware(err, req, res, next) {
  const status = err.status || 500;
  const response = {
    status,
    message: err.message || "Erro interno do servidor",
  };

  if (err.errors) {
    response.errors = err.errors;
  }

  res.status(status).json(response);
}
