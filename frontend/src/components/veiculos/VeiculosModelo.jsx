import { useContext, useEffect, useState } from "react";
import Select from "react-select";
import { NovoVeiculoContext } from "../../contexts/NovoVeiculoContext";
import axios from "axios";
import ComponentLoader from "../ComponentLoader";

const VeiculosModelo = () => {
  const [modelos, setModelos] = useState([]);
  const [isLoading, setIsLoading] = useState();
  const { setVeiculo, tipoNumerico, marcaNumerica, setModeloNumerico } = useContext(NovoVeiculoContext);

  useEffect(() => {
    const getModelos = async () => {
      try {
        setIsLoading(true);
        const req = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/fipe/${tipoNumerico}/${marcaNumerica}`);

        const modelosFormatados = req.data.data.map((marca) => ({
          value: String(marca.Value),
          label: marca.Label,
        }));

        setModelos(modelosFormatados);
      } catch (error) {
        const msg = "Erro inesperado.";
        return msg;
        // toast.error(msg);
        // setErroDaApi(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (marcaNumerica) getModelos();
  }, [marcaNumerica]);

  const handleChange = (opcaoSelecionada) => {
    setVeiculo((prevState) => ({ ...prevState, modelo: opcaoSelecionada.label }));
    setModeloNumerico(opcaoSelecionada.value);
  };

  return (
    <div className="text-center font-sans p-3 w-max-full">
      <ComponentLoader isLoading={isLoading}>
        <Select
          options={modelos}
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

export default VeiculosModelo;
