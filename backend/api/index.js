const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

module.exports = async (req, res) => {
  if (req.method === "GET") {
    const { data, error } = await supabase.from("users").select("*");
    if (error) return res.status(500).json({ error: error.message });
    return res.json(data);
  }
  res.status(405).json({ error: "Método não permitido" });
};
