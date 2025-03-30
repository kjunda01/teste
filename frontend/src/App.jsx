import { useEffect, useState } from "react";

function App() {
  const [pessoas, setDados] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/pessoas`)
      .then((res) => res.json())
      .then((data) => setDados(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold">Dados do Supabase</h1>
      <ul>
        {pessoas.map((pessoa, index) => (
          <li key={pessoa.id} className="border p-2 my-2">
            {pessoa.id} {pessoa.created_at} {pessoa.nome}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
