const { REST, Routes } = require('discord.js');

const config = require('../../config');


const rest = new REST({ version: '10' }).setToken(config.bot.token);

async function load(client) {
	try {

		const commands = new Map();
		for (const [key, value] of client.slashCommands) {
			commands.set(key, value);
		}
		for (const [key, value] of client.contextMenus) {
			commands.set(key, value);
		}

		await rest.put(
			Routes.applicationCommands('749563163191541801', '639477525927690240'),
			{ body: [...commands.values()].map(command => command.data.toJSON()) },
		);
	} catch (error) {
		console.log(error);
	}
}

module.exports = { load };