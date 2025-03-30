require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(cors());
app.use(express.json());

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

app.get('/dados', async (req, res) => {
    const { data, error } = await supabase.from('tabela_exemplo').select('*');
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
});

app.listen(process.env.PORT, () => console.log(`Servidor rodando na porta ${process.env.PORT}`));
