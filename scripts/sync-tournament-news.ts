import fs from 'node:fs';
import path from 'node:path';
import { syncTournamentNews } from '../server/tournament-sync';

const target = path.resolve(process.cwd(), 'src/data/generated-tournament-news.ts');
const result = await syncTournamentNews();

if (!result.enabled) {
  console.error(`[tournament-sync] ${result.reason}`);
  process.exitCode = 1;
} else {
  const output = `import type { TournamentNews } from './tournament-data';\n\n// Generated from allowlisted official tournament sources. Do not edit manually.\nexport const GENERATED_TOURNAMENT_NEWS: TournamentNews[] = ${JSON.stringify(result.drafts, null, 2)};\n`;
  fs.writeFileSync(target, output, 'utf8');
  console.log(`[tournament-sync] wrote ${result.drafts.length} source-grounded updates using ${result.model}`);
}
