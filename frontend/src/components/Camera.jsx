import React, { useState } from "react";
import ComponentLoader from "./ComponentLoader";

const Camera = ({ src, label }) => {
  const [isLoading, setIsLoading] = useState(true); // começa como true

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto">
      {label && <h2 className="text-center font-semibold text-xl mb-4">{label}</h2>}

      <ComponentLoader isLoading={isLoading} className="w-full aspect-[16/9]">
        <iframe
          className="w-full h-full rounded-lg"
          src={src}
          title={label || "Câmera"}
          onLoad={() => setIsLoading(false)} // carregou? tira o loader
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </ComponentLoader>
    </div>
  );
};

export default Camera;
