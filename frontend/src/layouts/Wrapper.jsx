import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";

const Wrapper = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Cabeçalho */}
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      {/* Conteúdo */}
      <main className="flex-1 w-full flex flex-col overflow-y-auto min-h-0 transition-all duration-500">{children}</main>

      {/* Rodapé */}
      <Footer />
      {menuOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden" onClick={() => setMenuOpen(false)} />}
    </div>
  );
};

export default Wrapper;
