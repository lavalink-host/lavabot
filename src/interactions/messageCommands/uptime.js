const { ButtonBuilder, ButtonStyle } = require('discord.js');
module.exports = {
    name: 'uptime',
    description: 'shows the bot\'s uptime',
    aliases: ['alive'],
    async execute(client, message, args) {

        const deleteMessageButton = new ButtonBuilder()
            .setCustomId('deleteOwnMessage')
            .setLabel('Delete')
            .setStyle(ButtonStyle.Danger)
            .setEmoji('🗑️')


        // get uptime
        const totalSeconds = (client.uptime / 1000);
        const days = Math.floor(totalSeconds / 86400);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = Math.floor(totalSeconds % 60);
        // send uptime
        await message.channel.send({ content: `online for ${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds.`, components: [{ type: 1, components: [deleteMessageButton] }] });


    }
};