const { readdirSync } = require('fs');
const chalk = require('chalk');

async function loadSelectMenus(client) {
	client.selectMenus.clear();

	let files = 0;
	if (!client.selectMenus) return;
	console.log(chalk.yellowBright('[SELECTMENU] Loading selectMenus...'));
	const selectMenuFiles = await readdirSync('./src/interactions/selectMenus', (err, files) => {
		if (err) console.error(err);
		return files;
	});
	for (const selectMenuFile of selectMenuFiles) {
		if (!selectMenuFile.endsWith('.js')) continue;

		const commandPath = `../interactions/selectMenus/${selectMenuFile}`;
		delete require.cache[require.resolve(commandPath)];

		try {
			const command = require(commandPath);
			console.log(command.execute);
			await client.selectMenus.set(selectMenuFile.id, selectMenuFile.execute);
			console.log(chalk.greenBright(`[selectMenus] Loaded ${(chalk.yellow(selectMenuFiles))} with selectMenu ${(chalk.yellow(command.id))}`));
			files++;
		} catch (error) {
			console.error(`[selectMenus] Error loading ${selectMenuFile}:`, error);
		}
	}

	const selectMenuFolders = readdirSync('./src/interactions/selectMenus', { withFileTypes: true }).filter(file => file.isDirectory());
	if (!selectMenuFolders) return;
	for (let i = 0; i < selectMenuFolders.length; i++) {
		const selectMenuFiles = readdirSync(`./src/interactions/selectMenus/${selectMenuFolders[i].name}`).filter(file => file.endsWith('.js'));
		for (let j = 0; j < selectMenuFiles.length; j++) {
			const selectMenu = await import(`../interactions/selectMenus/${selectMenuFolders[i].name}/${selectMenuFiles[j]}?${Date.now()}`);
			await client.selectMenus.set(selectMenu.id, selectMenu.execute);
			console.log(chalk.greenBright(`[SELECTMENU] Loaded ${(chalk.yellow(selectMenuFiles[j]))} with selectMenu ${(chalk.yellow(selectMenu.default.id))}`));
			files++;
		}
	}
	return files;


}

module.exports = { loadSelectMenus };   