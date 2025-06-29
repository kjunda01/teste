import AsyncSelect from "react-select/async";
import { useNovoVeiculo } from "../../contexts/NovoVeiculoContext";
import { apiBackend } from "../../services/apiBackend";
import { useEffect, useState } from "react";

const VeiculosAno = () => {
  const { veiculo, setVeiculo } = useNovoVeiculo();
  const [opcoes, setOpcoes] = useState([]);

  useEffect(() => {
    const carregar = async () => {
      if (!veiculo.tipo || !veiculo.marca || !veiculo.modelo) return;

      try {
        const marcas = await apiBackend.getFipeMarcas(veiculo.tipo);
        const marcaSelecionada = marcas.find((m) => m.label === veiculo.marca);
        if (!marcaSelecionada) return;

        const modelos = await apiBackend.getFipeModelos(veiculo.tipo, marcaSelecionada.value);
        const modeloSelecionado = modelos.find((m) => m.label === veiculo.modelo);
        if (!modeloSelecionado) return;

        const anos = await apiBackend.getFipeAnos(veiculo.tipo, marcaSelecionada.value, modeloSelecionado.value);
        setOpcoes(anos);
      } catch (err) {
        console.error("Erro ao buscar anos:", err);
        setOpcoes([]);
      }
    };
    carregar();
  }, [veiculo.tipo, veiculo.marca, veiculo.modelo]);

  return (
    <AsyncSelect
      cacheOptions
      defaultOptions={opcoes}
      loadOptions={() => Promise.resolve(opcoes)}
      value={veiculo.ano ? { label: veiculo.ano, value: veiculo.ano } : null}
      onChange={(option) => {
        setVeiculo((prev) => ({
          ...prev,
          ano: option?.label || "",
        }));
      }}
      placeholder="Selecione o ano"
    />
  );
};

export default VeiculosAno;
