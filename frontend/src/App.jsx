import { useEffect, useState } from "react";
import Table from "./Table";

function App() {
  const [pessoas, setPessoas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    setIsLoading(true);
    fetch(`${backendUrl}/pessoas`)
      .then((res) => res.json())
      .then((data) => {
        setPessoas(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="p-5 relative">
      <h1 className="text-5xl font-bold text-center mb-5">Dados do Supabase</h1>
      <h2 className="text-2xl text-center">Tabela Pessoas</h2>

      <Table pessoas={pessoas} />

      {/* Modal de Carregamento */}
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
            <p className="mt-3 text-lg font-medium text-gray-700">Carregando...</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
