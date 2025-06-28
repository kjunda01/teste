import createError from "http-errors";
import { veiculosService } from "../../services/veiculos/veiculosService.js";

const getAll = async (req, res, next) => {
  try {
    const data = await veiculosService.getAll();
    return successResponse(res, "Veículos listados com sucesso", data);
  } catch (error) {
    return next(createError(500, "Erro ao buscar veículos.", { cause: error }));
  }
};

const getSingle = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await veiculosService.getSingle(id);

    if (!data) {
      return next(createError(404, "Veículo não encontrado."));
    }

    return successResponse(res, "Veículo encontrado com sucesso", data);
  } catch (error) {
    return next(createError(500, "Erro interno no servidor.", { cause: error }));
  }
};

const create = async (req, res, next) => {
  try {
    const data = await veiculosService.create(req.body);
    return successResponse(res, "Veículo criado com sucesso", data, 201);
  } catch (error) {
    return next(createError(400, "Falha ao criar veículo.", { cause: error }));
  }
};

const update = async (req, res, next) => {
  try {
    const data = await veiculosService.update(req.body);
    return successResponse(res, "Veículo atualizado com sucesso", data);
  } catch (error) {
    return next(createError(400, "Falha ao atualizar veículo.", { cause: error }));
  }
};

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await veiculosService.remove(id);
    return successResponse(res, "Veículo removido com sucesso", data);
  } catch (error) {
    return next(createError(400, "Falha ao remover veículo.", { cause: error }));
  }
};

export const veiculosController = {
  getAll,
  getSingle,
  create,
  update,
  remove,
};
