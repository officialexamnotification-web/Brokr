export interface VercelRequest {
  method?: string;
  body?: Record<string, unknown>;
}

export interface VercelResponse {
  status(code: number): VercelResponse;
  json(value: unknown): VercelResponse;
  send(value: unknown): VercelResponse;
  setHeader(name: string, value: string): VercelResponse;
}

export function asString(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback;
}

export function asCount(value: unknown, fallback = 12): number {
  const count = Number(value);
  return Number.isFinite(count) ? Math.min(Math.max(Math.round(count), 4), 24) : fallback;
}

export function allowJson(response: VercelResponse) {
  response.setHeader('Cache-Control', 'no-store');
  response.setHeader('Content-Type', 'application/json');
}
