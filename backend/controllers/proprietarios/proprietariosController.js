import createError from "http-errors";
import { successResponse } from "../../utils/response.js";
import { proprietariosService } from "../../services/proprietarios/proprietariosService.js";

const getAll = async (req, res, next) => {
  try {
    const data = await proprietariosService.getAll();
    return successResponse(res, "Proprietários listados com sucesso", data);
  } catch (error) {
    return next(createError(500, "Erro ao buscar proprietários.", { cause: error }));
  }
};

const getSingle = async (req, res, next) => {
  try {
    const { matricula } = req.params;
    const data = await proprietariosService.getSingle(matricula);

    if (!data) {
      return next(createError(404, "Proprietário não encontrado."));
    }

    return successResponse(res, "Proprietário encontrado com sucesso", data);
  } catch (error) {
    return next(createError(500, "Erro interno no servidor.", { cause: error }));
  }
};

const getVeiculosPorMatricula = async (req, res, next) => {
  try {
    const { matricula } = req.params;
    const data = await proprietariosService.getVeiculosPorMatricula(matricula);

    if (!data) {
      return next(createError(404, "Veículos do proprietário não encontrados."));
    }

    return successResponse(res, "Veículos do proprietário encontrados com sucesso", data);
  } catch (error) {
    return next(createError(500, "Erro interno no servidor.", { cause: error }));
  }
};

const create = async (req, res, next) => {
  try {
    const data = await proprietariosService.create(req.body);
    return successResponse(res, "Proprietário criado com sucesso", data, 201);
  } catch (error) {
    return next(createError(400, "Falha ao criar proprietário.", { cause: error }));
  }
};

const update = async (req, res, next) => {
  try {
    const data = await proprietariosService.update(req.body);
    return successResponse(res, "Proprietário atualizado com sucesso", data);
  } catch (error) {
    return next(createError(400, "Falha ao atualizar proprietário.", { cause: error }));
  }
};

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await proprietariosService.remove(id);
    return successResponse(res, "Proprietário removido com sucesso", data);
  } catch (error) {
    return next(createError(400, "Falha ao remover proprietário.", { cause: error }));
  }
};

export const proprietariosController = {
  getAll,
  getSingle,
  getVeiculosPorMatricula,
  create,
  update,
  remove,
};
