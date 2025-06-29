import { useState, useEffect } from "react";
import Select from "react-select";
import { apiBackend } from "../../services/apiBackend";
import ConfirmarResumoVeiculo from "./ConfirmarResumoVeiculo";

const tiposVeiculo = [
  { label: "Carro", value: "1" },
  { label: "Moto", value: "2" },
  { label: "Caminhão", value: "3" },
];

const EditarVeiculoModal = ({ isOpen, title, veiculo, onSave, onCancel }) => {
  const [form, setForm] = useState({});
  const [confirmando, setConfirmando] = useState(false);

  const [marcas, setMarcas] = useState([]);
  const [modelos, setModelos] = useState([]);
  const [anos, setAnos] = useState([]);

  useEffect(() => {
    if (veiculo) {
      setForm({ ...veiculo });
    }
  }, [veiculo]);

  useEffect(() => {
    const carregarMarcas = async () => {
      if (!form.tipo) return;
      const { data } = await apiBackend.getFipeMarcas(form.tipo);
      setMarcas(data.data.map((m) => ({ label: m.Label, value: m.Value })));
    };
    carregarMarcas();
  }, [form.tipo]);

  useEffect(() => {
    const carregarModelos = async () => {
      if (!form.tipo || !form.marca) return;
      const { data } = await apiBackend.getFipeModelos(form.tipo, form.marca);
      setModelos(data.data.map((m) => ({ label: m.Label, value: m.Value })));
    };
    carregarModelos();
  }, [form.marca]);

  useEffect(() => {
    const carregarAnos = async () => {
      if (!form.tipo || !form.marca || !form.modelo) return;
      const { data } = await apiBackend.getFipeAnos(form.tipo, form.marca, form.modelo);
      setAnos(data.data.map((a) => ({ label: a.Label, value: a.Value })));
    };
    carregarAnos();
  }, [form.modelo]);

  const handleSelect = (campo, opcao) => {
    setForm((prev) => ({
      ...prev,
      [campo]: opcao?.value || "",
      [`${campo}Nome`]: opcao?.label || "",
      ...(campo === "tipo" ? { marca: "", modelo: "", ano: "" } : {}),
      ...(campo === "marca" ? { modelo: "", ano: "" } : {}),
      ...(campo === "modelo" ? { ano: "" } : {}),
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xl max-h-[90%] overflow-auto">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>

        {!confirmando ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-sm font-medium">Placa</label>
                <input
                  type="text"
                  value={form.placa || ""}
                  disabled
                  className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Tipo</label>
                <Select
                  options={tiposVeiculo}
                  value={tiposVeiculo.find((t) => t.value === form.tipo) || null}
                  onChange={(opcao) => handleSelect("tipo", opcao)}
                  placeholder="Selecione o tipo"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Marca</label>
                <Select
                  options={marcas}
                  value={marcas.find((m) => m.value === form.marca) || null}
                  onChange={(opcao) => handleSelect("marca", opcao)}
                  placeholder="Selecione a marca"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Modelo</label>
                <Select
                  options={modelos}
                  value={modelos.find((m) => m.value === form.modelo) || null}
                  onChange={(opcao) => handleSelect("modelo", opcao)}
                  placeholder="Selecione o modelo"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Ano</label>
                <Select
                  options={anos}
                  value={anos.find((a) => a.value === form.ano) || null}
                  onChange={(opcao) => handleSelect("ano", opcao)}
                  placeholder="Selecione o ano"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Cor</label>
                <input
                  type="text"
                  name="cor"
                  value={form.cor || ""}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Status</label>
                <input
                  type="text"
                  name="status"
                  value={form.status || ""}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <button
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                onClick={() => setConfirmando(true)}
              >
                Avançar
              </button>
              <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700" onClick={onCancel}>
                Cancelar
              </button>
            </div>
          </>
        ) : (
          <>
            <h3 className="text-lg font-semibold mb-2">Confirmar alterações:</h3>
            <ConfirmarResumoVeiculo veiculo={form} />

            <div className="flex justify-end gap-3 mt-4">
              <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700" onClick={() => onSave(form)}>
                Confirmar
              </button>
              <button
                className="px-4 py-2 bg-gray-400 text-black rounded hover:bg-gray-500"
                onClick={() => setConfirmando(false)}
              >
                Voltar
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EditarVeiculoModal;
