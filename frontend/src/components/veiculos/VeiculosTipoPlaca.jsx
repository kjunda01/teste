import { useContext, useEffect, useState } from "react";
import Select from "react-select";
import { NovoVeiculoContext } from "../../contexts/NovoVeiculoContext";
import ComponentLoader from "../ComponentLoader";

const VeiculosTipoPlaca = () => {
  const [isLoading, setIsLoading] = useState();
  const { setVeiculo, tipoPlacas } = useContext(NovoVeiculoContext);

  const handleChange = (opcaoSelecionada) => {
    setVeiculo((prevState) => ({ ...prevState, tipoPlaca: opcaoSelecionada.label }));
  };

  return (
    <div className="text-center font-sans p-3 w-max-full">
      <ComponentLoader isLoading={isLoading}>
        <Select options={tipoPlacas} onChange={handleChange} name="tipoPlaca" placeholder="Selecione um tipo de placa..." />
      </ComponentLoader>
    </div>
  );
};

export default VeiculosTipoPlaca;
