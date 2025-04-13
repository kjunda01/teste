const logger = (req, res, next) => {
  const timestamp = new Date().toLocaleString("pt-BR", {
    timeZone: "America/Sao_Paulo",
  });

  const method = req.method;
  const url = req.originalUrl || req.url;
  const ip = req.ip || req.connection.remoteAddress;

  // Aguarda o envio da resposta para capturar o status
  res.on("finish", () => {
    const status = res.statusCode;
    console.warn(
      `[${timestamp}] | ${ip} | ${method} | ${status} | ${url}`,
    );
  });

  next();
};

export default logger;
