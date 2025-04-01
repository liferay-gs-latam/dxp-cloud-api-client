export const description = "Remove a collaborator from the project";

import { removeUserByEmail } from '../collaborators.js';

export default async function removeUserCommand(args) {
  const [project, email] = args;

  if (!project || !email) {
    throw new Error("Usage: remove-user <project> <userEmail>");
  }

  const result = await removeUserByEmail(project, email);
  console.log("✅", result);
}
