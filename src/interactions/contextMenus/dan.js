const { ContextMenuCommandBuilder, ApplicationCommandType } = require('discord.js');

module.exports = {
	data: new ContextMenuCommandBuilder()
		.setName('dan')
		.setType(ApplicationCommandType.User),
	async execute(client, interaction) {
		 await interaction.reply('dans actually hot tho ngl');
	},
};