import Footer from "../../layouts/Footer";
import Header from "../../layouts/Header";
import Wrapper from "../../layouts/Wrapper.jsx";

const Home = () => {
  return (
    <Wrapper>
      {/* Header */}
      <Header />

      {/* Conteúdo centralizado e responsivo */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="flex flex-col text-center max-w-3xl w-full">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-4">Projeto Unipark</h1>
          <h2 className="text-xl sm:text-3xl lg:text-4xl text-gray-700">Navegue com o menu ao lado</h2>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </Wrapper>
  );
};

export default Home;
