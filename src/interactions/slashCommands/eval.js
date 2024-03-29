const { inspect } = require('util');

const config = require('../../../config');


const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
	data: new SlashCommandBuilder()
		.addStringOption(option => option.setName('input').setDescription('The input to echo back'))
		.setName('eval')
		.setDescription('Evaluate code'),
	async execute(client, interaction) {
		try {
			if (!config.bot.owners.includes(interaction.user.id)) return interaction.reply('You do not have permission to use this command.');
			try {
				const evaled = eval(interaction.options.getString('input'));
				const cleaned = await clean(evaled);

				interaction.reply(`\`\`\`js\n${cleaned}\n\`\`\``);
			} catch (error) {
				interaction.reply(`\`ERROR\` \`\`\`xl\n${error}\n\`\`\``);
			}

		} catch (error) {
			console.log(error);
		}
	}
};

const clean = async (text) => {

	if (text && text.constructor.name == 'Promise')
		text = await text;

	if (typeof text !== 'string')
		text = inspect(text, { depth: 1 });

	text = text
		.replace(/`/g, '`' + String.fromCharCode(8203))
		.replace(/@/g, '@' + String.fromCharCode(8203));
	return text;
};