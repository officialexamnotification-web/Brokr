import { countCharacters, getRuleForGame } from '../server/name-engine';

function asString(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback;
}

export default function handler(req: any, res: any) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const body = req.body || {};
  const rule = getRuleForGame(asString(body.gameId, 'bgmi'));
  const text = asString(body.text).slice(0, 80);
  const characters = countCharacters(text);
  return res.status(200).json({
    game: rule,
    text,
    characters,
    fitsLimit: rule.limit === null || characters <= rule.limit,
    compatibility: rule.sourceStatus === 'needs-testing' ? 'unknown' : 'test-recommended',
  });
}
