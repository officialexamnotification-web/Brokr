import fs from 'node:fs';
import path from 'node:path';
import dotenv from 'dotenv';
import { syncTournamentNews } from '../server/tournament-sync';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
dotenv.config();

const target = path.resolve(process.cwd(), 'src/data/tournament-data.ts');
const result = await syncTournamentNews();

if (!result.enabled) {
  console.error(`[tournament-sync] ${result.reason}`);
  process.exitCode = 1;
} else {
  const source = fs.readFileSync(target, 'utf8');
  const start = '// BEGIN GENERATED TOURNAMENT NEWS';
  const end = '// END GENERATED TOURNAMENT NEWS';
  const startIndex = source.indexOf(start);
  const endIndex = source.indexOf(end);
  if (startIndex < 0 || endIndex < startIndex) throw new Error('Generated news markers are missing from tournament-data.ts');
  const generated = `${start}\n// Generated from allowlisted official tournament sources. Do not edit manually.\nexport const GENERATED_TOURNAMENT_NEWS: TournamentNews[] = ${JSON.stringify(result.drafts, null, 2)};\n${end}`;
  const output = `${source.slice(0, startIndex)}${generated}${source.slice(endIndex + end.length)}`;
  fs.writeFileSync(target, output, 'utf8');
  console.log(`[tournament-sync] wrote ${result.drafts.length} source-grounded updates using ${result.model}`);
}
