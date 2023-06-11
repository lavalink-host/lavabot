const { readdirSync } = require('fs');
const chalk = require('chalk');

async function loadModals(client) {
	client.modals.clear();
	let files = 0;
	const modalFiles = readdirSync('./src/interactions/modals').filter(file => file.endsWith('.js'));
	if (!modalFiles) return;
	for (let i = 0; i < modalFiles.length; i++) {
		const commandPath = `../interactions/modals/${modalFiles[i]}`;
		delete require.cache[require.resolve(commandPath)];
		const modal = await import(`../interactions/modals/${modalFiles[i]}`);
		await client.modals.set(modal.default.id, modal.default);
		console.log(chalk.greenBright(`[MODAL] Loaded ${(chalk.yellow(modalFiles[i]))} with modal ${(chalk.yellow(modal.default.id))}`));
		files++;
	}
	const modalFolders = readdirSync('./src/interactions/modals', { withFileTypes: true }).filter(file => file.isDirectory());
	if (!modalFolders) return;
	for (let i = 0; i < modalFolders.length; i++) {
		const modalFiles = readdirSync(`./src/interactions/modals/${modalFolders[i].name}`).filter(file => file.endsWith('.js'));
		for (let j = 0; j < modalFiles.length; j++) {
			const modal = await import(`../interactions/modals/${modalFolders[i].name}/${modalFiles[j]}?${Date.now()}`);
			await client.modals.set(modal.default.id, modal.default);
			console.log(chalk.greenBright(`[MODAL] Loaded ${(chalk.yellow(modalFiles[j]))} with modal ${(chalk.yellow(modal.default.id))}`));
			files++;
		}
	}
	return files;
}

module.exports = {loadModals}