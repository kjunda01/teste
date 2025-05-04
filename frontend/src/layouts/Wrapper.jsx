import React, { useState } from "react";
import Header from "./Header";

const Wrapper = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      className={`min-h-screen max-h-screen min-w-screen max-w-screen flex flex-col bg-gray-100 transition-all duration-300 ${
        menuOpen ? "pl-64" : "pl-0"
      }`}
    >
      {/* Passa o estado do menu para o Header */}
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      {/* Conteúdo principal e footer */}
      <div className="flex-1 flex flex-col">
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child) && child.type !== Header) {
            return child;
          }
          return null;
        })}
      </div>

      {/* Overlay para mobile */}
      {menuOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden" onClick={() => setMenuOpen(false)} />}
    </div>
  );
};

export default Wrapper;
