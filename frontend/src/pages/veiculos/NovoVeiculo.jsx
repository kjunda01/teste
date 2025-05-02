import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import APIFIPE from "../../services/apiFIPE";
import MOCKAPI from "../../services/apiMOCKAPI";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PaginaNovoVeiculo = () => {
  const [veiculo, setVeiculo] = useState({
    tipo: "",
    marca: "",
    modelo: "",
    ano: "",
    placa: "",
    cor: "",
    proprietario: "",
    matricula: "",
    status: "",
  });
  const [marcas, setMarcas] = useState([]);
  const [modelos, setModelos] = useState([]);
  const [anos, setAnos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [veiculoJSON, setVeiculoJSON] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVeiculo((prev) => ({ ...prev, [name]: value }));
  };

  const fetchDadosDinamicos = async (tipo) => {
    setLoading(true);
    setError(null);
    try {
      const marcasData = await APIFIPE.getMarcas(tipo);
      setMarcas(marcasData);
      setModelos([]);
      setAnos([]);
      if (veiculo.marca) {
        const modelosData = await APIFIPE.getModelos(tipo, veiculo.marca);
        const anosData = await APIFIPE.getAnos(tipo, veiculo.marca, veiculo.modelo);
        setModelos(modelosData);
        setAnos(anosData);
      }
    } catch (err) {
      setError(`Erro ao carregar os dados: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (veiculo.tipo) {
      fetchDadosDinamicos(veiculo.tipo);
    }
  }, [veiculo.tipo, veiculo.marca, veiculo.modelo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const campos = ["tipo", "marca", "modelo", "ano", "placa", "cor", "proprietario", "matricula", "status"];
    const camposPreenchidos = campos.every((campo) => veiculoJSON[campo]);
    if (camposPreenchidos) {
      try {
        let resultado = [];
        try {
          resultado = await MOCKAPI.getVeiculoPorPlaca(veiculoJSON.placa);
        } catch (err) {
          if (err.response?.status !== 404) {
            console.error("Erro inesperado ao buscar placa:", err);
            toast.error(`Erro ao buscar placa: ${err.message}`);
            setLoading(false);
            return;
          }
        }
        if (resultado.length > 0) {
          toast.error("Placa já cadastrada no sistema.");
          setLoading(false);
          return;
        }
        await MOCKAPI.postVeiculo(veiculoJSON);
        toast.success(`Veículo \"${veiculoJSON.placa}\" adicionado com sucesso.`);
        navigate("/buscarveiculo");
      } catch (err) {
        console.error("Erro ao enviar os dados:", err);
        toast.error(`Erro ao enviar os dados: ${err.message}`);
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("Por favor, preencha todos os campos.");
      setLoading(false);
    }
  };

  const atualizarVeiculo = (chave, event) => {
    const textoSelecionado = event.target.options[event.target.selectedIndex].text;
    setVeiculoJSON((prev) => ({ ...prev, [chave]: textoSelecionado }));
  };

  return (
    <>
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-6">Adicionar Novo Veículo</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
        {/* Tipo */}
        <div>
          <label className="block font-medium mb-1">Tipo</label>
          <select
            name="tipo"
            value={veiculo.tipo}
            onChange={(e) => {
              handleChange(e);
              atualizarVeiculo("tipo", e);
            }}
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="">Selecione o tipo...</option>
            <option value="1">Carro</option>
            <option value="2">Moto</option>
            <option value="3">Caminhão</option>
          </select>
        </div>
        {/* Marca */}
        <div>
          <label className="block font-medium mb-1">Marca</label>
          <select
            name="marca"
            value={veiculo.marca}
            onChange={(e) => {
              handleChange(e);
              atualizarVeiculo("marca", e);
            }}
            className="w-full border border-gray-300 rounded px-3 py-2"
            disabled={!marcas.length || loading}
          >
            <option value="">Selecione a marca...</option>
            {loading ? (
              <option>Carregando...</option>
            ) : (
              marcas.map((m) => (
                <option key={m.Value} value={m.Value}>
                  {m.Label}
                </option>
              ))
            )}
          </select>
        </div>
        {/* Modelo */}
        <div>
          <label className="block font-medium mb-1">Modelo</label>
          <select
            name="modelo"
            value={veiculo.modelo}
            onChange={(e) => {
              handleChange(e);
              atualizarVeiculo("modelo", e);
            }}
            className="w-full border border-gray-300 rounded px-3 py-2"
            disabled={!modelos.length || loading}
          >
            <option value="">Selecione o modelo...</option>
            {loading ? (
              <option>Carregando...</option>
            ) : (
              modelos.map((m) => (
                <option key={m.Value} value={m.Value}>
                  {m.Label}
                </option>
              ))
            )}
          </select>
        </div>
        {/* Ano */}
        <div>
          <label className="block font-medium mb-1">Ano</label>
          <select
            name="ano"
            value={veiculo.ano}
            onChange={(e) => {
              handleChange(e);
              atualizarVeiculo("ano", e);
            }}
            className="w-full border border-gray-300 rounded px-3 py-2"
            disabled={!anos.length || loading}
          >
            <option value="">Selecione o ano...</option>
            {loading ? (
              <option>Carregando...</option>
            ) : (
              anos.map((a) => (
                <option key={a.Value} value={a.Value}>
                  {a.Label}
                </option>
              ))
            )}
          </select>
        </div>
        {/* Placa */}
        <div>
          <label className="block font-medium mb-1">Placa</label>
          <input
            type="text"
            name="placa"
            value={veiculo.placa}
            onChange={(e) => {
              handleChange(e);
              setVeiculoJSON((v) => ({ ...v, placa: e.target.value }));
            }}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        {/* Cor */}
        <div>
          <label className="block font-medium mb-1">Cor</label>
          <input
            type="text"
            name="cor"
            value={veiculo.cor}
            onChange={(e) => {
              handleChange(e);
              setVeiculoJSON((v) => ({ ...v, cor: e.target.value }));
            }}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        {/* Proprietário */}
        <div>
          <label className="block font-medium mb-1">Proprietário</label>
          <input
            type="text"
            name="proprietario"
            value={veiculo.proprietario}
            onChange={(e) => {
              handleChange(e);
              setVeiculoJSON((v) => ({ ...v, proprietario: e.target.value }));
            }}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        {/* Matrícula */}
        <div>
          <label className="block font-medium mb-1">Matrícula</label>
          <input
            type="text"
            name="matricula"
            value={veiculo.matricula}
            onChange={(e) => {
              handleChange(e);
              setVeiculoJSON((v) => ({ ...v, matricula: e.target.value }));
            }}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        {/* Status */}
        <div>
          <label className="block font-medium mb-1">Status</label>
          <input
            type="text"
            name="status"
            value={veiculo.status}
            onChange={(e) => {
              handleChange(e);
              setVeiculoJSON((v) => ({ ...v, status: e.target.value }));
            }}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded w-full">
          Salvar Veículo
        </button>
      </form>
    </>
  );
};

export default PaginaNovoVeiculo;
