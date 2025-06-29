const ConfirmarResumoVeiculo = ({ veiculo }) => {
  const formatLine = (label, valor) => (
    <p>
      <span className="font-semibold">{label}:</span> {valor || <span className="italic text-gray-500">Não informado</span>}
    </p>
  );

  return (
    <div className="space-y-1 text-gray-800 text-sm sm:text-base">
      {formatLine("Placa", veiculo.placa)}
      {formatLine("Tipo", veiculo.tipo)}
      {formatLine("Marca", veiculo.marca)}
      {formatLine("Modelo", veiculo.modelo)}
      {formatLine("Ano", veiculo.ano)}
      {formatLine("Cor", veiculo.cor)}
      {formatLine("Status", veiculo.status)}
    </div>
  );
};

export default ConfirmarResumoVeiculo;
