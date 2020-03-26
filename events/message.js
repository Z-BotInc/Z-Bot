const Discord = require('discord.js');

/**
 * Message Event
 * 
 * @param {Discord.Client} bot
 * @param {Discord.Message} message
 */
module.exports = async (bot, message) => {
    var prefix = bot.config.prefix;
    var args = message.content.slice(prefix.length).trim().split(/ +/g);
    var cmd = args.shift().toLowerCase();
    var db = bot.db;

    let command;

    if (!message.guild || message.author.bot) return;
    if (!message.member) message.member = await message.guild.members.fetch(message.author);
    if (!message.content.startsWith(prefix)) return;
    if (cmd.length === 0) return;

    if (bot.commands.has(cmd)) command = bot.commands.get(cmd);
    else if (bot.aliases.has(cmd)) command = bot.commands.get(bot.aliases.get(cmd));

    if (command) command.run(bot, message, args, db);
};