import Wrapper from "./Wrapper";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <Wrapper>
      <Outlet />
    </Wrapper>
  );
};

export default MainLayout;
