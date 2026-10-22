import { lazy, StrictMode, Suspense } from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import { SitePage } from './components/SitePage.tsx';
import { getSitePageBySlug } from './data/site-pages.ts';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ThemeProvider } from './components/ThemeToggle';
import { getTeamBySlug } from './data/teams';
import './index.css';

const EsportsHub = lazy(() => import('./components/EsportsHub.tsx').then((module) => ({ default: module.EsportsHub })));
const TeamProfile = lazy(() => import('./components/TeamProfile.tsx').then((module) => ({ default: module.TeamProfile })));

const slug = window.location.pathname.replace(/^\/+|\/+$/g, '');
const staticPage = getSitePageBySlug(slug);
const esportsNewsMatch = window.location.pathname.match(/^\/esports-news(?:\/(.*))?\/?$/);
const tournamentsMatch = window.location.pathname.match(/^\/tournaments(?:\/(.*))?\/?$/);
const gameNewsMatch = window.location.pathname.match(/^\/game-news(?:\/(.*))?\/?$/);
const teamMatch = window.location.pathname.match(/^\/team\/(.+)\/?$/);
const esportsPage = esportsNewsMatch ? <EsportsHub mode="news" slug={esportsNewsMatch[1]} /> : tournamentsMatch ? <EsportsHub mode="tournaments" slug={tournamentsMatch[1]} /> : null;
const GameNewsPage = lazy(() => import('./components/GameNewsPage.tsx').then((module) => ({ default: module.GameNewsPage })));
const gameNewsPage = gameNewsMatch ? <GameNewsPage gameId={gameNewsMatch[1]} /> : null;
const teamSlug = teamMatch ? teamMatch[1] : null;
const team = teamSlug ? getTeamBySlug(teamSlug) : null;
const teamPage = team ? <TeamProfile team={team} /> : null;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <ErrorBoundary>
        <Suspense fallback={<div className="min-h-screen bg-[#050811]" />}>{teamPage || gameNewsPage || esportsPage || (staticPage ? <SitePage page={staticPage} /> : <App />)}</Suspense>
      </ErrorBoundary>
    </ThemeProvider>
  </StrictMode>,
);

// Keep the build-time SEO fallback out of the user's first paint. It remains
// in the HTML for crawlers, then React replaces it with the full application.
window.requestAnimationFrame(() => document.documentElement.classList.add('app-ready'));
