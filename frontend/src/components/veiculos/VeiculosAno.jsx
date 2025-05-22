import { useContext, useEffect, useState } from "react";
import Select from "react-select";
import { NovoVeiculoContext } from "../../contexts/NovoVeiculoContext";
import axios from "axios";
import ComponentLoader from "../ComponentLoader";

const VeiculosAno = () => {
  const [anos, setAnos] = useState([]);
  const [isLoading, setIsLoading] = useState();
  const { setVeiculo, tipoNumerico, marcaNumerica, modeloNumerico } = useContext(NovoVeiculoContext);

  useEffect(() => {
    const getAnos = async () => {
      try {
        setIsLoading(true);
        const req = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/fipe/${tipoNumerico}/${marcaNumerica}/${modeloNumerico}`
        );

        const anosFormatados = req.data.data.map((marca) => ({
          value: String(marca.Value),
          label: marca.Label,
        }));

        setAnos(anosFormatados);
      } catch (error) {
        const msg = "Erro inesperado.";
        return msg;
        // toast.error(msg);
        // setErroDaApi(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (modeloNumerico) getAnos();
  }, [modeloNumerico]);

  const handleChange = (opcaoSelecionada) => {
    setVeiculo((prevState) => ({ ...prevState, ano: opcaoSelecionada.label }));
  };

  return (
    <div className="text-center font-sans p-3">
      {/* <h2 className={`text-xl md:text-2xl font-semibold mb-2 ${veiculo.modelo ? "text-green-800" : "text-black"}`}>
        Selecione um ano:
      </h2> */}
      <ComponentLoader isLoading={isLoading}>
        <Select options={anos} onChange={handleChange} placeholder="Selecione um ano..." />
      </ComponentLoader>
    </div>
  );
};

export default VeiculosAno;
