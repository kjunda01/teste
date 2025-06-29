import { useState } from "react";
import { toast } from "react-toastify";
import { apiBackend } from "../../services/apiBackend.js";
import { useNavigate } from "react-router-dom";

const CadastrarProprietario = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ matricula: "", nome: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.matricula.trim() || !form.nome.trim()) {
      toast.warning("Preencha todos os campos obrigatórios.");
      return;
    }

    try {
      setLoading(true);
      await apiBackend.addProprietario(form);
      toast.success("Proprietário cadastrado com sucesso!");
      navigate("/proprietarios/consultar"); // ou a rota da lista
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.mensagem || "Erro ao cadastrar proprietário."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Cadastrar Novo Proprietário</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="matricula" className="block font-medium mb-1">
            Matrícula <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            name="matricula"
            id="matricula"
            value={form.matricula}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label htmlFor="nome" className="block font-medium mb-1">
            Nome <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            name="nome"
            id="nome"
            value={form.nome}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={() => navigate("/proprietarios")}
            className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
          >
            Voltar
          </button>

          <button
            type="submit"
            disabled={loading}
            className={`${
              loading ? "opacity-50 cursor-not-allowed" : ""
            } bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700`}
          >
            {loading ? "Salvando..." : "Cadastrar"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CadastrarProprietario;
