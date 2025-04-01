import fetch from 'node-fetch';
import { getAuthHeader } from './auth/index.js';

const API_BASE_URL = "https://api.liferay.cloud";

/**
 * Retorna o ID do colaborador a partir do email.
 */
export async function getCollaboratorId(project, email) {
  const headers = {
    Authorization: await getAuthHeader(),
    'Content-Type': 'application/json'
  };

  const response = await fetch(`${API_BASE_URL}/projects/${project}/collaborators`, { headers });

  if (!response.ok) {
    throw new Error(`Failed to fetch collaborators: ${response.status} - ${response.statusText}`);
  }

  const data = await response.json();

  const user = data.find(u => u.email === email);
  if (!user) {
    throw new Error(`User with email "${email}" not found.`);
  }

  return user.id;
}

/**
 * Atualiza o papel de um colaborador com base no ID.
 */
export async function updateRole(project, userId, role) {
  const headers = {
    Authorization: await getAuthHeader(),
    'Content-Type': 'application/json'
  };

  const response = await fetch(`${API_BASE_URL}/projects/${project}/collaborator-role`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({ collaboratorId: userId, role })
  });

  if (!response.ok) {
    throw new Error(`Failed to update role: ${response.status} - ${response.statusText}`);
  }

  return response.text();
}

/**
 * Remove um colaborador do projeto a partir do email.
 */
export async function removeUserByEmail(project, email) {
  const headers = {
    Authorization: await getAuthHeader(),
    'Content-Type': 'application/json'
  };

  const userId = await getCollaboratorId(project, email);

  const response = await fetch(`${API_BASE_URL}/projects/${project}/collaborators/${userId}`, {
    method: 'DELETE',
    headers
  });

  if (!response.ok) {
    throw new Error(`Failed to remove user: ${response.status} - ${response.statusText}`);
  }

  return `User with email "${email}" removed successfully.`;
}

/**
 * Atualiza o papel de um colaborador usando apenas o email.
 */
export async function updateUserRoleByEmail(project, email, role) {
  const userId = await getCollaboratorId(project, email);
  return updateRole(project, userId, role);
}
