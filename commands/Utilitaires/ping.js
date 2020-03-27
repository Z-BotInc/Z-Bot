const Discord = require('discord.js');
const low = require('lowdb');

/**
 * Serverinfo command
 * 
 * @param {Discord.Client} bot
 * @param {Discord.Message} message
 * @param {String[]} args
 * @param {low.LowdbSync<any>} db
 */
module.exports.run = async (bot, message, args, db) => {
    let msg = await message.channel.send(`Pong! `, { code: "fix" });
    let embed = new Discord.MessageEmbed()
        .setTitle("Informations sur la latence")
        .addField("Ping Robot", `\`\`\`js\n${msg.createdTimestamp - message.createdTimestamp} Ms\`\`\``, true)
        .addField("Ping WebSocket", `\`\`\`js\n${Math.floor(bot.ws.ping)} Ms\`\`\``, true)
        .setColor(bot.config.colors.secondary)
        .setFooter(`Commande effectuée par ${message.author.tag}`, message.author.displayAvatarURL())
        .setTimestamp();
    msg.edit("", { embed: embed });
};

module.exports.help = {
    name: "ping",
    description: "Affichage du temps de latence de L'API Discord et du robot.",
    category: "Utilitaires",
    examples: [">ping"]
};