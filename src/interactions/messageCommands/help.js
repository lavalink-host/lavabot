const { ButtonBuilder, ButtonStyle } = require('discord.js');
module.exports = {
    name: 'help',
    description: 'shows help?',
    aliases: ['hwlp'],
    async execute(client, message, args) {
        const deleteMessageButton = new ButtonBuilder()
            .setCustomId('deleteOwnMessage')
            .setLabel('Delete')
            .setStyle(ButtonStyle.Danger)
            .setEmoji('🗑️')
        const textUser = `
        > ## **Commands - [USER]**
        - \`help\` - shows this message
        - \`ping\` - shows the bot's ping
        - \`uptime\` - shows the bot's uptime
        * \`user\` - shows your user info for this hosting
            - \`<new>\` - creates a new user account
            - \`<password>\` - resets your password
            - \`<link/unlink>\` - links/unlinks your discord account from the panel account
        * \`server\` - shows the servers, and/or info for specific server info
            - \`<new> <server spec type>\` - creates a new server with the specific amount of hardware resources
            - \`<start/stop/restart> <ID>\` - starts/stops/restarts a server
            - \`<list>\` - shows the list of server hardware type available
            - \`<count>\` - shows the amount of servers you have
            - \`<staus> <ID>\` - shows the status of a server
            - \`<delete> <ID>\` - deletes a server
        - \`stats\` - shows the stats of each hosting node.
        
        **NOTE:** 
        *\`<>\` = required*
        *\`[]\` = optional*\n*viewing page USER comamnds page*`;
        const textAdmin = `
        > ## **Commands - [ADMIN]**
        * \`purge\` - clears the chat
            - \`<amount>\` - the amount of messages to delete
        * \`<mute/unmute>\` - mutes a user
            - \`<user>\` - the user to mute
            - \`<reason>\` - the reason for muting the user
            - \`<time>\` - the time to mute the user for
        * \`<ban/unban>\` - bans a user
            - \`<user>\` - the user to ban or unban
            - \`<reason>\` - the reason for banning the user
        * \`<kick>\` - kicks a user
            - \`<user>\` - the user to kick
        `;
        try {
            // check if user has given a arg to the command
            switch (`${args[1] ? args[1].toLowerCase() : ''}`) {
                case 'user':
                    await message.channel.send({ content: textUser, components: [{ type: 1, components: [deleteMessageButton] }] });
                    break;
                case 'admin':
                    await message.channel.send({ content: textAdmin, components: [{ type: 1, components: [deleteMessageButton] }] });
                    break
                default:
                    await message.channel.send({ content: textUser, components: [{ type: 1, components: [deleteMessageButton] }] });
                    break;
            }
        } catch (error) {
            console.log(error);
        }

    }
};