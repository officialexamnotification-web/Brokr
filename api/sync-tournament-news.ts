import { syncTournamentNews } from '../server/tournament-sync.js';

export default async function handler(req: any, res: any) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const expected = process.env.TOURNAMENT_SYNC_SECRET || '';
  const supplied = String(req.headers?.authorization || '').replace(/^Bearer\s+/i, '');
  if (!expected || supplied !== expected) return res.status(401).json({ error: 'Unauthorized' });
  const result = await syncTournamentNews();
  return res.status(result.enabled ? 200 : 503).json(result);
}
