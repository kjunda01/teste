import React, { useState } from "react";
import LoadingCircle from "./LoadingCircle";

const Camera = ({ src, label }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto">
      {label && <h2 className="text-center font-semibold text-xl mb-4">{label}</h2>}

      <div className="w-full aspect-[16/9] relative">
        {!isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-60 z-10">
            <LoadingCircle />
          </div>
        )}

        <iframe
          className="w-full h-full rounded-lg"
          src={src}
          title={label || "Câmera"}
          onLoad={() => setIsLoading(true)}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default Camera;
