import { FaHome, FaBong, FaCameraRetro, FaPeopleArrows, FaSearch, FaCertificate, FaCar } from "react-icons/fa";

export const menuItems = [
  { label: "Página Inicial", path: "/home", icon: <FaHome /> },
  { label: "Teste", path: "/teste", icon: <FaBong /> },
  { label: "Ao Vivo", path: "/aovivo", icon: <FaCameraRetro /> },

  {
    label: "Proprietários",
    path: "/proprietarios",
    icon: <FaPeopleArrows />,
    children: [
      { label: "Consultar Proprietários", path: "/proprietarios/consultar", icon: <FaSearch /> },
      { label: "Novo Proprietário", path: "/proprietarios/cadastrar", icon: <FaCertificate /> },
    ],
  },

  {
    label: "Veículos",
    path: "/veiculos",
    icon: <FaCar />,
    children: [
      { label: "Consultar Veículos", path: "/veiculos/consultar", icon: <FaSearch /> },
      { label: "Novo Veículo", path: "/veiculos/cadastrar", icon: <FaCertificate /> },
    ],
  },
];
