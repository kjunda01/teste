import { useEffect, useState } from "react";

function App() {
  const [dados, setDados] = useState([]);

  useEffect(() => {
    fetch("https://backend-meu-projeto.vercel.app/dados")
      .then((res) => res.json())
      .then((data) => setDados(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold">Dados do Supabase</h1>
      <ul>
        {dados.map((item, index) => (
          <li key={index} className="border p-2 my-2">
            {JSON.stringify(item)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
