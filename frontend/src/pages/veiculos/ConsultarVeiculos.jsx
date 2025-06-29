import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaSearch, FaTrashAlt, FaEdit } from "react-icons/fa";
import { MdRefresh } from "react-icons/md";
import { apiBackend } from "../../services/apiBackend";
import ConfirmModal from "../../components/ConfirmModal";
import EditarVeiculoModal from "./EditarVeiculoModal";

const ConsultarVeiculos = () => {
  const [termoBusca, setTermoBusca] = useState("");
  const [veiculos, setVeiculos] = useState([]);
  const [loading, setLoading] = useState(false);

  const [modalExcluirAberto, setModalExcluirAberto] = useState(false);
  const [placaParaExcluir, setPlacaParaExcluir] = useState(null);

  const [modalEditarAberto, setModalEditarAberto] = useState(false);
  const [veiculoSelecionado, setVeiculoSelecionado] = useState(null);

  const buscarVeiculos = async () => {
    try {
      setLoading(true);
      const { data } = termoBusca.trim() ? await apiBackend.getVeiculosPorTermo(termoBusca) : await apiBackend.getVeiculos();

      const normalizados = Array.isArray(data) ? data.map((item) => (item.value ? item.value : item)) : [];

      setVeiculos(normalizados);
    } catch (err) {
      toast.error("Erro ao buscar veículos");
      setVeiculos([]);
    } finally {
      setLoading(false);
    }
  };

  const confirmarExclusao = (placa) => {
    setPlacaParaExcluir(placa);
    setModalExcluirAberto(true);
  };

  const executarExclusao = async () => {
    try {
      await apiBackend.deleteVeiculo(placaParaExcluir);
      toast.success("Veículo removido com sucesso");
      buscarVeiculos();
    } catch (err) {
      toast.error("Erro ao remover veículo");
    } finally {
      setModalExcluirAberto(false);
      setPlacaParaExcluir(null);
    }
  };

  const abrirModalEditar = (veiculo) => {
    setVeiculoSelecionado(veiculo);
    setModalEditarAberto(true);
  };

  const salvarEdicao = async (dadosAtualizados) => {
    try {
      await apiBackend.updateVeiculo(dadosAtualizados);
      toast.success("Veículo atualizado com sucesso");
      buscarVeiculos();
    } catch (err) {
      toast.error("Erro ao atualizar veículo");
    } finally {
      setModalEditarAberto(false);
      setVeiculoSelecionado(null);
    }
  };

  useEffect(() => {
    buscarVeiculos();
  }, []);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Consulta de Veículos</h1>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={termoBusca}
          onChange={(e) => setTermoBusca(e.target.value)}
          placeholder="Buscar por placa, modelo, status..."
          className="border border-gray-300 rounded px-3 py-1 w-full"
        />
        <button
          onClick={buscarVeiculos}
          disabled={termoBusca.trim() && termoBusca.trim().length < 3}
          className={`px-3 py-1 rounded flex items-center gap-1 ${
            termoBusca.trim() && termoBusca.trim().length < 3
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          <FaSearch />
          Buscar
        </button>
        <button
          onClick={() => {
            setTermoBusca("");
            buscarVeiculos();
          }}
          className="bg-gray-300 text-black px-3 py-1 rounded hover:bg-gray-400 flex items-center gap-1"
        >
          <MdRefresh />
        </button>
      </div>

      {loading ? (
        <p>Carregando...</p>
      ) : veiculos.length > 0 ? (
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left p-2 border-b">Placa</th>
              <th className="text-left p-2 border-b">Modelo</th>
              <th className="text-left p-2 border-b">Cor</th>
              <th className="text-left p-2 border-b">Status</th>
              <th className="text-center p-2 border-b">Ações</th>
            </tr>
          </thead>
          <tbody>
            {veiculos.map((v) => (
              <tr key={v.placa} className="hover:bg-gray-50">
                <td className="p-2 border-b">{v.placa}</td>
                <td className="p-2 border-b">{v.modelo}</td>
                <td className="p-2 border-b">{v.cor}</td>
                <td className="p-2 border-b">{v.status}</td>
                <td className="p-2 border-b text-center">
                  <div className="flex justify-center gap-3">
                    <button onClick={() => abrirModalEditar(v)} className="text-blue-600 hover:text-blue-800" title="Editar">
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => confirmarExclusao(v.placa)}
                      className="text-red-600 hover:text-red-800"
                      title="Excluir"
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500">Nenhum veículo encontrado.</p>
      )}

      <ConfirmModal
        isOpen={modalExcluirAberto}
        title="Excluir veículo"
        message="Deseja realmente remover este veículo? Essa ação não poderá ser desfeita."
        onConfirm={executarExclusao}
        onCancel={() => setModalExcluirAberto(false)}
      />

      <EditarVeiculoModal
        isOpen={modalEditarAberto}
        title="Editar Veículo"
        veiculo={veiculoSelecionado}
        onSave={salvarEdicao}
        onCancel={() => {
          setModalEditarAberto(false);
          setVeiculoSelecionado(null);
        }}
      />
    </div>
  );
};

export default ConsultarVeiculos;
