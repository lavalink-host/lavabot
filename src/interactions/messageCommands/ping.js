const { ButtonBuilder, ButtonStyle, SlashCommandBuilder } = require('discord.js');
module.exports = {
	name: 'ping',
	description: 'Ping!',
	aliases: ['pong'],
	async execute(client, message, args) {
		const msg = await message.channel.send('Pinging...');
		msg.edit(`Pong! Latency is ${msg.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`);

		// const yes = new ButtonBuilder()
		// 	.setCustomId('button-test')
		// 	.setLabel('testing')
		// 	.setStyle(ButtonStyle.Secondary);
		// msg.edit({ components: [{ type: 1, components: [yes] }] });


	}
};