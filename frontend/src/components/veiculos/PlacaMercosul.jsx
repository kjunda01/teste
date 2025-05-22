import React, { useContext, useState } from "react";
import ComponentLoader from "../ComponentLoader";
import QRCodePlaca from "./QRCodePlaca";
import { NovoVeiculoContext } from "../../contexts/NovoVeiculoContext";

const PlacaMercosul = () => {
  const { veiculo } = useContext(NovoVeiculoContext);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="flex flex-col border-4 border-black rounded-xl w-[300px] bg-white">
      {/* Faixa azul */}
      <div className="flex bg-blue-800 h-8 justify-around items-center rounded-t-sm p-3">
        {/* Logo Mercosul */}
        <div className="flex-shrink-0">
          <ComponentLoader isLoading={isLoading}>
            <img src="/images/Padrao-MERCOSUL 2019_PNG_CMYK.png" alt="Logo Mercosul" className="h-5" />
          </ComponentLoader>
        </div>

        {/* Texto BRASIL */}
        <div className="text-white font-bold text-sm select-none">BRASIL</div>

        {/* Bandeira do Brasil */}
        <div className="flex-shrink-0">
          <ComponentLoader isLoading={isLoading}>
            <img src="/images/Flag_of_Brazil.svg" alt="Bandeira do Brasil" className="h-5 border border-white rounded-sm" />
          </ComponentLoader>
        </div>
      </div>

      {/* Conteúdo principal da placa */}
      <div className="relative flex justify-center items-center py-6 px-4">
        {/* QR Code e BR no canto esquerdo */}
        <div className="absolute left-2 top-1 flex flex-col items-center text-xs font-bold select-none">
          <div className="mb-2">
            <ComponentLoader isLoading={isLoading}>
              {veiculo.placa ? <QRCodePlaca placa={veiculo.placa} /> : null}
            </ComponentLoader>
          </div>
          <div className="text-black absolute top-13 text-xl">BR</div>
        </div>

        {/* Texto da placa maior */}
        <div className="text-4xl text-center tracking-widest font-bold" style={{ fontFamily: "FE Engschrift, monospace" }}>
          {veiculo.placa}
        </div>
      </div>
    </div>
  );
};

export default PlacaMercosul;
