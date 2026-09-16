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
