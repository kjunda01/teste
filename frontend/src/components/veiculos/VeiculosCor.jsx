import { useContext, useEffect, useState } from "react";
import Select from "react-select";
import { NovoVeiculoContext } from "../../contexts/NovoVeiculoContext";
import ComponentLoader from "../ComponentLoader";

const VeiculosCor = () => {
  const [isLoading, setIsLoading] = useState();
  const { setVeiculo, cores } = useContext(NovoVeiculoContext);

  const handleChange = (opcaoSelecionada) => {
    setVeiculo((prevState) => ({ ...prevState, cor: opcaoSelecionada.label }));
  };

  return (
    <div className="text-center font-sans p-3 w-max-full">
      <ComponentLoader isLoading={isLoading}>
        <Select
          options={cores}
          onChange={handleChange}
          name="marcas"
          className="w-full"
          classNamePrefix="react-select"
          placeholder="Selecione um modelo..."
        />
      </ComponentLoader>
    </div>
  );
};

export default VeiculosCor;
