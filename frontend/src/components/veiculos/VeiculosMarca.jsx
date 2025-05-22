import { useContext, useEffect, useState } from "react";
import Select from "react-select";
import { NovoVeiculoContext } from "../../contexts/NovoVeiculoContext";
import axios from "axios";
import ComponentLoader from "../ComponentLoader";

const VeiculosMarca = () => {
  const [marcas, setMarcas] = useState([]);
  const [isLoading, setIsLoading] = useState();
  const { setVeiculo, tipoNumerico, setMarcaNumerica } = useContext(NovoVeiculoContext);

  useEffect(() => {
    const getMarcas = async () => {
      if (tipoNumerico) {
        try {
          setIsLoading(true);
          const req = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/fipe/${tipoNumerico}`);

          const marcasFormatadas = req.data.data.map((marca) => ({
            value: String(marca.Value),
            label: marca.Label,
          }));
          setMarcas(marcasFormatadas);
        } catch (error) {
          const msg = "Erro inesperado.";
          return msg;
          // toast.error(msg);
          // setErroDaApi(error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    if (tipoNumerico) getMarcas();
  }, [tipoNumerico]);

  const handleChange = (opcaoSelecionada) => {
    setVeiculo((prevState) => ({ ...prevState, marca: opcaoSelecionada.label }));
    setMarcaNumerica(opcaoSelecionada.value);
  };

  return (
    <div className="text-center font-sans p-3">
      <ComponentLoader isLoading={isLoading}>
        <Select
          options={marcas}
          onChange={handleChange}
          name="marcas"
          classNamePrefix="react-select"
          placeholder="Selecione uma marca..."
        />
      </ComponentLoader>
    </div>
  );
};

export default VeiculosMarca;
