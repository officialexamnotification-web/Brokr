import { generateNames, getRuleForGame, type LanguageId, type NameStyle } from '../server/name-engine';

function asString(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback;
}

function asCount(value: unknown, fallback = 12): number {
  const count = Number(value);
  return Number.isFinite(count) ? Math.min(Math.max(Math.round(count), 4), 24) : fallback;
}

export default function handler(req: any, res: any) {
  res.setHeader('Cache-Control', 'no-store');
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
