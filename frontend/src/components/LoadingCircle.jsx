const LoadingCircle = ({ message = "Carregando..." }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent backdrop-blur-2xl backdrop-saturate-150 transition-all duration-500 ease-in-out animate-fade">
      <div className="relative flex flex-col items-center justify-center w-52 h-52">
        {/* Círculo com borda e ponteiro */}
        <div className="absolute w-full h-full rounded-full border-4 border-blue-950"></div>

        {/* Ponteiro girando */}
        <div className="absolute w-full h-full flex items-center justify-center animate-spin">
          <div className="w-2 h-2 bg-blue-950 rounded-full translate-x-[6.5rem]"></div>
        </div>

        {/* Conteúdo central (imagem + texto) */}
        <div className="flex flex-col items-center space-y-2 z-10">
          <span className="text-blue-950 text-lg font-semibold">{message}</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingCircle;
