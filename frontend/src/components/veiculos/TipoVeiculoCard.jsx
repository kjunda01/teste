const TipoVeiculoCard = ({ tipo, tipoNumericoAtual, setVeiculo, setTipoNumerico, Icone, descricao }) => {
  const isSelecionado = tipoNumericoAtual === tipo.valor;

const handleClick = () => {
  setVeiculo((prev) => ({
    ...prev,
    tipo: String(tipo.valor), // agora vai POSTar /fipe/1, /fipe/2 etc.
    marca: "",
    modelo: "",
    ano: "",
  }));
  setTipoNumerico(tipo.valor);
};


  return (
    <div
      onClick={handleClick}
      className={`flex flex-col items-center justify-center w-36 h-36 sm:w-40 sm:h-40 
        rounded-xl cursor-pointer transition-transform duration-200 ease-in-out 
        shadow-md hover:shadow-lg hover:scale-105 
        border-2 ${isSelecionado ? "border-green-700 text-green-800 bg-green-50" : "border-transparent hover:border-gray-300"}`}
    >
      <Icone className="text-4xl sm:text-5xl mb-2" />
      <div className="text-center text-sm sm:text-base font-medium px-2 text-gray-800">{descricao}</div>
    </div>
  );
};

export default TipoVeiculoCard;
