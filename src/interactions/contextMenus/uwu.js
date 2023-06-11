const { ContextMenuCommandBuilder, ApplicationCommandType } = require('discord.js');

module.exports = {
	data: new ContextMenuCommandBuilder()
		.setName(`uwu`)
		.setType(2),
	async execute(client, interaction) {
		await interaction.reply({
			content: `Successful.`,
			ephemeral: true
		});
	}
}