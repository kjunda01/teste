import { FaCarCrash, FaCamera, FaAddressCard, FaSortNumericDownAlt, FaSearch } from "react-icons/fa";

export const menuItems = [
  { label: "Home", path: "/home", icon: <FaCarCrash /> },
  { label: "Ao Vivo", path: "/aovivo", icon: <FaCamera /> },
  { label: "Contato", path: "/contato", icon: <FaAddressCard /> },
  { label: "Estatísticas", path: "/estatisticas", icon: <FaSortNumericDownAlt /> },
  { label: "Teste", path: "/teste", icon: "xD " },
  {
    label: "Veículos",
    path: "/veiculos",
    icon: <FaCarCrash />,
    children: [
      { label: "Consultar", path: "/veiculos/consultar", icon: <FaSearch /> },
      { label: "Cadastrar", path: "/veiculos/cadastrar", icon: <FaSearch /> },
    ],
  },
  {
    label: "Proprietários",
    path: "/proprietarios",
    icon: <FaCarCrash />,
    children: [
      { label: "Consultar", path: "/proprietarios/consultar", icon: <FaSearch /> },
      { label: "Cadastrar", path: "/proprietarios/cadastrar", icon: <FaSearch /> },
    ],
  },
];
