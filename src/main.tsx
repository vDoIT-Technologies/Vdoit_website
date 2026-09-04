import {StrictMode} from 'react';
import {createRoot, hydrateRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const container = document.getElementById('root')!;
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// The production build prerenders every route (see scripts/prerender.ts), so
// the container already holds markup and React attaches to it. The dev server
// serves the bare template, where hydrating an empty container would only warn
// and then render anyway.
if (container.hasChildNodes()) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
