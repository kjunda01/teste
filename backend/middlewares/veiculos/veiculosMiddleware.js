import bancoDeDados from "../../configs/db.js";
import createError from "http-errors";
import { isValidParam } from "../../utils/isValidParam.js";

const verificaPlaca = async (req, res, next) => {
  try {
    const { placa } = req.params;

    if (!isValidParam(placa)) {
      throw createError(400, "PLACA inválida ou ausente.");
    }

    const query = "SELECT * FROM veiculos WHERE LOWER(placa) = LOWER($1)";
    const { rows } = await bancoDeDados.query(query, [placa]);

    if (rows.length === 0) {
      throw createError(404, "PLACA não encontrada na base de dados.");
    }

    next();
  } catch (err) {
    next(err);
  }
};

export const veiculosMiddleware = { verificaPlaca };
