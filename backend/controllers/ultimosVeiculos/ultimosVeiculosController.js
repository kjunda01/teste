import chalk from "chalk";
import createError from "http-errors";
import { cacheService } from "../../services/cache/cacheService.js";
import { ultimosVeiculosService } from "../../services/ultimosVeiculos/ultimosVeiculosService.js";

const create = async (req, res, next) => {
  try {
    const placa = req.body;
    const resultado = await ultimosVeiculosService.create(placa);
    cacheService.flush();
    console.log(chalk.yellowBright("Requisição POST"));
    console.log(chalk.yellowBright("[CACHE] Cache invalidado após POST"));
    if (!resultado) {
      throw createError(400, "Falha ao salvar veículo");
    }
    return res.status(200).json({ sucesso: true });
  } catch (error) {
    next(error);
  }
};

const readAllTabela = async (req, res, next) => {
  try {
    const resultado = await ultimosVeiculosService.readAllTabela();
    console.log(chalk.yellowBright("Requisição GET"));

    if (!resultado || resultado.length === 0) {
      throw createError(404, "Nenhum veículo encontrado.");
    }
    return res.status(200).json(resultado);
  } catch (error) {
    next(error);
  }
};

const readAllView = async (req, res, next) => {
  try {
    const resultado = await ultimosVeiculosService.readAllView();
    console.log(chalk.yellowBright("Requisição GET"));

    if (!resultado || resultado.length === 0) {
      throw createError(404, "Nenhum veículo encontrado.");
    }
    return res.status(200).json(resultado);
  } catch (error) {
    next(error);
  }
};

const readSingleTabela = async (req, res, next) => {
  try {
    const { placa } = req.params;
    const resultado = await ultimosVeiculosService.readSingleTabela(placa);
    console.log(chalk.yellowBright("Requisição GET"));

    if (!resultado || resultado.length === 0) {
      throw createError(404, "Veículo não encontrado.");
    }
    return res.status(200).json(resultado[0]);
  } catch (error) {
    next(error);
  }
};

const readSingleView = async (req, res, next) => {
  try {
    const { placa } = req.params;
    const resultado = await ultimosVeiculosService.readSingleView(placa);
    console.log(chalk.yellowBright("Requisição GET"));

    if (!resultado || resultado.length === 0) {
      throw createError(404, "Veículo não encontrado.");
    }
    return res.status(200).json(resultado[0]);
  } catch (error) {
    next(error);
  }
};

const buscarPorTermo = async (req, res, next) => {
  try {
    const { q } = req.query;

    if (!q || q.length < 3) {
      return res.status(400).json({ message: "Digite pelo menos 3 caracteres" });
    }

    const resultado = await ultimosVeiculosService.buscarPorTermo(q);

    return res.status(200).json(resultado);
  } catch (error) {
    next(error);
  }
};


const remove = async (req, res, next) => {
  try {
    const { placa } = req.params;
    const resultado = await ultimosVeiculosService.remove(placa);
    cacheService.flush();
    console.log(chalk.yellowBright("Requisição DELETE"));
    console.log(chalk.yellowBright("[CACHE] Cache invalidado após DELETE"));

    if (!resultado) {
      throw createError(400, "Falha ao remover veículo");
    }
    return res.status(200).json({ sucesso: true });
  } catch (error) {
    next(error);
  }
};

export const ultimosVeiculosController = {
  create,
  readAllTabela,
  readAllView,
  readSingleTabela,
  readSingleView,
  buscarPorTermo,
  remove,
};
