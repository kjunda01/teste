import createError from "http-errors";
import chalk from "chalk";
import { cidadesService } from "../../services/cidades/cidadesService.js";

const readAllView = async (req, res, next) => {
  try {
    const resultado = await cidadesService.readAllView();
    console.log(chalk.yellowBright("Requisição GET"));

    if (!resultado || resultado.length === 0) {
      throw createError(404, "Falha ao encontrar municípios.");
    }
    return res.status(200).json(resultado);
  } catch (error) {
    next(error);
  }
};

export const cidadesController = {
  readAllView,
};
