import fetch from 'node-fetch';

let cachedToken = null;

/**
 * Retorna o header Authorization com um token válido,
 * obtido via Basic Auth na rota /user.
 */
export async function getAuthHeader() {
  if (cachedToken) {
    return `Bearer ${cachedToken}`;
  }

  const { DXP_CLOUD_USERNAME, DXP_CLOUD_PASSWORD } = process.env;

  if (!DXP_CLOUD_USERNAME || !DXP_CLOUD_PASSWORD) {
    throw new Error("Missing DXP_CLOUD_USERNAME or DXP_CLOUD_PASSWORD in .env");
  }

  const basic = Buffer.from(`${DXP_CLOUD_USERNAME}:${DXP_CLOUD_PASSWORD}`).toString('base64');

  try {
    const response = await fetch("https://api.liferay.cloud/user", {
      method: 'GET',
      headers: {
        Authorization: `Basic ${basic}`,
        'Content-Type': 'application/json'
      }
    });

    const body = await response.text();

    if (!response.ok) {
      throw new Error(`Authentication failed: ${response.status} ${response.statusText} - ${body}`);
    }

    const data = JSON.parse(body);

    if (!data.token) {
      throw new Error("Token not found in response from /user endpoint.");
    }

    cachedToken = data.token;
    return `Bearer ${cachedToken}`;
  } catch (err) {
    throw new Error(`Error during token retrieval: ${err.message}`);
  }
}
