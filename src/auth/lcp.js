import { execSync } from 'child_process';

/**
 * Executa o login no LCP usando as variáveis DXP_CLOUD_USERNAME e DXP_CLOUD_PASSWORD
 */
function loginIfNeeded() {
  const { DXP_CLOUD_USERNAME, DXP_CLOUD_PASSWORD } = process.env;

  if (!DXP_CLOUD_USERNAME || !DXP_CLOUD_PASSWORD) {
    throw new Error("Missing DXP_CLOUD_USERNAME or DXP_CLOUD_PASSWORD in .env");
  }

  const command = `echo "${DXP_CLOUD_USERNAME} ${DXP_CLOUD_PASSWORD}" | lcp login --no-browser`;
  execSync(command, { stdio: 'inherit', shell: true });
}

/**
 * Retorna o header de autorização usando o token do LCP CLI.
 */
export function getAuthHeader() {
  loginIfNeeded();
  const token = execSync('lcp auth token', { encoding: 'utf-8' }).trim();
  return `Bearer ${token}`;
}
