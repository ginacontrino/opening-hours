import './styles/index.css';

import App from './App';
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';

/**
 * In development, we serve mock API data via msw.
 *
 * @see `mocks/handlers.ts` or `fixtures/` for more information about the mocks
 * themselves.
 */
async function enableApiMocking() {
  if (import.meta.env.DEV) {
    const { worker } = await import('./mocks/browser');
    return worker.start();
  }
}

async function init() {
  await enableApiMocking();

  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
}

init();
