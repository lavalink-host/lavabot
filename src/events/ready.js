const chalk = require('chalk');
const fs = require('fs');

let v = JSON.parse(fs.readFileSync('./package.json', 'utf8')).version;

module.exports = {
    event: "ready",
    async execute(client) {
        try {
            console.log(chalk.green(`\n\n${client.user.username} is online and ready to go!`));
            console.log(chalk.green(`Version: ${v}\n\n`));
            client.user.setActivity({ name: `for l!help`, type: 'WATCHING' });
        }
        catch (error) {
            console.log(error);
        }
    }
};