import dotenv from 'dotenv';
dotenv.config();

const [,, command, ...args] = process.argv;

async function main() {
  try {
    if (!command) {
      console.log("❗ No command provided.\n");
      const help = await import('./commands/help.js');
      await help.default();
      process.exit(1);
    }

    const commandPath = `./commands/${command}.js`;
    const commandModule = await import(commandPath);
    await commandModule.default(args);
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    console.log();
    const help = await import('./commands/help.js');
    await help.default();
    process.exit(1);
  }
}

main();
