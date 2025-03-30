import { useEffect, useState } from "react";
import axios from "axios";

function DataList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/dados`)
      .then((response) => setData(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Dados do Supabase</h1>
      <ul className="mt-4">
        {data.map((item, index) => (
          <li key={index} className="p-2 border-b">{JSON.stringify(item)}</li>
        ))}
      </ul>
    </div>
  );
}

export default DataList;