import { useState, useEffect } from "react";

const EditarProprietarioModal = ({ isOpen, title, proprietario, onSave, onCancel }) => {
  const [form, setForm] = useState({ matricula: "", nome: "" });

  useEffect(() => {
    if (proprietario) {
      setForm({ ...proprietario });
    }
  }, [proprietario]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Matrícula</label>
          <input
            type="text"
            name="matricula"
            value={form.matricula}
            disabled
            className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Nome</label>
          <input
            type="text"
            name="nome"
            value={form.nome}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div className="flex justify-end gap-3">
          <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700" onClick={() => onSave(form)}>
            Salvar
          </button>
          <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700" onClick={onCancel}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditarProprietarioModal;
