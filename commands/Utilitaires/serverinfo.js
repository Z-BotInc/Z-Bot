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
    let embed = new Discord.MessageEmbed()
        .setTitle(`Informations à propos du serveur \`${message.guild.name}\``)
        .setColor(bot.config.colors.primary)
        .setFooter(`Commande effectuée par ${message.author.tag}`, message.author.displayAvatarURL())
        .setTimestamp()
        .addField("Nom", `\`\`\`fix\n${message.guild.name}\`\`\``, true)
        .addField("ID", `\`\`\`js\n${message.guild.id}\`\`\``, true)
        .addField("Propriétaire", `\`\`\`js\n${message.guild.owner.user.tag}\`\`\``, true)
        .addField("ID du propriétaire", `\`\`\`js\n${message.guild.owner.id}\`\`\``)
        .addField("Date de création", `\`\`\`js\n${message.guild.createdAt.getDay().toString().replace("1", "Lundi").replace("2", "Mardi").replace("3", "Mercredi").replace("4", "Jeudi").replace("5", "Vendredi").replace("6", "Samedi").replace("7", "Dimanche")} ${message.guild.createdAt.getDate()} ${message.guild.createdAt.getMonth().toString().replace("10", "Novembre").replace("11", "Décembre").replace("0", "Janvier").replace("1", "Février").replace("2", "Mars").replace("3", "Avril").replace("4", "Mai").replace("5", "Juin").replace("6", "Juillet").replace("7", "Août").replace("8", "Septembre").replace("9", "Octobre")} ${message.guild.createdAt.getFullYear()}\`\`\``)
        .addField("Rôle(s)", `\`\`\`js\n${message.guild.roles.cache.size-1}\`\`\``, true)
        .addField("Région", `\`\`\`\n${message.guild.region.slice(0,1).toUpperCase() + message.guild.region.slice(1).toLowerCase()}\`\`\``, true)
        .addField("Membre(s)", `\`\`\`js\n${message.guild.memberCount} membre(s) dont ${message.guild.members.cache.filter(member => member.user.bot).size} robot(s) et ${message.guild.members.cache.filter(member => !member.user.bot).size} humain(s).\`\`\``, true)
        .addField("Canal(aux)", `\`\`\`js\n${message.guild.channels.cache.filter(channel => channel.type === "text").size} textuel(s)\n${message.guild.channels.cache.filter(channel => channel.type === "voice").size} vocal(aux)\n${message.guild.channels.cache.filter(channel => channel.type === "category").size} catégorie(s).\`\`\``)
        .addField("Emojis", message.guild.emojis.cache.map(e => `<:${e.name}:${e.id}>`).join(" ") || "```-```");
    message.channel.send(embed);
};

module.exports.help = {
    name: "serverinfo",
    examples: [">serverinfo"],
    aliases: ["server", "server_info", "server-info", "sinfo", "si"],
    description: "Affichage des informations de votre serveur.",
    category: "Utilitaires"
};