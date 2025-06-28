import chalk from "chalk";
import { cacheService } from "../../services/cache/cacheService.js";

const cacheMiddleware = (req, res, next) => {
  const key = req.originalUrl;
  const cachedData = cacheService.get(key);

  if (cachedData) {
    console.log(chalk.blueBright(`[CACHE] Resposta enviada do cache - ${new Date().toLocaleTimeString("pt-BR")}`));
    return res.status(200).json(cachedData);
  }

  // Intercepta resposta para armazenar no cache
  res.sendJson = res.json;
  res.json = (body) => {
    cacheService.set(key, body);
    console.log(chalk.greenBright("[DB] Resposta armazenada no cache"));
    res.sendJson(body);
  };

  next();
};

export default cacheMiddleware;
