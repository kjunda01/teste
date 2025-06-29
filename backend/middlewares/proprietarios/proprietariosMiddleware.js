import bancoDeDados from "../../configs/db.js";
import createError from "http-errors";
import { isValidParam } from "../../utils/isValidParam.js";

const tabela = "proprietarios";
const view = "vw_proprietarios_async_select";

const verificaMatricula = async (req, res, next) => {
  try {
    const { matricula } = req.params;

    if (!isValidParam(matricula)) {
      throw createError(400, "MATRÍCULA inválida ou ausente.");
    }

    const query = `SELECT * FROM ${tabela} WHERE matricula = $1`;
    const { rows } = await bancoDeDados.query(query, [matricula]);

    if (rows.length === 0) {
      throw createError(404, "MATRÍCULA não encontrada na base de dados.");
    }

    next();
  } catch (err) {
    next(err);
  }
};

export const proprietariosMiddleware = { verificaMatricula };
