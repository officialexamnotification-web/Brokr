import { filterTournamentEvents } from '../src/lib/tournament-feed.js';

export default function handler(req: any, res: any) {
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=900');
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  const items = filterTournamentEvents({ gameId: typeof req.query?.game === 'string' ? req.query.game : undefined, status: typeof req.query?.status === 'string' ? req.query.status : undefined, query: typeof req.query?.q === 'string' ? req.query.q : undefined });
  return res.status(200).json({ items, updatedAt: new Date().toISOString() });
}
