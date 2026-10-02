import { lazy, StrictMode, Suspense } from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import { SitePage } from './components/SitePage.tsx';
import { getSitePageBySlug } from './data/site-pages.ts';
import './index.css';

const EsportsHub = lazy(() => import('./components/EsportsHub.tsx').then((module) => ({ default: module.EsportsHub })));

const slug = window.location.pathname.replace(/^\/+|\/+$/g, '');
const staticPage = getSitePageBySlug(slug);
const esportsNewsMatch = window.location.pathname.match(/^\/esports-news(?:\/(.*))?\/?$/);
const tournamentsMatch = window.location.pathname.match(/^\/tournaments(?:\/(.*))?\/?$/);
const gameNewsMatch = window.location.pathname.match(/^\/game-news(?:\/(.*))?\/?$/);
const esportsPage = esportsNewsMatch ? <EsportsHub mode="news" slug={esportsNewsMatch[1]} /> : tournamentsMatch ? <EsportsHub mode="tournaments" slug={tournamentsMatch[1]} /> : null;
const GameNewsPage = lazy(() => import('./components/GameNewsPage.tsx').then((module) => ({ default: module.GameNewsPage })));
const gameNewsPage = gameNewsMatch ? <GameNewsPage gameId={gameNewsMatch[1]} /> : null;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense fallback={<div className="min-h-screen bg-[#050811]" />}>{gameNewsPage || esportsPage || (staticPage ? <SitePage page={staticPage} /> : <App />)}</Suspense>
  </StrictMode>,
);

// Keep the build-time SEO fallback out of the user's first paint. It remains
// in the HTML for crawlers, then React replaces it with the full application.
window.requestAnimationFrame(() => document.documentElement.classList.add('app-ready'));
