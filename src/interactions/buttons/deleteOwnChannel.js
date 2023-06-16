module.exports = {
	id: 'deleteOwnChannel',
	async execute(client, interaction) {
		try {
			if (interaction.user.id !== interaction.member.id) return;
			setTimeout(() => {
				interaction.message.channel.delete({ reason: 'User has deleted the channel' });
			}, 5000);
		} catch (error) {
			console.log(error);
		}
	}
};