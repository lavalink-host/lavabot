
const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Ping!'),
	async execute(client, interaction) {
		
		const { EmbedBuilder } = require('discord.js');
		const embed = new EmbedBuilder()
			.setColor('#0099ff')
			.setTitle('Pong!')
			.setDescription(`Ping: ${client.ws.ping}ms`)
			.setTimestamp()
		await interaction.reply({ embeds: [embed] });
		
	}
};