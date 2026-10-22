import { getTournamentEventBySlug } from '../src/lib/tournament-feed.js';
import { SITE_URL } from '../src/data/game-seo.js';

function escapeICS(str: string): string {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\n/g, '\\n');
}

function formatDateToICS(dateString: string): string {
  const date = new Date(dateString);
  return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
}

function generateICS(event: any): string {
  const now = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const startDate = event.startDate ? formatDateToICS(event.startDate) : now;
  const endDate = event.endDate ? formatDateToICS(event.endDate) : startDate;

  return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Tradivex//Tournament Calendar//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
X-WR-CALNAME:${escapeICS(event.gameName + ' Tournaments')}
X-WR-TIMEZONE:UTC
X-WR-CALDESC:${escapeICS('Tournament schedule from ' + event.gameName)}
BEGIN:VEVENT
DTSTART:${startDate}
DTEND:${endDate}
DTSTAMP:${now}
UID:${event.id}@tradivex.com
CREATED:${now}
DESCRIPTION:${escapeICS(event.summary + '\\n\\nOfficial source: ' + event.sourceUrl)}
LAST-MODIFIED:${event.updatedAt ? formatDateToICS(event.updatedAt) : now}
LOCATION:${escapeICS(event.location + ', ' + event.region)}
SEQUENCE:0
STATUS:${event.status === 'cancelled' ? 'CANCELLED' : 'CONFIRMED'}
SUMMARY:${escapeICS(event.name)}
URL:${SITE_URL}/tournaments/${event.slug}
END:VEVENT
END:VCALENDAR`;
}

export default function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const slug = req.query.slug as string;

  if (!slug) {
    return res.status(400).json({ error: 'Tournament slug is required' });
  }

  try {
    const event = getTournamentEventBySlug(slug);

    if (!event) {
      return res.status(404).json({ error: 'Tournament not found' });
    }

    const ics = generateICS(event);

    res.setHeader('Content-Type', 'text/calendar; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="${event.slug}.ics"`);
    res.setHeader('Cache-Control', 'public, max-age=3600');
    return res.status(200).send(ics);
  } catch (error) {
    console.error('ICS generation error:', error);
    return res.status(500).json({ error: 'Failed to generate calendar file' });
  }
}
