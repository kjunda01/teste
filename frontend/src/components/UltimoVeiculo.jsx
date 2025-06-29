import React, { useEffect, useState } from "react";
import ComponentLoader from "./ComponentLoader";
import { apiBackend } from "../services/apiBackend.js";

const UltimoVeiculo = () => {
  const [veiculos, setVeiculos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getUltimoVeiculo = async () => {
      try {
        setIsLoading(true);
        const response = await apiBackend.getUltimosVeiculos();
        setVeiculos(response.data);
      } catch (error) {
        console.error("Erro ao buscar veículos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getUltimoVeiculo();
  }, []);

  const renderPlacaMercosul = (placa, modelo, status) => {
    const isAtivo = status === "Ativo";
    const corFundo = isAtivo ? "bg-green-100 border-green-500" : "bg-red-100 border-red-500";
    const corBarra = isAtivo ? "bg-green-700" : "bg-red-700";

    return (
      <div
        className={` border-4 ${corFundo} rounded-lg overflow-hidden shadow-md flex flex-col h-28 sm:h-32`}
        style={{ fontFamily: "FE Engschrift" }}
      >
        {/* Faixa azul com nome do modelo e bandeira */}
        <div className="bg-blue-700 text-white text-xs sm:text-sm font-bold flex items-center justify-between px-2 py-1 relative">
          <div className="overflow-hidden whitespace-nowrap overflow-ellipsis pr-2 ">{modelo}</div>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/05/Flag_of_Brazil.svg"
            alt="Bandeira do Brasil"
            className="h-4 sm:h-5"
          />
        </div>

        {/* Placa */}
        <div
          className={`text-black text-3xl sm:text-5xl  text-center flex-grow flex items-center justify-center ${corBarra}`}
          style={{ fontFamily: "FE Engschrift" }}
        >
          {placa}
        </div>
      </div>
    );
  };

  return (
    <ComponentLoader isLoading={isLoading}>
      <div className="grid grid-rows-3 gap-2">
        {/* Primeira linha com item maior */}
        <div className="row-span-1">
          {veiculos[0] && renderPlacaMercosul(veiculos[0].placa, veiculos[0].modelo, veiculos[0].status)}
        </div>

        {/* Segunda linha com 2 colunas */}
        <div className="grid grid-cols-2 gap-2">
          {veiculos.slice(1, 3).map((veiculo) => (
            <div key={veiculo.id}>{renderPlacaMercosul(veiculo.placa, veiculo.modelo, veiculo.status)}</div>
          ))}
        </div>

        {/* Terceira linha com 2 colunas */}
        <div className="grid grid-cols-2 gap-2">
          {veiculos.slice(3, 5).map((veiculo) => (
            <div key={veiculo.id}>{renderPlacaMercosul(veiculo.placa, veiculo.modelo, veiculo.status)}</div>
          ))}
        </div>
      </div>
    </ComponentLoader>
  );
};

export default UltimoVeiculo;
