import createError from "http-errors";
import connection from "../../configs/db.js";

const tabela = "veiculos";

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
  const { placa } = req.params;

  // Valida:
  // - Novo padrão Mercosul: XXX1X11 (3 letras, 1 número, 1 letra, 2 números)
  // - Padrão antigo: XXX1111 (3 letras, 4 números)
  const regex = /^[A-Z]{3}\d[A-Z]\d{2}$|^[A-Z]{3}\d{4}$/i;

  const teste = regex.test(placa);

  try {
    if (!teste) {
      return next(createError(400, "Placa inválida. Formatos aceitos: novo Mercosul (XXX1X11) ou antigo (XXX1111)."));
    }
    next();
  } catch (error) {
    return next(createError(500, "Erro interno ao validar placa.", { cause: error }));
  }
};

export const placasMiddleware = {
  existsByPlaca,
  placaIsValid,
};
