import createError from "http-errors";
import chalk from "chalk";
import { proprietariosService } from "../../services/proprietarios/proprietariosService.js";
import { cacheService } from "../../services/cache/cacheService.js";

// CREATE
const create = async (req, res, next) => {
  try {
    const proprietario = req.body;
    const resultado = await proprietariosService.create(proprietario);
    cacheService.flush();
    console.log(chalk.yellowBright("Requisição POST"));
    console.log(chalk.yellowBright("[CACHE] Cache invalidado após POST"));
    if (!resultado || resultado.length === 0) {
      throw createError(400, "Falha ao criar proprietário");
    }
    return res.status(200).json(resultado);
  } catch (error) {
    next(error);
  }
};

// READ
const readAllTabela = async (req, res, next) => {
  try {
    const resultado = await proprietariosService.readAllTabela();
    console.log(chalk.yellowBright("Requisição GET"));

    if (!resultado || resultado.length === 0) {
      throw createError(404, "Falha ao encontrar proprietarios.");
    }
    return res.status(200).json(resultado);
  } catch (error) {
    next(error);
  }
};

const readAllView = async (req, res, next) => {
  try {
    const resultado = await proprietariosService.readAllView();
    console.log(chalk.yellowBright("Requisição GET"));

    if (!resultado || resultado.length === 0) {
      throw createError(404, "Falha ao encontrar proprietarios.");
    }
    return res.status(200).json(resultado);
  } catch (error) {
    next(error);
  }
};

const readSingleTabela = async (req, res, next) => {
  try {
    const { matricula } = req.params;
    const resultado = await proprietariosService.readSingleTabela(matricula);
    console.log(chalk.yellowBright("Requisição GET"));

    if (!resultado[0] || resultado[0].length === 0) {
      throw createError(404, "Falha ao encontrar proprietario específico.");
    }
    return res.status(200).json(resultado[0]);
  } catch (error) {
    next(error);
  }
};

const readSingleView = async (req, res, next) => {
  try {
    const { matricula } = req.params;
    const resultado = await proprietariosService.readSingleView(matricula);
    console.log(chalk.yellowBright("Requisição GET"));

    if (!resultado[0] || resultado[0].length === 0) {
      throw createError(404, "Falha ao encontrar proprietario específico.");
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

    const resultado = await proprietariosService.buscarPorTermo(q);

    return res.status(200).json(resultado);
  } catch (error) {
    next(error);
  }
};

// UPDATE
const update = async (req, res, next) => {
  try {
    const { matricula } = req.params;
    const { nome } = req.body;
    const resultado = await proprietariosService.update({ matricula, nome });
    cacheService.flush();
    console.log(chalk.yellowBright("Requisição PUT"));
    console.log(chalk.yellowBright("[CACHE] Cache invalidado após PUT"));
    if (!resultado) {
      throw createError(400, "Falha ao atualizar proprietário.");
    }
    return res.status(200).json({ sucesso: true });
  } catch (error) {
    next(error);
  }
};

// DELETE
const remove = async (req, res, next) => {
  try {
    const { matricula } = req.params;
    const resultado = await proprietariosService.remove(matricula);
    cacheService.flush();
    console.log(chalk.yellowBright("Requisição DELETE"));
    console.log(chalk.yellowBright("[CACHE] Cache invalidado após DELETE"));

    if (!resultado || resultado.length === 0) {
      throw createError(400, "Falha ao remover proprietário.");
    }
    return res.status(200).json(resultado);
  } catch (error) {
    next(error);
  }
};

export const proprietariosController = {
  create,
  readAllTabela,
  readAllView,
  readSingleTabela,
  readSingleView,
  buscarPorTermo,
  update,
  remove,
};
