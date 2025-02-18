import { setupServer } from 'msw/node';
import { handlers } from './handlers';

/**
 * Integrates msw into a node process, such as a test runner. This is not used
 * by default, but is exposed for convenience.
 */
export const server = setupServer(...handlers);
