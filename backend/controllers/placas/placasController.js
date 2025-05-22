import createError from "http-errors";
import { successResponse } from "../../utils/response.js";
import { placasService } from "../../services/placas/placasService.js";

const getSingle = async (req, res, next) => {
  try {
    const { placa } = req.params;
    const data = await placasService.getSingle(placa);

    if (!data) {
      return next(createError(404, "Veículo não encontrado."));
    }

    return successResponse(res, "Veículo encontrado com sucesso", data);
  } catch (error) {
    return next(createError(500, "Erro interno no servidor.", { cause: error }));
  }
};

export const placasController = {
  getSingle,
};
