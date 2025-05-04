import Wrapper from "./Wrapper";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { useMenu } from "../contexts/MenuContext";

const MainLayout = () => {
  const { menuOpen } = useMenu();

  return (
    <Wrapper>
      <Header />
      <main className={`flex-1 overflow-auto transition-all duration-500 ${menuOpen ? "pl-64" : "pl-0"}`}>
        <Outlet />
      </main>
      <Footer />
    </Wrapper>
  );
};

export default MainLayout;
