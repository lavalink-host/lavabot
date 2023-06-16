
const Discord = require('discord.js');
const mongoose = require('mongoose');
const eventHandler = require('./handlers/events.js');
const messageCommandHandler = require('./handlers/messageCommands.js');
const slashCommandHandler = require('./handlers/slashCommands.js');
const modalHandler = require('./handlers/modals.js');
const buttonHandler = require('./handlers/buttons.js');
const selectMenuHandler = require('./handlers/selectMenus.js');
const contextMenus = require('./handlers/contextMenus.js');
const register = require('./handlers/register.js');
const config = require('../config');


const client = new Discord.Client({
    intents: [
        Discord.GatewayIntentBits.MessageContent,
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.GuildMessages,
        Discord.GatewayIntentBits.GuildMembers,
        Discord.GatewayIntentBits.GuildIntegrations,
        Discord.GatewayIntentBits.GuildPresences,
        Discord.GatewayIntentBits.GuildMessageTyping,
        Discord.GatewayIntentBits.DirectMessages,
    ],
    allowedMentions: {
        repliedUser: true
    }
});

async function start() {
await client.login(config.bot.token);
client.messageCommands = new Discord.Collection();
client.messageCommandsAliases = new Discord.Collection();
client.slashCommands = new Discord.Collection();
client.modals = new Discord.Collection();
client.buttons = new Discord.Collection();
client.selectMenus = new Discord.Collection();
client.contextMenus = new Discord.Collection();

await eventHandler.loadEvents(client);
await messageCommandHandler.loadMessageCommands(client);
await slashCommandHandler.loadSlashCommands(client);
await modalHandler.loadModals(client);
await buttonHandler.loadButtons(client);
await selectMenuHandler.loadSelectMenus(client);
await contextMenus.loadContextMenus(client);
await register.load(client);

await mongoose.connect(config.mongodb.url).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log(err);
});
}
start()


