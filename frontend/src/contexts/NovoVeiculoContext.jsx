import React, { createContext, useContext, useState } from "react";

export const NovoVeiculoContext = createContext();

export const NovoVeiculoProvider = ({ children }) => {
  const [tipoNumerico, setTipoNumerico] = useState();
  const [marcaNumerica, setMarcaNumerica] = useState();
  const [modeloNumerico, setModeloNumerico] = useState();
  const [veiculo, setVeiculo] = useState({
    tipo: "",
    marca: "",
    modelo: "",
    ano: "",
    placa: "",
    cor: "",
    status: "",
    proprietarioId: "",
    tipoPlaca: "",
    proprietario_matricula: "",
    estado: null,
  });

  const [cores, setCores] = useState([
    { value: 1, label: "Amarela" },
    { value: 2, label: "Azul" },
    { value: 3, label: "Bege" },
    { value: 4, label: "Branca" },
    { value: 5, label: "Cinza" },
    { value: 6, label: "Dourada" },
    { value: 7, label: "Grená" },
    { value: 8, label: "Laranja" },
    { value: 9, label: "Marrom" },
    { value: 10, label: "Prata" },
    { value: 11, label: "Preta" },
    { value: 12, label: "Rosa" },
    { value: 13, label: "Roxa" },
    { value: 14, label: "Verde" },
    { value: 15, label: "Vermelha" },
    { value: 16, label: "Fantasia" },
  ]);

  const tipoPlacas = [
    { value: "antiga", label: "Antiga" },
    { value: "mercosul", label: "Mercosul" },
  ];

  return (
    <NovoVeiculoContext.Provider
      value={{
        veiculo,
        setVeiculo,
        tipoNumerico,
        setTipoNumerico,
        marcaNumerica,
        setMarcaNumerica,
        modeloNumerico,
        setModeloNumerico,
        cores,
        setCores,
        tipoPlacas,
      }}
    >
      {children}
    </NovoVeiculoContext.Provider>
  );
};

export const useNovoVeiculo = () => {
  const context = useContext(NovoVeiculoContext);
  if (!context) {
    throw new Error("useNovoVeiculo deve ser usado dentro de um provider.");
  }
  return context;
};
