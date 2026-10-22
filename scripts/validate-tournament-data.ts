import { TOURNAMENT_EVENTS, OFFICIAL_TOURNAMENT_SOURCES } from '../src/data/tournament-data.js';

interface ValidationError {
  eventId: string;
  field: string;
  message: string;
}

const errors: ValidationError[] = [];

function validateEvent(event: any, index: number): void {
  const eventId = event.id || `event-${index}`;
  
  if (!event.id) errors.push({ eventId, field: 'id', message: 'Missing required field: id' });
  if (!event.slug) errors.push({ eventId, field: 'slug', message: 'Missing required field: slug' });
  if (!event.gameId) errors.push({ eventId, field: 'gameId', message: 'Missing required field: gameId' });
  if (!event.gameName) errors.push({ eventId, field: 'gameName', message: 'Missing required field: gameName' });
  if (!event.name) errors.push({ eventId, field: 'name', message: 'Missing required field: name' });
  if (!event.organizer) errors.push({ eventId, field: 'organizer', message: 'Missing required field: organizer' });
  if (!event.dateLabel) errors.push({ eventId, field: 'dateLabel', message: 'Missing required field: dateLabel' });
  if (!event.region) errors.push({ eventId, field: 'region', message: 'Missing required field: region' });
  if (!event.location) errors.push({ eventId, field: 'location', message: 'Missing required field: location' });
  if (!event.status) errors.push({ eventId, field: 'status', message: 'Missing required field: status' });
  if (!event.sourceUrl) errors.push({ eventId, field: 'sourceUrl', message: 'Missing required field: sourceUrl' });
  if (!event.sourceName) errors.push({ eventId, field: 'sourceName', message: 'Missing required field: sourceName' });
  if (!event.summary) errors.push({ eventId, field: 'summary', message: 'Missing required field: summary' });
  if (!event.updatedAt) errors.push({ eventId, field: 'updatedAt', message: 'Missing required field: updatedAt' });
  
  // Validate URL format
  if (event.sourceUrl && !event.sourceUrl.startsWith('http')) {
    errors.push({ eventId, field: 'sourceUrl', message: 'Invalid URL format' });
  }
  
  // Validate date format
  if (event.startDate && !/^\d{4}-\d{2}-\d{2}$/.test(event.startDate)) {
    errors.push({ eventId, field: 'startDate', message: 'Invalid date format (expected YYYY-MM-DD)' });
  }
  if (event.endDate && !/^\d{4}-\d{2}-\d{2}$/.test(event.endDate)) {
    errors.push({ eventId, field: 'endDate', message: 'Invalid date format (expected YYYY-MM-DD)' });
  }
  
  // Validate status enum
  const validStatuses = ['upcoming', 'live', 'completed', 'cancelled', 'draft'];
  if (event.status && !validStatuses.includes(event.status)) {
    errors.push({ eventId, field: 'status', message: `Invalid status: ${event.status}` });
  }
  
  // Validate teams count
  if (event.teams && (typeof event.teams !== 'number' || event.teams < 0)) {
    errors.push({ eventId, field: 'teams', message: 'teams must be a positive number' });
  }
  
  // Validate participants array
  if (event.participants && !Array.isArray(event.participants)) {
    errors.push({ eventId, field: 'participants', message: 'participants must be an array' });
  }
}

function validateSource(source: any, index: number): void {
  const sourceId = source.gameId || `source-${index}`;
  
  if (!source.gameId) errors.push({ eventId: sourceId, field: 'gameId', message: 'Missing required field: gameId' });
  if (!source.gameName) errors.push({ eventId: sourceId, field: 'gameName', message: 'Missing required field: gameName' });
  if (!source.url) errors.push({ eventId: sourceId, field: 'url', message: 'Missing required field: url' });
  if (!source.sourceName) errors.push({ eventId: sourceId, field: 'sourceName', message: 'Missing required field: sourceName' });
  
  if (source.url && !source.url.startsWith('http')) {
    errors.push({ eventId: sourceId, field: 'url', message: 'Invalid URL format' });
  }
}

console.log('🔍 Validating tournament data...\n');

TOURNAMENT_EVENTS.forEach((event, index) => {
  validateEvent(event, index);
});

OFFICIAL_TOURNAMENT_SOURCES.forEach((source, index) => {
  validateSource(source, index);
});

if (errors.length === 0) {
  console.log('✅ All tournament data is valid!');
  console.log(`   - ${TOURNAMENT_EVENTS.length} tournament events`);
  console.log(`   - ${OFFICIAL_TOURNAMENT_SOURCES.length} official sources`);
  process.exit(0);
} else {
  console.log(`❌ Found ${errors.length} validation errors:\n`);
  errors.forEach((error, index) => {
    console.log(`${index + 1}. [${error.eventId}] ${error.field}: ${error.message}`);
  });
  process.exit(1);
}
