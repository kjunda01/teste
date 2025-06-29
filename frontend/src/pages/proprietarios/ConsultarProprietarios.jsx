import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaSearch, FaTrashAlt, FaEdit } from "react-icons/fa";
import { MdRefresh } from "react-icons/md";
import { apiBackend } from "../../services/apiBackend";

import EditarProprietarioModal from "./EditarProprietarioModal";
import ConfirmModal from "../../components/ConfirmModal.jsx";
import LoadingCircle from "../../components/LoadingCircle.jsx";

const ConsultarProprietarios = () => {
  const [termoBusca, setTermoBusca] = useState("");
  const [proprietarios, setProprietarios] = useState([]);
  const [loading, setLoading] = useState(false);

  const [modalExcluirAberto, setModalExcluirAberto] = useState(false);
  const [matriculaParaExcluir, setMatriculaParaExcluir] = useState(null);

  const [modalEditarAberto, setModalEditarAberto] = useState(false);
  const [proprietarioSelecionado, setProprietarioSelecionado] = useState(null);

  const buscarProprietarios = async () => {
    try {
      setLoading(true);
      const { data } = termoBusca.trim()
        ? await apiBackend.getProprietariosPorTermo(termoBusca)
        : await apiBackend.getProprietarios();

      if (Array.isArray(data)) {
        const normalizados = data.map((item) => (item.value ? item.value : item));
        setProprietarios(normalizados);
      } else {
        toast.error("Dados inválidos recebidos da API.");
        setProprietarios([]);
      }
    } catch (err) {
      toast.error("Erro ao buscar proprietários");
    } finally {
      setLoading(false);
    }
  };

  const confirmarExclusao = (matricula) => {
    setMatriculaParaExcluir(matricula);
    setModalExcluirAberto(true);
  };

  const executarExclusao = async () => {
    try {
      await apiBackend.deleteProprietario(matriculaParaExcluir);
      toast.success("Proprietário removido com sucesso");
      buscarProprietarios();
    } catch (err) {
      toast.error("Erro ao remover proprietário");
    } finally {
      setModalExcluirAberto(false);
      setMatriculaParaExcluir(null);
    }
  };

  const abrirModalEditar = (proprietario) => {
    setProprietarioSelecionado(proprietario);
    setModalEditarAberto(true);
  };

  const salvarEdicao = async (dadosAtualizados) => {
    try {
      await apiBackend.updateProprietario(dadosAtualizados);
      toast.success("Proprietário atualizado com sucesso");
      buscarProprietarios();
    } catch (err) {
      toast.error("Erro ao atualizar proprietário");
    } finally {
      setModalEditarAberto(false);
      setProprietarioSelecionado(null);
    }
  };

  useEffect(() => {
    buscarProprietarios();
  }, []);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Consulta de Proprietários</h1>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={termoBusca}
          onChange={(e) => setTermoBusca(e.target.value)}
          placeholder="Buscar por nome ou matrícula..."
          className="border border-gray-300 rounded px-3 py-1 w-full"
        />
        <button
          onClick={buscarProprietarios}
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
            buscarProprietarios();
          }}
          className="bg-gray-300 text-black px-3 py-1 rounded hover:bg-gray-400 flex items-center gap-1"
        >
          <MdRefresh />
        </button>
      </div>

      {loading ? (
        <LoadingCircle />
      ) : Array.isArray(proprietarios) && proprietarios.length > 0 ? (
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left p-2 border-b">Matrícula</th>
              <th className="text-left p-2 border-b">Nome</th>
              <th className="text-center p-2 border-b">Ações</th>
            </tr>
          </thead>
          <tbody>
            {proprietarios.map((p) => (
              <tr key={p.matricula} className="hover:bg-gray-50">
                <td className="p-2 border-b">{p.matricula}</td>
                <td className="p-2 border-b">{p.nome}</td>
                <td className="p-2 border-b text-center">
                  <div className="flex justify-center gap-3">
                    <button onClick={() => abrirModalEditar(p)} className="text-blue-600 hover:text-blue-800" title="Editar">
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => confirmarExclusao(p.matricula)}
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
        <p className="text-gray-500">Nenhum proprietário encontrado.</p>
      )}

      {/* Modal de exclusão */}
      <ConfirmModal
        isOpen={modalExcluirAberto}
        title="Excluir proprietário"
        message="Tem certeza que deseja remover este proprietário? Essa ação não poderá ser desfeita."
        onConfirm={executarExclusao}
        onCancel={() => setModalExcluirAberto(false)}
      />

      {/* Modal de edição */}
      <EditarProprietarioModal
        isOpen={modalEditarAberto}
        title="Editar Proprietário"
        proprietario={proprietarioSelecionado}
        onSave={salvarEdicao}
        onCancel={() => {
          setModalEditarAberto(false);
          setProprietarioSelecionado(null);
        }}
      />
    </div>
  );
};

export default ConsultarProprietarios;
