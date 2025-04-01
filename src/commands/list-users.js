export const description = "List all users and their roles for a project";

import fetch from 'node-fetch';
import { getAuthHeader } from '../auth/index.js';

const API_BASE_URL = "https://api.liferay.cloud";

export default async function listUsersCommand(args) {
  const [project] = args;

  if (!project) {
    throw new Error("Usage: list-users <project>");
  }

  const headers = {
    Authorization: await getAuthHeader(),
    'Content-Type': 'application/json'
  };

  const response = await fetch(`${API_BASE_URL}/projects/${project}/collaborators`, { headers });

  if (!response.ok) {
    throw new Error(`Failed to fetch collaborators: ${response.status} - ${response.statusText}`);
  }

  const data = await response.json();

  if (!data.length) {
    console.log(`ℹ️ No users found for project "${project}".`);
    return;
  }

  console.log(`👥 Users for project "${project}":\n`);
  data.forEach(user => {
    console.log(`- ${user.email.padEnd(30)} id: ${user.id.padEnd(30)} (${user.supportedScopes[0].split(":")[0]})`);
  });
}
