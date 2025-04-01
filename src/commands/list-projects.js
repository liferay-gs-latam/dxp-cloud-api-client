export const description = "List all projects accessible to the authenticated user";

import fetch from 'node-fetch';
import { getAuthHeader } from '../auth/index.js';

const API_BASE_URL = "https://api.liferay.cloud";

export default async function listProjectsCommand() {
  const headers = {
    Authorization: await getAuthHeader(), // <- aqui é essencial
    'Content-Type': 'application/json'
  };

  const response = await fetch(`${API_BASE_URL}/projects`, { headers });

  if (!response.ok) {
    throw new Error(`Failed to fetch projects: ${response.status} - ${response.statusText}`);
  }

  const data = await response.json();

  if (!data.length) {
    console.log("ℹ️ No projects found.");
    return;
  }

  console.log("📦 Projects:\n");

  data.forEach(project => {
    console.log(`- ${project.projectId}`);
    console.log(`    Status        : ${project.status}`);
    console.log(`    Health        : ${project.health}`);
    console.log(`    Repository    : ${project.metadata?.repository || 'N/A'}`);
    console.log(`    Region        : ${project.cluster || 'N/A'}`);
    console.log(`    Bucket Name   : ${project.persistentStorageBucketName || 'N/A'}`);
    console.log(`    Load Balancer : ${project.loadBalancerIp || 'N/A'}`);
    console.log("");
  });
}
