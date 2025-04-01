/**
 * Retorna o header de autorização usando Basic Auth.
 */
export function getAuthHeader() {
  const { DXP_CLOUD_USERNAME, DXP_CLOUD_PASSWORD } = process.env;

  if (!DXP_CLOUD_USERNAME || !DXP_CLOUD_PASSWORD) {
    throw new Error("Missing DXP_CLOUD_USERNAME or DXP_CLOUD_PASSWORD in .env");
  }

  const token = Buffer.from(`${DXP_CLOUD_USERNAME}:${DXP_CLOUD_PASSWORD}`).toString('base64');
  return `Basic ${token}`;
}
