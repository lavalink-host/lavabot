const { readdirSync } = require('fs');
const chalk = require('chalk');

async function loadEvents(client) {
	const eventFiles = readdirSync('./src/events').filter(file => file.endsWith('.js'));
	if (!eventFiles) return;
	for (let i = 0; i < eventFiles.length; i++) {
		const event = await import(`../events/${eventFiles[i]}`);
		client.on(event.default.event, event.default.execute.bind(null, client));
		console.log(chalk.greenBright(`[EVENT] Loaded ${(chalk.yellow(eventFiles[i]))} with event ${(chalk.yellow(event.default.event))}`));
	}
}

module.exports = { loadEvents }