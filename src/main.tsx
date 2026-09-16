import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import { SitePage } from './components/SitePage.tsx';
import { getSitePageBySlug } from './data/site-pages.ts';
import './index.css';

const slug = window.location.pathname.replace(/^\/+|\/+$/g, '');
const staticPage = getSitePageBySlug(slug);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {staticPage ? <SitePage page={staticPage} /> : <App />}
  </StrictMode>,
);

// Keep the build-time SEO fallback out of the user's first paint. It remains
// in the HTML for crawlers, then React replaces it with the full application.
window.requestAnimationFrame(() => document.documentElement.classList.add('app-ready'));
