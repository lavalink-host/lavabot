const { ButtonBuilder, ButtonStyle, Embed, EmbedBuilder, PermissionsBitField, ActionRowBuilder } = require('discord.js');
const { default: mongoose } = require('mongoose');
const userSchema = new mongoose.Schema({
    discordID: String,
    consoleID: String,
    email: String,
    username: String,
    linkTime: String,
    linkDate: String,
});
module.exports = {
    name: 'user',
    description: 'creates a new user',
    aliases: ['user-new'],
    async execute(client, message, args) {

        

        try {


            const deleteMessageButton = new ButtonBuilder()
                .setCustomId('deleteOwnChannel')
                .setLabel('Delete')
                .setStyle(ButtonStyle.Danger)
                .setEmoji('🗑️')
                .setDisabled(false);

            let createPassword = () => {
                let password = '';
                let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                let charactersLength = characters.length;
                for (let i = 0; i < 8; i++) {
                    password += characters.charAt(Math.floor(Math.random() * charactersLength));
                }
                return password;
            };

            const email = args[1];
            const username = args[2];

            if (!email) {
                const embed = new EmbedBuilder()
                    .setTitle('Error')
                    .setDescription('Please enter an email address')
                    .setColor('#ff0000');
                return message.channel.send({ embeds: [embed] });
            }

            if (!username) {
                const embed = new EmbedBuilder()
                    .setTitle('Error')
                    .setDescription('Please enter a username for your panel account')
                    .setColor('#ff0000');
                return message.channel.send({ embeds: [embed] });
            }

            let guild = await client.guilds.cache.get('956906522103935046', { force: true });
            let discordCategory = await guild.channels.cache.get('1117799842081689630', { force: true });
            let createdChannel = await guild.channels.create({
                name: `${message.author.tag}`,
                type: 0,
                parent: discordCategory.id,
                permissionOverwrites: [
                    {
                        id: message.author.id,
                        allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ReadMessageHistory],
                    }, {
                        id: message.guild.roles.everyone.id,
                        deny: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ReadMessageHistory],
                    }
                ]
            });
            message.reply({ content: `> ### Your ticket has been created: ${createdChannel}`, ephemeral: true });

            const acceptTermsMessage = new EmbedBuilder()
                .setTitle('Welcome to lavalink.host 👋')
                .setDescription(`> ### ${message.author}, by clicking the button below you agree to the terms of service and privacy policy\n> **by clicking DELETE (🗑️), this channel will cancel the registration and will close after 10 seconds.**`)
                .setColor('#5D3FD3');

            const acceptTermsButton = new ButtonBuilder()
                .setCustomId('acceptTerms')
                .setLabel('Accept')
                .setStyle(ButtonStyle.Success)
                .setEmoji('✅')
                .setDisabled(false);

            const denyTermsButton = new ButtonBuilder()
                .setCustomId('denyTerms')
                .setLabel('Deny')
                .setStyle(ButtonStyle.Danger)
                .setEmoji('❌')
                .setDisabled(false);

            const acceptTermsRow = new ActionRowBuilder().addComponents(acceptTermsButton, denyTermsButton);
            const acceptTermsRow2 = new ActionRowBuilder().addComponents(deleteMessageButton);
            const acceptTerms = await createdChannel.send({ embeds: [acceptTermsMessage], components: [acceptTermsRow, acceptTermsRow2] });

            const filter = i => i.user.id === i.member.id;

            const collector = createdChannel.createMessageComponentCollector({ filter, time: 30000 });

            collector.on('collect', async i => {
                const panelCreatedDeleteButton = new ActionRowBuilder().addComponents(deleteMessageButton);
                if (i.customId === 'acceptTerms') {

                    i.deferUpdate();
                    const embedForChannel = new EmbedBuilder()
                        .setTitle('👤 Panel Account')
                        .setDescription(`> **Your panel account has been created, you can login at https://panel.lavalink.host**\n> **by clicking DELETE (🗑️), this channel will close after 10 seconds.**`)
                        .addFields(
                            { name: 'Email', value: `> \`${email}\`` },
                            { name: 'Username', value: `> \`${username}\`` },
                        )
                        .setColor('#5D3FD3');
                    const embed = new EmbedBuilder()
                        .setTitle('👤 Panel Account')
                        .setDescription(`# **You've recieved DM message about your registration!** :)\n**- you can login at https://panel.lavalink.host**\n** * If you believe this is a mistake, contact Support+**`)
                        .addFields(
                            { name: 'Password', value: `> \`${createPassword()}\`` },
                        )
                    await message.author.send({ embeds: [embed] });
                    await createdChannel.send({ content: '# Please check your DMs for your password.', embeds: [embedForChannel], components: [panelCreatedDeleteButton] });
                    await acceptTerms.delete();
                    await collector.stop();

                } else if (i.customId === 'denyTerms') {

                    i.deferUpdate();
                    const embed = new EmbedBuilder()
                        .setTitle('👤 Panel Account')
                        .setDescription(`### You have denied the ToS & Privacy Policy, you won\'t be able to use our service.`)
                        .setColor('#ff0000');
                    await acceptTerms.delete();
                    await createdChannel.send({ embeds: [embed], components: [deleteMessageButton] });
                    await collector.stop();

                }
            })
        } catch (error) {
            // log the rawError
            console.log(error);
        }

    }
};