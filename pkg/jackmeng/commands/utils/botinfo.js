// @ts-nocheck
const { EmbedBuilder } = require("discord.js");
const colors = require("../../../../configs/colors.json");
const internals = require("../../../../internal/MANIFEST.json");
const app = require("../../../../configs/bot.json");
const discordjs = require("../../fx/fun_DiscordJS");
module.exports = {
  config: {
    name: "botinfo",
    category: "Utility",
    description: "Get information regarding the bot itself",
    usage: app.strings.arguments_null,
    aliases: [`bot`],
  },
  run: async (bot, msg, args) => {
    const e = discordjs.uptime(bot);
    const embed = new EmbedBuilder()
      .setColor(`${colors.default_orange}`)
      .setTitle("Bot Information Pane")
      .setDescription("This bot is created by exoad#9292")
      .addFields(
        {
          name: "Source Repo.:",
          value: "[GitHub](https://github.com/exoad/usaco-mashup-bot)",
          inline: true,
        },
        {
          name: "Discord Server",
          value: "https://discord.gg/PbJQRT9zQ8",
          inline: true,
        },
        {
          name: "Uptime",
          value: `${e.days} days ${e.hours} hours , ${e.minutes} minutes & ${e.seconds} seconds`,
          inline: true
        },
        {
          name: "Database Schema Provider",
          value: "`"+internals.database_backed_schema_v+"`",
          inline: true
        }
      );

    msg.channel.send({ embeds: [embed] });
  },
};
