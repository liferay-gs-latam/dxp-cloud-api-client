import * as lcpAuth from './lcp.js';

/**
 * Returns the authorization header using the selected auth mode.
 * Currently, only 'lcp' is supported, using Basic Auth to retrieve a token via /user.
 */
export async function getAuthHeader() {
  const mode = process.env.DXP_AUTH_MODE?.toLowerCase() || 'lcp';

  if (mode === 'lcp') {
    return await lcpAuth.getAuthHeader();
  } else {
    throw new Error(`Unsupported auth mode: ${mode}. Currently, only 'lcp' is supported.`);
  }
}
