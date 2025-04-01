import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const COMMANDS_DIR = path.join(__dirname);

export const description = "Display available commands";

export default async function helpCommand() {
  const files = fs.readdirSync(COMMANDS_DIR);

  console.log("📘 Available Commands:\n");

  for (const file of files) {
    if (!file.endsWith('.js') || file === 'help.js') continue;

    const name = file.replace('.js', '');
    const { description } = await import(`./${file}`);
    console.log(`  ${name.padEnd(15)} - ${description || 'No description'}`);
  }

  console.log(`\nRun with: node src/index.js <command> [...args]`);
}
