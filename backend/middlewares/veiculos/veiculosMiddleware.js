import createError from "http-errors";
import connection from "../../config/db.js";

const tabela = "veiculos";

// Verificar se o veículo existe pelo ID (para métodos como UPDATE ou GET)
const existsById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const { rows } = await connection.query(`SELECT * FROM ${tabela} WHERE id = $1`, [id]);

    if (rows.length === 0) {
      return next(createError(404, "Veículo não encontrado."));
    }

    // Veículo encontrado → pode prosseguir
    next();
  } catch (error) {
    return next(createError(500, "Erro ao verificar veículo por ID.", { cause: error }));
  }
};

// Verificar se a placa do veículo já existe (usado para criação)
const existsByPlaca = async (req, res, next) => {
  const { placa } = req.body;

  try {
    const { rows } = await connection.query(`SELECT * FROM ${tabela} WHERE placa = $1`, [placa]);

    if (rows.length > 0) {
      return next(createError(409, "Placa já cadastrada no sistema."));
    }

    // Placa não encontrada → pode prosseguir
    next();
  } catch (error) {
    return next(createError(500, "Erro ao verificar duplicação de placa.", { cause: error }));
  }
};

// Verificar se a placa do veículo é válida (modelo mercosul ou normal)
const placaIsValid = async (req, res, next) => {
  const { placa } = req.body;
  const regex = /^[A-Z]{3}(\d[A-Z]\d{2}|\d{4})$/i;
  const teste = regex.test(placa);
  try {
    if (!teste) {
      return next(createError(404, "Placa inválida/formato diferente."));
    }
    next();
  } catch (error) {
    return next(createError(500, "Erro ao verificar duplicação de placa.", { cause: error }));
  }
};

export const veiculosMiddleware = {
  existsById,
  existsByPlaca,
  placaIsValid,
};
