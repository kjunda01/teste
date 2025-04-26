import { useEffect } from "react";

const LoadingCircle = ({ onComplete }) => {
  return (
    onComplete && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-sky-500/5 backdrop-blur-sm transition-opacity duration-300 ease-in-out">
        <div className="flex flex-col items-center space-y-4 animate-fade-in">
          <div className="w-16 h-16 border-4 border-blue-950 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-blue-950 text-lg font-medium">Carregando...</span>
        </div>
      </div>
    )
  );
};

export default LoadingCircle;
