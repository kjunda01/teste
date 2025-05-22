import { useContext, useEffect, useState } from "react";
import { NovoVeiculoContext } from "../../contexts/NovoVeiculoContext";
import PlacaMercosul from "./PlacaMercosul";
import PlacaAntiga from "./PlacaAntiga";

const VeiculosModeloPlaca = () => {
  const { veiculo, setVeiculo } = useContext(NovoVeiculoContext);

  useEffect(() => {
    const isPlacaMercosul = (placa) => {
      const teste = /^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$/.test(placa);
      if (teste) setVeiculo((prev) => ({ ...prev, tipoPlaca: "Mercosul" }));
    };

    const isPlacaAntiga = (placa) => {
      const teste = /^[A-Z]{3}-?[0-9]{4}$/.test(placa);
      if (teste) setVeiculo((prev) => ({ ...prev, tipoPlaca: "Antiga" }));
    };

    isPlacaMercosul(veiculo.placa);
    isPlacaAntiga(veiculo.placa);
  }, [veiculo]);

  return <div className="">{veiculo.tipoPlaca === "Mercosul" ? <PlacaMercosul /> : <PlacaAntiga />}</div>;
};

export default VeiculosModeloPlaca;
