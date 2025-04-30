import { useEffect, useState } from "react";

const HoraAtual = () => {
  const [horaAtual, setHoraAtual] = useState("");

  const atualizarHora = () => {
    const agora = new Date();
    const dia = String(agora.getDate()).padStart(2, "0");
    const mes = String(agora.getMonth() + 1).padStart(2, "0");
    const ano = agora.getFullYear();
    const hora = String(agora.getHours()).padStart(2, "0");
    const minuto = String(agora.getMinutes()).padStart(2, "0");

    setHoraAtual(`${dia}/${mes}/${ano} - ${hora}:${minuto}`);
  };

  useEffect(() => {
    atualizarHora(); // inicializa imediatamente
    const intervalo = setInterval(atualizarHora, 60000); // atualiza a cada 60s

    return () => clearInterval(intervalo); // limpa intervalo ao desmontar
  }, []);

  return <div className="flex flex-row items-center justify-center text-center align-middle">{horaAtual}</div>;
};

export default HoraAtual;
