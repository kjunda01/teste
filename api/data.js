const express = require('express');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
app.use(express.json());

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

app.get('/', async (req, res) => {
  const { data, error } = await supabase.from('sua_tabela').select('*');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data || []);
});

app.post('/', async (req, res) => {
  const { body } = req;
  const { data, error } = await supabase.from('sua_tabela').insert([body]);
  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data);
});

module.exports = app;