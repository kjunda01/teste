import React, { useState } from "react";
import LoadingCircle from "./LoadingCircle";

const Camera = ({ src }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="w-full aspect-video relative">
      {!isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-60 z-10">
          <LoadingCircle />
        </div>
      )}

      <iframe
        className="w-full h-full rounded-lg"
        src={src}
        title="YouTube video player"
        onLoad={() => setIsLoading(true)}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default Camera;
