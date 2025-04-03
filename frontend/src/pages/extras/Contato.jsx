import React from "react";
import { Link } from "react-router-dom";

const Contato = () => {
  return (
    <div className="bg-gray-200 h-screen w-screen p-8">
      <h1 className="font-bold text-5xl ">CONTATO</h1>
      <p>
        <Link to="/login" href="#" className="text-sky-500 hover:text-blue-950">
          Home
        </Link>
      </p>
    </div>
  );
};

export default Contato;
