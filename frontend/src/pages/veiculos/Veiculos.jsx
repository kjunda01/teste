import { FaPlus, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Veiculos = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex items-center justify-center px-4 py-8">
      <div className="flex flex-col text-center max-w-3xl w-full">
        <h2 className="text-2xl font-bold mb-8">Gerenciamento de Veículos</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {/* Botão Adicionar Veículo */}
          <button
            onClick={() => {
              navigate("/veiculos/cadastrar");
            }}
            className="w-49 sm:w-39 sm:h-39 h-39 flex flex-col items-center justify-center bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition cursor-pointer"
          >
            <div className="flex items-center justify-center w-16 h-16 bg-white text-green-600 rounded-md m-3">
              <FaPlus size={24} />
            </div>
            <span className="text-lg ">Adicionar</span>
          </button>

          {/* Botão Consultar Veículos */}
          <button
            onClick={() => {
              navigate("/veiculos/consultar");
            }}
            className="w-49 sm:w-39 sm:h-39 h-39 flex flex-col items-center justify-center bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-800 transition cursor-pointer"
          >
            <div className="flex items-center justify-center w-16 h-16 bg-white text-blue-600 rounded-md m-3">
              <FaSearch size={24} />
            </div>
            <span className="text-lg font-semibold">Consultar</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Veiculos;
