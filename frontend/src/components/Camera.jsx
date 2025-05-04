import { useState } from "react";
import ComponentLoader from "./ComponentLoader";

const Camera = ({ src, label }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="flex flex-col items-center w-full h-[25%]">
      {label && <h2 className="text-center font-semibold text-md mb-2">{label}</h2>}
      <ComponentLoader isLoading={isLoading} className="w-full h-full">
        <iframe
          className="w-full h-full rounded-lg"
          src={src}
          title={label || "Câmera"}
          onLoad={() => setIsLoading(false)}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </ComponentLoader>
    </div>
  );
};

export default Camera;
