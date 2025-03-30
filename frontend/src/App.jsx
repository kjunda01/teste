import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './index.css';

function App() {
  const [data, setData] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    axios.get('/api/data')
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = () => {
    axios.post('/api/data', { name: input })
      .then(res => setData([...data, res.data[0]]))
      .catch(err => console.error(err));
    setInput('');
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
      <ul className="mt-4">
        {data.map((item, index) => (
          <li key={index} className="border-b py-2">{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;