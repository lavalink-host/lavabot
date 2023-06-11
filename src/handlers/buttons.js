const { readdirSync } = require("fs");
const chalk = require('chalk');

async function loadButtons(client) {
	client.buttons.clear();
	let files = 0;
	const buttonFiles = readdirSync('./src/interactions/buttons').filter(file => file.endsWith('.js'));
	if (!buttonFiles) return;

	for (const buttonFile of buttonFiles) {
		if (!buttonFile.endsWith('.js')) continue;

		const buttonPath = `../interactions/buttons/${buttonFile}`;
		delete require.cache[require.resolve(buttonPath)];

		try {

			for (let i = 0; i < buttonFiles.length; i++) {
				const button = await import(`../interactions/buttons/${buttonFiles[i]}?${Date.now()}`);
				await client.buttons.set(button.default.id, button.default);
				console.log(chalk.greenBright(`[BUTTON] Loaded ${(chalk.yellow(buttonFiles[i]))} with button ${(chalk.yellow(button.default.id))}`));
				files++;
			}
		} catch (error) {
			console.error(`[BUTTON] Error loading ${buttonFile}:`, error);
		}
	}
	const buttonFolders = readdirSync('./src/interactions/buttons', { withFileTypes: true }).filter(file => file.isDirectory());
	if (!buttonFolders) return;
	for (let i = 0; i < buttonFolders.length; i++) {
		const buttonFiles = readdirSync(`./src/interactions/buttons/${buttonFolders[i].name}`).filter(file => file.endsWith('.js'));
		for (let j = 0; j < buttonFiles.length; j++) {
			const button = await import(`../interactions/buttons/${buttonFolders[i].name}/${buttonFiles[j]}`);
			await client.buttons.set(button.default.id, button.default);
			console.log(chalk.greenBright(`[BUTTON] Loaded ${(chalk.yellow(buttonFiles[j]))} with button ${(chalk.yellow(button.default.id))}`));
			files++;
		}
	}
	return files;
}

module.exports = { loadButtons }