import { GameProfile } from '../types';

export type BackendCompatibility = 'likely' | 'test-recommended' | 'unknown' | 'avoid';

export interface BackendName {
  id: string;
  name: string;
  base: string;
  meaning: string;
  vibe: string;
  language: string;
  decoration: string;
  characters: number;
  fitsLimit: boolean;
  compatibility: BackendCompatibility;
}

export interface GenerateNamesResponse {
  source: 'engine' | string;
  meta: {
    gameId: string;
    gameName: string;
    limit: number | null;
    symbolStatus: 'partial' | 'unknown' | 'avoid';
    sourceStatus: 'official' | 'mixed' | 'needs-testing';
    safeMode: boolean;
    note: string;
  };
  names: BackendName[];
}

function gameIdForBackend(game: GameProfile): string {
  return game.id;
}

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...init,
  });
  if (!response.ok) throw new Error(`Generator API returned ${response.status}`);
  return response.json() as Promise<T>;
}

export function generateBackendNames(options: {
  keyword: string;
  game: GameProfile;
  language: string;
  style: string;
  decorationId: string;
  conservative: boolean;
  count?: number;
}) {
  return request<GenerateNamesResponse>('/api/generate-names', {
    method: 'POST',
    body: JSON.stringify({
      keyword: options.keyword,
      gameId: gameIdForBackend(options.game),
      language: options.language,
      style: options.style,
      decorationId: options.decorationId,
      conservative: options.conservative,
      count: options.count || 12,
    }),
  });
}

export async function checkBackendName(game: GameProfile, text: string) {
  return request<{
    game: { limit: number | null; note: string; sourceStatus: string };
    text: string;
    characters: number;
    fitsLimit: boolean;
    compatibility: BackendCompatibility;
  }>('/api/check-name', {
    method: 'POST',
    body: JSON.stringify({ gameId: gameIdForBackend(game), text }),
  });
}
