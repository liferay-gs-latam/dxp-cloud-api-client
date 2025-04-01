export const description = "Update a collaborator's role";

import { updateUserRoleByEmail } from '../collaborators.js';

export default async function updateRoleCommand(args) {
  const [project, email, role] = args;

  if (!project || !email || !role) {
    throw new Error("Usage: update-role <project> <userEmail> <role>");
  }

  const result = await updateUserRoleByEmail(project, email, role);
  console.log("✅ Role updated successfully:", result);
}
