import winston from "winston";

// Verifica o ambiente
const isProduction = process.env.NODE_ENV === "production";

// Formato para dev: colorido e legível no console
const devFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.printf(({ timestamp, level, message }) => {
    return `[${timestamp}] ${level}: ${message}`;
  })
);

// Formato para prod: JSON estruturado
const prodFormat = winston.format.combine(winston.format.timestamp(), winston.format.json());

// Inicializa o logger
const logger = winston.createLogger({
  level: "info",
  format: isProduction ? prodFormat : devFormat,
  transports: [
    // Em produção: só console (ex: Vercel, Docker, etc.)
    new winston.transports.Console(),

    // Em desenvolvimento: também salva em arquivo local
    ...(!isProduction
      ? [
          new winston.transports.File({
            filename: "logs/app.log",
            level: "info",
          }),
          new winston.transports.File({
            filename: "logs/error.log",
            level: "error",
          }),
        ]
      : []),
  ],
  exitOnError: false,
});

export default logger;
