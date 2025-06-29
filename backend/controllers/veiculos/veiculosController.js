import chalk from "chalk";
import createError from "http-errors";
import { cacheService } from "../../services/cache/cacheService.js";
import { veiculosService } from "../../services/veiculos/veiculosService.js";

const create = async (req, res, next) => {
  try {
    const veiculo = req.body;
    const resultado = await veiculosService.create(veiculo);
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
    const resultado = await veiculosService.readAllTabela();
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
    const resultado = await veiculosService.readAllView();
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
    const resultado = await veiculosService.readSingleTabela(placa);
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
    const resultado = await veiculosService.readSingleView(placa);
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

    const resultado = await veiculosService.buscarPorTermo(q);

    return res.status(200).json(resultado);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const placa = req.params.placa;
    const dados = req.body;
    const resultado = await veiculosService.update({ ...dados, placa });

    cacheService.flush();
    console.log(chalk.yellowBright("Requisição PUT"));
    console.log(chalk.yellowBright("[CACHE] Cache invalidado após PUT"));

    if (!resultado) {
      throw createError(400, "Falha ao atualizar veículo.");
    }

    return res.status(200).json({ sucesso: true });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const { placa } = req.params;
    const resultado = await veiculosService.remove(placa);
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

export const veiculosController = {
  create,
  readAllTabela,
  readAllView,
  readSingleTabela,
  readSingleView,
  buscarPorTermo,
  update,
  remove,
};
