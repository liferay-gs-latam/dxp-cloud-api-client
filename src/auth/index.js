import * as basicAuth from './basic.js';
import * as lcpAuth from './lcp.js';

/**
 * Retorna o header de autorização com base na estratégia definida
 * em DXP_AUTH_MODE (.env).
 */
export function getAuthHeader() {
  const mode = process.env.DXP_AUTH_MODE?.toLowerCase() || 'basic';

  if (mode === 'basic') {
    return basicAuth.getAuthHeader();
  } else if (mode === 'lcp') {
    return lcpAuth.getAuthHeader();
  } else {
    throw new Error(`Unsupported auth mode: ${mode}`);
  }
}
