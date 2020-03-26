const Discord = require('discord.js');
const {readdirSync} = require('fs');
const low = require('lowdb');

/**
 * Help command
 * 
 * @param {Discord.Client} bot
 * @param {Discord.Message} message
 * @param {String[]} args
 * @param {low.LowdbSync<any>} db
 */
module.exports.run = async (bot, message, args, db) => {
    let embed = new Discord.MessageEmbed()
        .setColor(bot.config.colors.primary)
        .setFooter(`Commande effectuée par ${message.author.tag}`, message.author.displayAvatarURL())
        .setTimestamp();
    if (args[0]) {
        let command = args[0];
        let cmd;

        if (bot.commands.has(command)) cmd = bot.commands.get(command);
        else if (bot.aliases.has(command)) cmd = bot.commands.get(bot.aliases.get(command));

        if (!cmd) message.channel.send(`- Commande inexistante. Veuillez faire ${bot.config.prefix}help pour accéder à la liste des commandes disponibles.`, { code: "diff" });
        command = cmd.help;

        embed
            .setTitle(`Commande \`${command.name}\``)
            .addField("Nom:", `\`\`\`fix\n${command.name}\`\`\``, true)
            .addField("Catégorie", `\`\`\`\n${command.category}\`\`\``, true)
            .addField("Description:", `\`\`\`\n${command.description || "Aucune description."}\`\`\``)
            .addField("Alias:", `\`\`\`\n${command.aliases ? command.aliases.join(', ') : "-"}\`\`\``)
            .addField("Usage:", `\`\`\`\n${command.usage ? `${bot.config.prefix}${command.name} ${command.usage}` : `${bot.config.prefix}${command.name}`}\`\`\``)
            .addField("Exemple(s):", `\`\`\`\n${command.examples ? command.examples.join('\n') : "Aucun exemple disponible."}\`\`\``);
        return message.channel.send(embed);
    };
    embed.setTitle(`Commandes disponibles (\`${bot.commands.size}\`)`)
    const categories = readdirSync(bot.config.commands).forEach(category => {
        const dir = bot.commands.filter(c => c.help.category.toLowerCase() === category.toLowerCase());
        const capitalise = category.slice(0,1).toUpperCase() + category.slice(1).toLowerCase();

        if (dir.size === 0) return;
        embed.addField(`> ${capitalise}`, `\`\`\`${dir.map(c => c.help.name).join(', ')}\`\`\``);
    });
    message.channel.send(embed);
};

module.exports.help = {
    name: "help",
    usage: "(commande)",
    examples: [">help", ">help serverinfo"],
    description: "Affichage d'une page d'aide personnalisée.",
    category: "Utilitaires",
    aliases: ["h", "helpful"]
};