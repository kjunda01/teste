const logger = (req, res, next) => {
  const timestamp = new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next();
};

export default logger;
