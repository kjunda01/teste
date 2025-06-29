import React, { useContext, useState } from "react";
import { NovoVeiculoContext } from "../../contexts/NovoVeiculoContext";

import ConfirmModal from "../../components/ConfirmModal";
import VeiculosTipo from "../../components/veiculos/VeiculosTipo";
import VeiculosMarca from "../../components/veiculos/VeiculosMarca";
import VeiculosModelo from "../../components/veiculos/VeiculosModelo";
import VeiculosAno from "../../components/veiculos/VeiculosAno";
import VeiculosCor from "../../components/veiculos/VeiculosCor";
import PlacaAntiga from "../../components/veiculos/PlacaAntiga";
import PlacaMercosul from "../../components/veiculos/PlacaMercosul";
import AsyncSelect from "react-select/async";
import { toast } from "react-toastify";
import { apiBackend } from "../../services/apiBackend";

const PaginaNovoVeiculo = () => {
  const { veiculo, setVeiculo } = useContext(NovoVeiculoContext);
  const [placaIsOk, setPlacaIsOk] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleChangeVeiculo = (e) => {
    const { name, value } = e.target;
    setVeiculo((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlacaCorreta = (e) => {
    const placa = e.target.value.toUpperCase();
    const padraoMercosul = /^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$/;
    const padraoAntiga = /^[A-Z]{3}-?[0-9]{4}$/;

    if (padraoAntiga.test(placa)) {
      setVeiculo((prev) => ({ ...prev, tipoPlaca: "Antiga", placa }));
      setPlacaIsOk(true);
    } else if (padraoMercosul.test(placa)) {
      setVeiculo((prev) => ({ ...prev, tipoPlaca: "Mercosul", placa }));
      setPlacaIsOk(true);
    } else {
      setVeiculo((prev) => ({ ...prev, tipoPlaca: "Inválida", placa }));
      setPlacaIsOk(false);
    }
  };

  const formatMessage = (message) =>
    message.split("\n").map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));

  const veiculoMessage = `
Tipo: ${veiculo.tipo || "Não informado"}
Marca: ${veiculo.marca || "Não informado"}
Modelo: ${veiculo.modelo || "Não informado"}
Ano: ${veiculo.ano || "Não informado"}
Placa: ${veiculo.placa || "Não informado"}
Cor: ${veiculo.cor || "Não informado"}
Status: ${veiculo.status || "Não informado"}
Matrícula do Proprietário: ${veiculo.proprietario_matricula || "Não informado"}
Cidade: ${veiculo.cidade || "Não informado"}
Estado: ${veiculo.estado || "Não informado"}
`;

  const handleConfirm = async () => {
    try {
      const payload = {
        tipo: veiculo.tipo,
        marca: veiculo.marca,
        modelo: veiculo.modelo,
        ano: veiculo.ano,
        cor: veiculo.cor,
        placa: veiculo.placa,
        status: veiculo.status,
        proprietario_matricula: veiculo.proprietario_matricula,
        cidade: veiculo.cidade,
        estado: veiculo.estado,
      };

      await apiBackend.addVeiculo(payload);

      toast.success("Veículo cadastrado com sucesso!");
      setShowConfirmModal(false);

      // Opcional: resetar formulário
      setVeiculo({
        tipo: "",
        marca: "",
        modelo: "",
        ano: "",
        cor: "",
        placa: "",
        status: "",
        proprietario_matricula: "",
        cidade: "",
        estado: "",
      });
    } catch (error) {
      console.error("Erro ao cadastrar veículo:", error);
      toast.error("Erro ao cadastrar veículo.");
    }
  };

  const buscarCidades = async (inputValue) => {
    if (inputValue.length < 2) return [];
    try {
      const { data } = await apiBackend.getCidadesPorTermo(inputValue);
      return data; // já está no formato [{ label, value }]
    } catch (err) {
      console.error("Erro ao buscar cidades:", err);
      toast.error("Erro ao buscar cidades");
      return [];
    }
  };

  return (
    <>
      <h1 className="text-center text-2xl sm:text-3xl font-bold text-gray-800 mb-6 mt-4">
        Adicione um veículo através das opções abaixo:
      </h1>

      <form className="flex flex-col max-w-5xl mx-auto w-full px-4 sm:px-6 space-y-6">
        <fieldset className={`border rounded-xl p-3 shadow-sm bg-white ${veiculo.tipo ? "border-green-800" : "border-gray-900"}`}>
          <legend className="text-lg font-semibold px-3 py-1 bg-gray-100 border rounded-md">Tipo</legend>
          <VeiculosTipo />
        </fieldset>

        <div className="flex flex-col sm:flex-row gap-4">
          <fieldset
            className={`flex-1 border rounded-xl p-3 bg-white shadow-sm ${
              veiculo.marca ? "border-green-800" : "border-gray-900"
            }`}
          >
            <legend className="text-lg font-semibold px-3 py-1 bg-gray-100 border rounded-md">Marca</legend>
            <VeiculosMarca />
          </fieldset>

          <fieldset
            className={`flex-1 border rounded-xl p-3 bg-white shadow-sm ${
              veiculo.modelo ? "border-green-800" : "border-gray-900"
            }`}
          >
            <legend className="text-lg font-semibold px-3 py-1 bg-gray-100 border rounded-md">Modelo</legend>
            <VeiculosModelo />
          </fieldset>

          <fieldset
            className={`flex-1 border rounded-xl p-3 bg-white shadow-sm ${veiculo.ano ? "border-green-800" : "border-gray-900"}`}
          >
            <legend className="text-lg font-semibold px-3 py-1 bg-gray-100 border rounded-md">Ano</legend>
            <VeiculosAno />
          </fieldset>

          <fieldset
            className={`flex-1 border rounded-xl p-3 bg-white shadow-sm ${veiculo.cor ? "border-green-800" : "border-gray-900"}`}
          >
            <legend className="text-lg font-semibold px-3 py-1 bg-gray-100 border rounded-md">Cor</legend>
            <VeiculosCor />
          </fieldset>
        </div>

        <fieldset className="w-full border rounded-xl p-4 shadow-sm bg-white">
          <legend className="text-lg font-semibold px-3 py-1 bg-gray-100 border rounded-md">Placa</legend>
          <input
            type="text"
            name="placa"
            id="placa"
            placeholder="Informe uma placa"
            className={`text-center border rounded-sm h-10 p-3 font-bold w-full ${placaIsOk ? "text-green-700" : "text-red-600"}`}
            value={veiculo.placa}
            onChange={(e) => {
              handleChangeVeiculo(e);
              handlePlacaCorreta(e);
            }}
          />
          <div className="mt-4 flex justify-center">
            {veiculo.tipoPlaca === "Mercosul" && <PlacaMercosul />}
            {veiculo.tipoPlaca === "Antiga" && <PlacaAntiga />}
          </div>
        </fieldset>

        {veiculo.tipoPlaca === "Antiga" && (
          <div className="flex flex-col gap-4">
            <p className="text-sm text-gray-600">Cidade (opcional, apenas para visual):</p>
            <AsyncSelect
              cacheOptions
              loadOptions={buscarCidades}
              defaultOptions
              placeholder="Digite o nome da cidade..."
              onChange={(selected) => {
                if (selected) {
                  setVeiculo((prev) => ({
                    ...prev,
                    cidade: selected.value.nome,
                    estado: selected.value.estado,
                  }));
                }
              }}
              className="text-sm"
            />
          </div>
        )}

        <fieldset className="w-full border rounded-xl p-4 shadow-sm bg-white">
          <legend className="text-lg font-semibold px-3 py-1 bg-gray-100 border rounded-md">Proprietário</legend>
          <AsyncSelect
            cacheOptions
            defaultOptions
            loadOptions={async (inputValue) => {
              if (!inputValue || inputValue.length < 2) return [];
              try {
                const { data } = await apiBackend.getProprietariosPorTermo(inputValue);
                return data;
              } catch (err) {
                toast.error("Erro ao buscar proprietários");
                return [];
              }
            }}
            placeholder="Digite o nome ou matrícula do proprietário..."
            onChange={(selected) => {
              if (selected) {
                setVeiculo((prev) => ({
                  ...prev,
                  proprietario_matricula: selected.value.matricula,
                }));
              }
            }}
            value={
              veiculo.proprietario_matricula
                ? {
                    label: `${veiculo.proprietario_matricula}`,
                    value: { matricula: veiculo.proprietario_matricula },
                  }
                : null
            }
          />
        </fieldset>

        <fieldset className="w-full border rounded-xl p-4 shadow-sm bg-white">
          <legend className="text-lg font-semibold px-3 py-1 bg-gray-100 border rounded-md">Status</legend>
          <select
            name="status"
            value={veiculo.status || ""}
            onChange={handleChangeVeiculo}
            className="w-full h-10 px-4 rounded border"
          >
            <option value="">Selecione o status</option>
            <option value="ATIVO">ATIVO</option>
            <option value="PROIBIDO">PROIBIDO</option>
            <option value="INDEFINIDO">INDEFINIDO</option>
          </select>
        </fieldset>

        <div className="flex justify-center mb-6">
          <button
            type="button"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 w-full sm:w-1/3 rounded-md transition-colors"
            onClick={() => setShowConfirmModal(true)}
            disabled={!placaIsOk}
          >
            Salvar Veículo
          </button>
        </div>

        <ConfirmModal
          isOpen={showConfirmModal}
          title="Confirme os dados"
          message={<>{formatMessage(veiculoMessage)}</>}
          onConfirm={handleConfirm}
          onCancel={() => setShowConfirmModal(false)}
        />
      </form>
    </>
  );
};

export default PaginaNovoVeiculo;
