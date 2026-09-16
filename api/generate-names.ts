import { generateNames, getRuleForGame, type LanguageId, type NameStyle } from '../server/name-engine';
import { allowJson, asCount, asString, type VercelRequest, type VercelResponse } from './_types';

export default function handler(req: VercelRequest, res: VercelResponse) {
  allowJson(res);
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const body = req.body || {};
  const gameId = asString(body.gameId, 'bgmi');
  const language = asString(body.language, 'global') as LanguageId;
  const style = asString(body.style, 'pro') as NameStyle;
  const rule = getRuleForGame(gameId);
  const conservative = Boolean(body.conservative);
  const names = generateNames({
    keyword: asString(body.keyword),
    gameId,
    language,
    style,
    decorationId: asString(body.decorationId, ''),
    count: asCount(body.count),
    conservative,
  });

  return res.status(200).json({
    source: 'engine',
    meta: {
      gameId,
      gameName: rule.name,
      limit: rule.limit,
      symbolStatus: rule.symbolStatus,
      sourceStatus: rule.sourceStatus,
      safeMode: conservative,
      note: rule.note,
    },
    names,
  });
}
