import AsyncSelect from "react-select/async";
import { useNovoVeiculo } from "../../contexts/NovoVeiculoContext";
import { apiBackend } from "../../services/apiBackend";
import { useEffect, useState } from "react";

const VeiculosMarca = () => {
  const { veiculo, setVeiculo } = useNovoVeiculo();
  const [opcoes, setOpcoes] = useState([]);

  useEffect(() => {
    const carregar = async () => {
      if (!veiculo.tipo) return;
      try {
        const marcas = await apiBackend.getFipeMarcas(veiculo.tipo);
        setOpcoes(marcas);
      } catch (err) {
        console.error("Erro ao buscar marcas:", err);
        setOpcoes([]);
      }
    };
    carregar();
  }, [veiculo.tipo]);

  return (
    <AsyncSelect
      cacheOptions
      defaultOptions={opcoes}
      loadOptions={() => Promise.resolve(opcoes)}
      value={veiculo.marca ? { label: veiculo.marca, value: veiculo.marca } : null}
      onChange={(option) => {
        setVeiculo((prev) => ({
          ...prev,
          marca: option?.label || "",
          modelo: "",
          ano: "",
        }));
      }}
      placeholder="Selecione a marca"
    />
  );
};

export default VeiculosMarca;
