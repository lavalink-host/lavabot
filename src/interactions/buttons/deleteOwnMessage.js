module.exports = {
	id: 'deleteOwnMessage',
	async execute(client, interaction) {
		if (interaction.user.id !== interaction.member.id) return;
		await interaction.message.delete();
	}
};