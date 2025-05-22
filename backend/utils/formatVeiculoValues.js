export const formatVeiculoValues = (veiculo) => [
    veiculo.tipo,
    veiculo.marca,
    veiculo.modelo,
    veiculo.ano,
    veiculo.placa,
    veiculo.cor,
    veiculo.status,
    veiculo.matricula_proprietario,
  ];
  

  export const formatVeiculoValuesWithId = (veiculo) => [
    ...formatVeiculoValues(veiculo),
    veiculo.id
  ];
  