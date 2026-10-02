import { getPublicMetadata } from '../server/name-engine.js';

export default function handler(_req: any, res: any) {
  res.setHeader('Cache-Control', 'no-store');
  return res.status(200).json(getPublicMetadata());
}
