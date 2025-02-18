import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

/**
 * Integrates msw into a browser process, particularly for local development.
 */
export const worker = setupWorker(...handlers);
