import React, { useEffect, useState } from "react";
import axios from "axios";
import LoadingCircle from "./LoadingCircle";

const UltimoVeiculoCompleto = () => {
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
    <>
      {/* Carregamento */}
      {isLoading ? (
        <div className="flex justify-center items-center w-full h-full">
          <LoadingCircle />
        </div>
      ) : (
        // Exibe os veículos
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {veiculos.slice(0, 2).map((veiculo) => (
            <div key={veiculo.id} className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <p className="text-sm text-gray-600">Placa</p>
                <p className="text-2xl font-bold tracking-wide">
                  <span className={veiculo.status === "Permitido" ? "text-green-600" : "text-red-600"}>{veiculo.placa}</span>
                </p>
              </div>

              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <p className="text-sm text-gray-600">Modelo</p>
                <p className="text-xl font-semibold text-gray-800">{veiculo.modelo}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                <div>
                  <strong>Tipo:</strong> {veiculo.tipo}
                </div>
                <div>
                  <strong>Marca:</strong> {veiculo.marca}
                </div>
                <div>
                  <strong>Ano:</strong> {veiculo.ano}
                </div>
                <div>
                  <strong>Cor:</strong> {veiculo.cor}
                </div>
                <div>
                  <strong>Proprietário:</strong> {veiculo.proprietario}
                </div>
                <div>
                  <strong>Matrícula:</strong> {veiculo.matricula}
                </div>
                <div>
                  <strong>Status:</strong> {veiculo.status}
                </div>
                <div>
                  <strong>ID:</strong> {veiculo.id}
                </div>
              </div>

              <div className="text-xs text-gray-400 text-right mt-4">
                Criado em: {new Date(veiculo.createdAt).toLocaleString("pt-BR")}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default UltimoVeiculoCompleto;
