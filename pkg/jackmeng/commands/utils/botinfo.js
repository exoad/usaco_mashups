// @ts-nocheck
const { EmbedBuilder } = require("discord.js");
const colors = require("../../../../configs/colors.json");
const app = require("../../../../configs/bot.json");

module.exports = {
  config: {
    name: "botinfo",
    category: "Utility",
    description: "Get information regarding the bot itself",
    usage: app.strings.arguments_null,
    aliases: [`bot`],
  },
  run: async (bot, msg, args) => {
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
        }
      );

    msg.channel.send({ embeds: [embed] });
  },
};
