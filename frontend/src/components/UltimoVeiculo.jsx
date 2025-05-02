import React, { useEffect, useState } from "react";
import axios from "axios";

import ComponentLoader from "./ComponentLoader";

const UltimoVeiculo = () => {
  const [veiculos, setVeiculos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getUltimoVeiculo = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("https://6727abed270bd0b9755344ee.mockapi.io/api/veiculos");
        setVeiculos(response.data);
      } catch (error) {
        console.error("Erro ao buscar veículos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getUltimoVeiculo();
  }, []);

  return (
    <ComponentLoader isLoading={isLoading}>
      {isLoading ? (
        <div className="flex justify-center items-center w-full h-full"></div>
      ) : (
        // Exibe os veículos
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
          {veiculos.slice(0, 4).map((veiculo) => (
            <ComponentLoader isLoading={isLoading}>
            <div key={veiculo.id} className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <p className="text-sm text-gray-600">Placa</p>
                <p className="text-2xl font-bold tracking-wide">
                  <span className={veiculo.status === "Permitido" ? "text-green-600" : "text-red-600"}>{veiculo.placa}</span>
                </p>
              </div>

              <p className="text-sm text-gray-600">Modelo</p>
              <p className="text-xl font-semibold text-gray-800">{veiculo.modelo}</p>
            </div>
          </ComponentLoader>
          ))}
        </div>
      )}
    </ComponentLoader>
  );
};

export default UltimoVeiculo;
