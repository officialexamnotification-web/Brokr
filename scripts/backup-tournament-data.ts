import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SOURCE_FILE = path.join(__dirname, '../src/data/tournament-data.ts');
const BACKUP_DIR = path.join(__dirname, '../backups');

// Create backups directory if it doesn't exist
if (!fs.existsSync(BACKUP_DIR)) {
  fs.mkdirSync(BACKUP_DIR, { recursive: true });
}

// Generate backup filename with timestamp
const now = new Date();
const timestamp = now.toISOString().replace(/[:.]/g, '-').slice(0, -5);
const backupFile = path.join(BACKUP_DIR, `tournament-data-${timestamp}.ts`);

// Copy the file
fs.copyFileSync(SOURCE_FILE, backupFile);

console.log(`✅ Backup created: ${backupFile}`);

// Keep only the last 10 backups
const files = fs.readdirSync(BACKUP_DIR)
  .filter(f => f.startsWith('tournament-data-') && f.endsWith('.ts'))
  .map(f => ({
    name: f,
    path: path.join(BACKUP_DIR, f),
    time: fs.statSync(path.join(BACKUP_DIR, f)).mtime.getTime()
  }))
  .sort((a, b) => b.time - a.time);

if (files.length > 10) {
  const toDelete = files.slice(10);
  toDelete.forEach(f => {
    fs.unlinkSync(f.path);
    console.log(`🗑️  Deleted old backup: ${f.name}`);
  });
}

console.log(`📊 Total backups: ${Math.min(files.length, 10)}`);
