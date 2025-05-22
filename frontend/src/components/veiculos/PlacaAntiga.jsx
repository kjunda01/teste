import { useContext } from "react";
import { NovoVeiculoContext } from "../../contexts/NovoVeiculoContext";

const PlacaAntiga = () => {
  const { veiculo } = useContext(NovoVeiculoContext);
  return (
    <div className="flex flex-col items-center w-full">
      <div className="bg-gray-200 border-4 rounded-xl w-[300px]">
        {/* CIDADE - menor e discreta */}
        <div className="flex items-center justify-between px-3 py-1 bg-gray-400 m-3 rounded-xl">
          {/* Bolinha esquerda */}
          <div className="w-3 h-3 bg-black rounded-full shadow-sm border border-gray-400" />

          {/* Cidade do veículo */}
          <p className="text-center text-sm font-semibold flex-1" style={{ fontFamily: "sans-serif" }}>
            {`${veiculo.estado} - ${veiculo.cidade}`}
          </p>

          {/* Bolinha direita */}
          <div className="w-3 h-3 bg-black rounded-full shadow-sm border border-gray-400" />
        </div>

        {/* PLACA - maior e mais destaque */}
        <div className="flex justify-center pb-6">
          <p className="text-5xl tracking-widest font-bold" style={{ fontFamily: "Mandatory, monospace" }}>
            {veiculo.placa.slice(0, 3) + '-' + veiculo.placa.slice(3, 7)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlacaAntiga;
