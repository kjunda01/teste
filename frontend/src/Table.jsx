import React from "react";

const Table = ({ pessoas }) => {
  return (
    <table className="border border-gray-300 border-collapse w-full" style={{ fontFamily: "'Courier New', monospace" }}>
      <thead>
        <tr className="bg-sky-950 text-white">
          <th className="border border-gray-300 px-4 py-2">ID</th>
          <th className="border border-gray-300 px-4 py-2">CREATED AT</th>
          <th className="border border-gray-300 px-4 py-2">NAME</th>
        </tr>
      </thead>
      <tbody>
        {pessoas.map((pessoa) => (
          <tr key={pessoa.id} className="border border-gray-900 border-dotted px-4 py-2 text-center">
            <td className="border border-gray-300 border-dotted px-4 py-2">{pessoa.id}</td>
            <td className="border border-gray-300 border-dotted px-4 py-2">{pessoa.created_at}</td>
            <td className="border border-gray-300 border-dotted px-4 py-2">{pessoa.nome}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
