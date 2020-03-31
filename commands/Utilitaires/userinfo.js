const Discord = require('discord.js');
const low = require('lowdb');

/**
 * Userinfo command
 * 
 * @param {Discord.Client} bot
 * @param {Discord.Message} message
 * @param {String[]} args
 * @param {low.LowdbSync<any>} db
 */
module.exports.run = async (bot, message, args, db) => {
    let member = message.mentions.members.first() || message.member;
    let embed = new Discord.MessageEmbed()
        .setColor(bot.config.colors.primary)
        .setFooter(`Commande effectuée par ${message.author.tag}`, message.author.displayAvatarURL())
        .setTimestamp()
        .addField("Nom", `\`\`\`fix\n${member.user.tag}\`\`\``, true)
        .addField("ID", `\`\`\`js\n${member.user.id}\`\`\``, true)
        .addField("Mention", member.user, true)
        .addField("Surnom", `\`\`\`${member.nickname || "-"}\`\`\``, true)
        .addField("Rôle(s)", `\`\`\`js\n${member.roles.cache.size-1} rôle(s).\`\`\``)
        .addField("Statut", `\`\`\`\n${member.user.presence.status.replace("idle", "🟡 Inactif.").replace("offline", "⚫ Hors ligne.").replace("dnd", "🔴 Ne pas déranger.").replace("online", "🟢 En ligne.")}\`\`\``)
        .addField("Date de création", `\`\`\`js\n${member.user.createdAt.getDay().toString().replace("1", "Lundi").replace("2", "Mardi").replace("3", "Mercredi").replace("4", "Jeudi").replace("5", "Vendredi").replace("6", "Samedi").replace("7", "Dimanche")} ${member.user.createdAt.getDate()} ${member.user.createdAt.getMonth().toString().replace("0", "Janvier").replace("1", "Février").replace("2", "Mars").replace("3", "Avril").replace("4", "Mai").replace("5", "Juin").replace("6", "Juillet").replace("7", "Août").replace("8", "Septembre").replace("9", "Octobre").replace("10", "Novembre").replace("11", "Décembre")} ${member.user.createdAt.getFullYear()}\`\`\``)
        .addField("Date d'arrivée",  `\`\`\`js\n${member.joinedAt.getDay().toString().replace("1", "Lundi").replace("2", "Mardi").replace("3", "Mercredi").replace("4", "Jeudi").replace("5", "Vendredi").replace("6", "Samedi").replace("7", "Dimanche")} ${member.joinedAt.getDate()} ${member.joinedAt.getMonth().toString().replace("0", "Janvier").replace("1", "Février").replace("2", "Mars").replace("3", "Avril").replace("4", "Mai").replace("5", "Juin").replace("6", "Juillet").replace("7", "Août").replace("8", "Septembre").replace("9", "Octobre").replace("10", "Novembre").replace("11", "Décembre")} ${member.joinedAt.getFullYear()}\`\`\``)
        .setThumbnail(member.user.displayAvatarURL());
    message.channel.send(embed);
};

module.exports.help = {
    name: "userinfo",
    usage: "(@membre)",
    example: [">userinfo", ">userinfo @ZedoD3v"],
    description: "Affichage des informations liées à une personne.",
    category: "Utilitaires",
    aliases: ["user", "user_info", "uinfo", "user-info", "ui"]
};