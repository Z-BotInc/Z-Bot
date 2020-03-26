const Discord = require('discord.js');
const {table} = require('table');
const figlet = require('figlet');

/**
 * Ready Event
 * 
 * @param {Discord.Client} bot
 */
module.exports = (bot) => {
    figlet("I'm ready", (err, data) => err ? console.log(err) : console.log(data));
    bot.user.setActivity(`${bot.guilds.cache.size} serveur(s) | ${bot.config.prefix}help`, { type: "WATCHING" });
};