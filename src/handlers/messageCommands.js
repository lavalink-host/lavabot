const { readdirSync } = require('fs');
const chalk = require('chalk');

async function loadMessageCommands(client) {
	client.messageCommands.clear();
	client.messageCommandsAliases.clear();
	let files = 0;
	const commandFiles = readdirSync('./src/interactions/messageCommands').filter(file => file.endsWith('.js'));
	if (!commandFiles) return;
	for (let i = 0; i < commandFiles.length; i++) {
		const command = await require(`../interactions/messageCommands/${commandFiles[i]}`);
		const commandPath = `../interactions/messageCommands/${commandFiles[i]}`;
		delete require.cache[require.resolve(commandPath)];
		if (command.aliases) {
			command.aliases.forEach(alias => {
				client.messageCommandsAliases.set(alias, command);
			});
		}
		client.messageCommands.set(command.name, command);
		console.log(chalk.greenBright(`[COMMAND] Loaded ${(chalk.yellow(commandFiles[i]))} with command ${(chalk.yellow(command.name))}`));
		files++;
	}
	const commandFolders = readdirSync('./src/interactions/messageCommands', { withFileTypes: true }).filter(file => file.isDirectory());
	if (!commandFolders) return;
	for (let i = 0; i < commandFolders.length; i++) {
		const commandFiles = readdirSync(`./src/interactions/messageCommands/${commandFolders[i].name}`).filter(file => file.endsWith('.js'));
		for (let j = 0; j < commandFiles.length; j++) {
			const command = await require(`../interactions/messageCommands/${commandFolders[i].name}/${commandFiles[j]}`);
			delete require.cache[require.resolve(`../interactions/messageCommands/${commandFolders[i].name}/${commandFiles[j]}`)];
			if (command.aliases) {
				command.aliases.forEach(alias => {
					client.messageCommandsAliases.set(alias, command);
				});
			}
			client.messageCommands.set(command.name, command);
			console.log(chalk.greenBright(`[COMMAND] Loaded ${(chalk.yellow(commandFiles[j]))} with command ${(chalk.yellow(command.name))}`));
			files++;
		}
	}
	return files;
}

module.exports = { loadMessageCommands };