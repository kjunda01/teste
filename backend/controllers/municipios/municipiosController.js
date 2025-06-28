import createError from "http-errors";
import { successResponse } from "../../utils/response.js";
import { municipiosService } from "../../services/municipios/municipiosService.js";

const getAll = async (req, res, next) => {
  try {
    const data = await municipiosService.getAll();
    return successResponse(res, "Municípios listados com sucesso", data);
  } catch (error) {
    return next(createError(500, "Erro ao buscar municípios.", { cause: error }));
  }
};

export const municipiosController = {
  getAll,
};
