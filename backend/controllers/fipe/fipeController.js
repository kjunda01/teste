import createError from "http-errors";
import { successResponse } from "../../utils/response.js"; // Vamos criar esse arquivo em seguida
import { fipeService } from "../../services/fipe/fipeService.js";

const obterMarcas = async (req, res, next) => {
  const { codigoTipoVeiculo } = req.params;
  if (!codigoTipoVeiculo) return next(createError(400, "Código do tipo de veículo é obrigatório."));
  if (codigoTipoVeiculo < 1 || codigoTipoVeiculo > 3) return next(createError(400, "Código do tipo de veículo deve ser 1, 2 ou 3."));

  try {
    const data = await fipeService.obterMarcas(codigoTipoVeiculo);
    return successResponse(res, "Marcas obtidas com sucesso", data);
  } catch (error) {
    return next(createError(404, "Erro ao obter marcas.", { cause: error }));
  }
};

const obterModelos = async (req, res, next) => {
  const { codigoTipoVeiculo, codigoMarca } = req.params;
  if (!codigoTipoVeiculo) {
    return next(createError(400, "Código do tipo de veículo é obrigatório."));
  }
  if (!codigoMarca) {
    return next(createError(400, "Código da marca é obrigatória."));
  }

  try {
    const data = await fipeService.obterModelos(codigoTipoVeiculo, codigoMarca);
    return successResponse(res, "Modelos obtidos com sucesso", data);
  } catch (error) {
    return next(createError(500, "Erro ao obter modelos.", { cause: error }));
  }
};

const obterAnos = async (req, res, next) => {
  const { codigoTipoVeiculo, codigoMarca, codigoModelo } = req.params;
  if (!codigoTipoVeiculo) {
    return next(createError(400, "Código do tipo de veículo é obrigatório."));
  }
  if (!codigoMarca) {
    return next(createError(400, "Código da marca é obrigatória."));
  }
  if (!codigoModelo) {
    return next(createError(400, "Código do modelo é obrigatório."));
  }

  try {
    const data = await fipeService.obterAnos(codigoTipoVeiculo, codigoMarca, codigoModelo);
    return successResponse(res, "Anos obtidos com sucesso", data);
  } catch (error) {
    return next(createError(500, "Erro ao obter anos.", { cause: error }));
  }
};

export const fipeController = {
  obterMarcas,
  obterModelos,
  obterAnos,
};
