import { useContext, useEffect } from "react";
import { FaCar, FaMotorcycle, FaTruck } from "react-icons/fa";
import { NovoVeiculoContext } from "../../contexts/NovoVeiculoContext";
import TipoVeiculoCard from "../../components/veiculos/TipoVeiculoCard";

const tiposDeVeiculo = [
  {
    nome: "Carro",
    valor: 1,
    descricao: "Carros e utilitários pequenos",
    icone: FaCar,
  },
  {
    nome: "Moto",
    valor: 2,
    descricao: "Motos",
    icone: FaMotorcycle,
  },
  {
    nome: "Caminhão",
    valor: 3,
    descricao: "Caminhões e micro-ônibus",
    icone: FaTruck,
  },
];

const VeiculosTipo = () => {
  const { veiculo, setVeiculo, tipoNumerico, setTipoNumerico, setMarcaNumerica, setModeloNumerico } =
    useContext(NovoVeiculoContext);

  // Se o tipo mudar ele reseta a marca e o modelo
  useEffect(() => {
    setMarcaNumerica();
    setModeloNumerico();
  }, [tipoNumerico]);

  return (
    <div className="max-w-5xl mx-auto text-center font-sans p-4">
      <h2 className={`text-2xl md:text-3xl font-bold mb-6 ${veiculo.tipo ? "text-green-800" : "text-gray-800"}`}>
        Selecione o tipo de veículo
      </h2>

      <div className="flex flex-wrap justify-center gap-6 sm:gap-10">
        {tiposDeVeiculo.map((tipo) => (
          <TipoVeiculoCard
            key={tipo.nome}
            tipo={tipo}
            tipoNumericoAtual={tipoNumerico}
            setVeiculo={setVeiculo}
            setTipoNumerico={setTipoNumerico}
            Icone={tipo.icone}
            descricao={tipo.descricao}
          />
        ))}
      </div>
    </div>
  );
};

export default VeiculosTipo;
