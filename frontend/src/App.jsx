import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './index.css';

function App() {
  const [data, setData] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    axios.get('/api/data')
      .then(res => {
        console.log('Resposta da API:', res.data); // Adicione isso para debug
        setData(Array.isArray(res.data) ? res.data : []);
      })
      .catch(err => {
        console.error('Erro na requisição:', err);
        setData([]); // Em caso de erro, mantém como array vazio
      });
  }, []);

  const handleSubmit = () => {
    axios.post('/api/data', { name: input })
      .then(res => {
        console.log('Resposta do POST:', res.data); // Debug
        setData(prevData => [...prevData, res.data[0]]); // Usa prevData para evitar sobrescrever
        setInput('');
      })
      .catch(err => console.error('Erro no POST:', err));
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Minha App</h1>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <button onClick={handleSubmit} className="bg-blue-500 text-white p-2 rounded">
        Enviar
      </button>
      {Array.isArray(data) && data.length > 0 ? (
        <ul className="mt-4">
          {data.map((item, index) => (
            <li key={index} className="border-b py-2">
              {item.name || 'Sem nome'}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4">Nenhum dado disponível</p>
      )}
    </div>
  );
}

export default App;