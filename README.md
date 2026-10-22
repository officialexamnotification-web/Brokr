# Tradivex GamingNameHub — Local Gamer Name Generator

This app uses a local Express generator engine. No Gemini, OpenAI or other paid API key is required.

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Run the app:
   `npm run dev`

The frontend calls the local `/api/generate-names` endpoint. Languages, decorations, character counting and game-rule metadata are stored locally in the project.

## SEO routes

The homepage is `/`. Each supported game or platform has a crawlable page such as `/bgmi-name-generator`, `/fortnite-name-generator`, `/roblox-username-generator`, `/minecraft-name-generator` and `/xbox-gamertag-generator`. The production server serves game-specific titles, descriptions, canonicals and JSON-LD, plus `/sitemap.xml` and `/robots.txt`.

## Esports news and tournament schedule

The verified esports hub lives at `/esports-news` and `/tournaments`. Tournament cards and articles link back to an official publisher, organizer or league source. The site intentionally shows status labels and source links instead of pretending to provide live scores.

Tournament data is manually curated and updated in `src/data/tournament-data.ts`. The site works entirely with local event/news data and no paid API is required.
