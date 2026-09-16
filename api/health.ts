import { allowJson, type VercelRequest, type VercelResponse } from './_types';

export default function handler(_req: VercelRequest, res: VercelResponse) {
  allowJson(res);
  return res.status(200).json({ status: 'ok', source: 'vercel-function' });
}
