const LoadingCircle = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-12 h-12 border-4 border-blue-950 border-t-transparent rounded-full animate-spin"></div>
        <span className="text-blue-950 text-sm font-medium">Carregando...</span>
      </div>
    </div>
  );
};

export default LoadingCircle;
