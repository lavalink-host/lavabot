
const config = require('../../../config');

const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');
const chalk = require('chalk');

const buttonHandler = require('../../handlers/buttons.js');
const contextMenusHandler = require('../../handlers/contextMenus.js');
const messageCommandsHandler = require('../../handlers/messageCommands.js');
const modalsHandler = require('../../handlers/modals.js');
const selectMenusHandler = require('../../handlers/selectMenus.js');
const slashCommandsHandler = require('../../handlers/slashCommands.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('reload')
		.setDescription('Reloads all commands'),
	async execute(client, interaction) {
		if (!config.bot.owners.includes(interaction.user.id)) return interaction.reply('You do not have permission to use this command.');

		console.log(chalk.red('[RELOAD] ') + chalk.yellow('Started reloading everything!'));

		let buttons = await buttonHandler.loadButtons(client);
		let contextMenus = await contextMenusHandler.loadContextMenus(client);
		let messageCommands = await messageCommandsHandler.loadMessageCommands(client);
		let modals = await modalsHandler.loadModals(client);
		let selectMenus = await selectMenusHandler.loadSelectMenus(client);
		let slashCommands = await slashCommandsHandler.loadSlashCommands(client);

		const text = `
		> ### **Reloaded**
		- ${buttons} buttons
		- ${contextMenus} context menus
		- ${messageCommands} message commands
		- ${modals} modals
		- ${selectMenus} select menus
		- ${slashCommands} slash commands`
		await interaction.reply({ content: `${text}`, ephemeral: false });
	}
};