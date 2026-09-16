import { countCharacters, getRuleForGame } from '../server/name-engine';
import { allowJson, asString, type VercelRequest, type VercelResponse } from './_types';

export default function handler(req: VercelRequest, res: VercelResponse) {
  allowJson(res);
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
