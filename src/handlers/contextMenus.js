const { readdirSync } = require('fs');
const chalk = require('chalk');

async function loadContextMenus(client) {
    client.contextMenus.clear();
    let files = 0;
    const contextMenus = readdirSync('./src/interactions/contextMenus').filter(file => file.endsWith('.js'));
    if (!contextMenus) return;
    for (let i = 0; i < contextMenus.length; i++) {
        await delete require.cache[require.resolve(`../interactions/contextMenus/${contextMenus[i]}`)];
        const menus = await require(`../interactions/contextMenus/${contextMenus[i]}`);
        await client.contextMenus.set(menus.data.name, menus);
        console.log(chalk.greenBright(`[CONTEXTMENU] Loaded ${chalk.yellow(contextMenus[i])} with command ${chalk.yellow(menus.data.name)}`));
        files++;
    }
    const contextMenuFolders = readdirSync('./src/interactions/contextMenus', { withFileTypes: true }).filter(file => file.isDirectory());
    if (!contextMenuFolders) return;
    for (let i = 0; i < contextMenuFolders.length; i++) {
        const contextMenus = readdirSync(`./src/interactions/contextMenus/${contextMenuFolders[i].name}`).filter(file => file.endsWith('.js'));
        for (let j = 0; j < contextMenus.length; j++) {
            const menus = await require(`../interactions/contextMenus/${contextMenuFolders[i].name}/${contextMenus[j]}`);
            client.contextMenus.set(menus.data.name, menus);
            console.log(chalk.greenBright(`[CONTEXTMENU] Loaded ${chalk.yellow(contextMenus[j])} with command ${chalk.yellow(menus.data.toJSON().name)}`));
            files++;
        }
    }
    return files;
}

module.exports = { loadContextMenus }