import { getServerTime } from '../services/timeService.js';

export async function showServerTime(req, res) {
  try {
    const serverTime = await getServerTime();
    res.json({
      status: 'OK',
      server_time: serverTime,
    });
  } catch (error) {
    console.error('Erro ao buscar hora do servidor:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}
