const VeiculosPorProprietario = ({ veiculos }) => {
  if (!veiculos || veiculos.length === 0) {
    return <div className="text-center text-gray-500 py-4">Nenhum veículo encontrado para este proprietário.</div>;
  }

  return (
    <div className="overflow-x-auto w-full rounded-lg shadow-sm border border-gray-300">
      <table className="min-w-full bg-white text-sm">
        <thead className="bg-gray-100 text-gray-700 uppercase tracking-wider">
          <tr>
            <th className="py-3 px-4 text-center">Tipo</th>
            <th className="py-3 px-4 text-center">Marca</th>
            <th className="py-3 px-4 text-center">Modelo</th>
            <th className="py-3 px-4 text-center">Ano</th>
            <th className="py-3 px-4 text-center">Placa</th>
            <th className="py-3 px-4 text-center">Cor</th>
            <th className="py-3 px-4 text-center">Status</th>
          </tr>
        </thead>
        <tbody className="text-gray-800 divide-y divide-gray-200">
          {veiculos.map((veiculo) => (
            <tr key={veiculo.veiculo_id} className="hover:bg-gray-50 transition-colors duration-150">
              <td className="py-3 px-4">{veiculo.tipo}</td>
              <td className="py-3 px-4">{veiculo.marca}</td>
              <td className="py-3 px-4">{veiculo.modelo}</td>
              <td className="py-3 px-4">{veiculo.ano}</td>
              <td className="py-3 px-4 font-mono">{veiculo.placa}</td>
              <td className="py-3 px-4">{veiculo.cor}</td>
              <td className="py-3 px-4">
                <span className={veiculo.status === "Ativo" ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                  {veiculo.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VeiculosPorProprietario;
