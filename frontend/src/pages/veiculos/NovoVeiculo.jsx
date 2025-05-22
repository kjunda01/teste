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
import Select from "react-select";
import { estadosBrasileiros } from "../../utils/EstadosBrasileiros";

const PaginaNovoVeiculo = () => {
  const { veiculo, setVeiculo } = useContext(NovoVeiculoContext);
  const [placaIsOk, setPlacaIsOk] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowLogoutModal(false);
  };

  const handleChangeVeiculo = (e) => {
    const { name, value } = e.target;
    setVeiculo((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlacaCorreta = (e) => {
    const { name, value } = e.target;
    const placa = value.toUpperCase();

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

  const formatMessage = (message) => {
    return message.split("\n").map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  };

  const veiculoMessage = `
Tipo: ${veiculo.tipo || "Não informado"}
Marca: ${veiculo.marca || "Não informado"}
Modelo: ${veiculo.modelo || "Não informado"}
Ano: ${veiculo.ano || "Não informado"}
Placa: ${veiculo.placa || "Não informado"}
Cor: ${veiculo.cor || "Não informado"}
Status: ${veiculo.status || "Não informado"}
Tipo de Placa: ${veiculo.tipoPlaca || "Não informado"}
Matrícula do Proprietário: ${veiculo.proprietario_matricula || "Não informado"}
`;

  return (
    <>
      <h1 className="text-center text-2xl sm:text-3xl font-bold text-gray-800 mb-6 mt-4">
        Adicione um veículo através das opções abaixo:
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col max-w-5xl mx-auto w-full px-4 sm:px-6 space-y-6">
        {/* Tipo */}
        <fieldset
          className={`w-full border rounded-xl p-3 shadow-sm bg-white ${veiculo.tipo ? "border-green-800" : "border-gray-900"}`}
        >
          <legend
            className={`text-lg font-semibold px-3 py-1 bg-gray-100 border rounded-md ${
              veiculo.tipo ? "border-green-800 text-green-800" : "border-gray-900"
            }`}
          >
            Tipo
          </legend>
          <VeiculosTipo />
        </fieldset>

        {/* Marca, Modelo, Ano, Cor - mesma linha */}
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Marca */}
          <fieldset
            className={`flex-1 border rounded-xl p-3 shadow-sm bg-white ${
              veiculo.marca ? "border-green-800" : "border-gray-900"
            }`}
          >
            <legend
              className={`text-lg font-semibold px-3 py-1 bg-gray-100 border rounded-md ${
                veiculo.marca ? "border-green-800 text-green-800" : "border-gray-900"
              }`}
            >
              Marca
            </legend>
            <VeiculosMarca />
          </fieldset>

          {/* Modelo */}
          <fieldset
            className={`flex-1 border rounded-xl p-3 shadow-sm bg-white ${
              veiculo.modelo ? "border-green-800" : "border-gray-900"
            }`}
          >
            <legend
              className={`text-lg font-semibold px-3 py-1 bg-gray-100 border rounded-md ${
                veiculo.modelo ? "border-green-800 text-green-800" : "border-gray-900"
              }`}
            >
              Modelo
            </legend>
            <VeiculosModelo />
          </fieldset>

          {/* Ano */}
          <fieldset
            className={`flex-1 border rounded-xl p-3 shadow-sm bg-white ${veiculo.ano ? "border-green-800" : "border-gray-900"}`}
          >
            <legend
              className={`text-lg font-semibold px-3 py-1 bg-gray-100 border rounded-md ${
                veiculo.ano ? "border-green-800 text-green-800" : "border-gray-900"
              }`}
            >
              Ano
            </legend>
            <VeiculosAno />
          </fieldset>

          {/* Cor */}
          <fieldset
            className={`flex-1 border rounded-xl p-3 shadow-sm bg-white ${veiculo.cor ? "border-green-800" : "border-gray-900"}`}
          >
            <legend
              className={`text-lg font-semibold px-3 py-1 bg-gray-100 border rounded-md ${
                veiculo.cor ? "border-green-800 text-green-800" : "border-gray-900"
              }`}
            >
              Cor
            </legend>
            <VeiculosCor />
          </fieldset>
        </div>

        {/* Placa */}
        <fieldset
          className={`w-full h-full border rounded-xl p-4 shadow-sm bg-white ${
            veiculo.cor ? "border-green-800" : "border-gray-900"
          }`}
        >
          <legend
            className={`text-lg font-semibold px-3 py-1 bg-gray-100 border rounded-md ${
              veiculo.tipoPlaca ? "border-green-800 text-green-800" : "border-gray-900"
            }`}
          >
            Placa
          </legend>

          <div className="flex-row sm:flex">
            {/* Lado esquerdo - Formulário */}
            <div className="flex flex-col items-center justify-center w-full">
              <input
                type="text"
                name="placa"
                id="placa"
                placeholder="Informe uma placa"
                className={`text-center border border-sm rounded-sm h-10 p-3 font-bold ${
                  placaIsOk ? "text-green-700" : "text-red-600"
                }`}
                value={veiculo.placa}
                onChange={(e) => {
                  handleChangeVeiculo(e);
                  handlePlacaCorreta(e);
                }}
              />

              {veiculo.tipoPlaca === "Antiga" && (
                <div className="flex flex-col gap-4 mt-4 w-full">
                  <div>
                    <p>Estado:</p>
                    <Select
                      options={estadosBrasileiros}
                      onChange={(opcao) => {
                        setVeiculo((prev) => ({ ...prev, estado: opcao.value }));
                      }}
                      name="estado"
                      className="w-full"
                      classNamePrefix="react-select"
                      placeholder="Selecione um estado..."
                    />
                  </div>

                  <div>
                    <p>Cidade:</p>
                    <input
                      type="text"
                      name="cidade"
                      id="cidade"
                      placeholder="Informe uma cidade..."
                      className={`text-center border border-sm rounded-sm h-10 p-3 font-bold w-full ${
                        placaIsOk ? "text-green-700" : "text-red-600"
                      }`}
                      value={veiculo.cidade}
                      onChange={handleChangeVeiculo}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Lado direito - Imagem da placa */}
            <div className="flex items-center justify-center w-full mt-4">
              {veiculo.tipoPlaca === "Mercosul" && <PlacaMercosul />}
              {veiculo.tipoPlaca === "Antiga" && <PlacaAntiga />}
            </div>
          </div>
        </fieldset>

        {/* Botão de enviar */}
        <div className="flex justify-center items-center mb-6">
          <button
            type="button"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 w-full sm:w-1/3 rounded-md transition-colors"
            onClick={() => {
              setShowLogoutModal(true);
            }}
          >
            Salvar Veículo
          </button>

          <ConfirmModal
            isOpen={showLogoutModal}
            title="Confirme os dados"
            message={<>Realizar cadastro? {formatMessage(veiculoMessage)}</>}
            onConfirm={null}
            onCancel={() => setShowLogoutModal(false)}
          />
        </div>
      </form>
    </>
  );
};

export default PaginaNovoVeiculo;
