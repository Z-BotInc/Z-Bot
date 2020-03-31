const {Client, Collection} = require('discord.js');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('database.bot.json');
const db = low(adapter);
const chalk = require('chalk');
const {success, error, warning} = require('log-symbols');
const {readdirSync} = require('fs');
const {sep} = require('path');
const config = require('./configs');
const bot = new Client();
const figlet = require('figlet');
const {table} = require('table');

bot.config = config;
bot.database = db;
["commands", "aliases"].forEach(x => bot[x] = new Collection());
db.defaults({
    
})

/**
 * Load events
 * 
 * @param {String} dir 
 */
var loadEvents = (dir = bot.config.events) => {
    let data = [
        ["Evénement", "Fichier", "Statut"],
    ];
    console.log(chalk.yellow("╔═════════════════════════════════════════════════════════════════╗\n"));
    readdirSync(dir).forEach(file => {
        if (!file.endsWith('.js')) return;
        var event = require(`${dir}/${file}`);
        var eventName = file.split('.')[0];
        bot.on(eventName, event.bind(null, bot));
        data.push([eventName, file, success]);
    });
    console.log(table(data));
    console.log(chalk.yellow("╚═════════════════════════════════════════════════════════════════╝"));
};

/**
 * Load commands
 * 
 * @param {String} dir 
 */
var loadCommands = (dir = bot.config.commands) => {
    console.log(chalk.yellow("╔═════════════════════════════════════════════════════════════════╗\n"))
    let data = [
        ["Commande", "Fichier", "Statut"],
    ];
    readdirSync(dir).forEach(dirs => {
        const commands = readdirSync(`${dir}${sep}${dirs}${sep}`).filter(files => files.endsWith('.js'));
        for (const file of commands) {
            var pull = require(`${dir}/${dirs}/${file}`);
            if (pull.help && typeof (pull.help.name) === "string" && typeof (pull.help.category) === "string") {
                if (bot.commands.get(pull.help.name)) return data.push([pull.help.name, file, warning]);
                bot.commands.set(pull.help.name, pull);
                data.push([pull.help.name, file, success]);
            } else {
                let cmdName = file.split('.')[0];
                data.push([cmdName, file, error]);
                continue;
            };
            if (pull.help.aliases && typeof (pull.help.aliases) === "object") {
                pull.help.aliases.forEach(alias => {
                    if (bot.aliases.get(alias)) return;
                    bot.aliases.set(alias, pull.help.name);
                });
            };
        };
    });
    console.log(table(data))
    console.log(chalk.yellow("╚═════════════════════════════════════════════════════════════════╝"));
};

figlet('Evénements', (err, data) => {
    err ? console.log(err) : console.log(data);
    loadEvents();
    figlet('Commandes', (err, data) => {
        err ? console.log(err) : console.log(data);
        loadCommands();
    });
});

bot.login(bot.config.token).catch(e => console.error(e));