import AsyncSelect from "react-select/async";
import { useNovoVeiculo } from "../../contexts/NovoVeiculoContext";
import { apiBackend } from "../../services/apiBackend";
import { useEffect, useState } from "react";

const VeiculosModelo = () => {
  const { veiculo, setVeiculo } = useNovoVeiculo();
  const [opcoes, setOpcoes] = useState([]);

  useEffect(() => {
    const carregar = async () => {
      if (!veiculo.tipo || !veiculo.marca) return;

      try {
        const marcas = await apiBackend.getFipeMarcas(veiculo.tipo);
        const marcaSelecionada = marcas.find((m) => m.label === veiculo.marca);
        if (!marcaSelecionada) return;

        const modelos = await apiBackend.getFipeModelos(veiculo.tipo, marcaSelecionada.value);
        setOpcoes(modelos);
      } catch (err) {
        console.error("Erro ao buscar modelos:", err);
        setOpcoes([]);
      }
    };
    carregar();
  }, [veiculo.tipo, veiculo.marca]);

  return (
    <AsyncSelect
      cacheOptions
      defaultOptions={opcoes}
      loadOptions={() => Promise.resolve(opcoes)}
      value={veiculo.modelo ? { label: veiculo.modelo, value: veiculo.modelo } : null}
      onChange={(option) => {
        setVeiculo((prev) => ({
          ...prev,
          modelo: option?.label || "",
          ano: "",
        }));
      }}
      placeholder="Selecione o modelo"
    />
  );
};

export default VeiculosModelo;
