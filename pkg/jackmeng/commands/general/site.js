const { EmbedBuilder } = require("discord.js");
// @ts-ignore
const app = require("../../../../configs/bot.json");
const colors = require("../../../../configs/colors.json");

module.exports = {
  config: {
    name: "usaco",
    category: "General",
    description: "Get resources related to USACO",
    usage: app.strings.arguments_null,
    aliases: [`usacosite`, `cow`],
  },
  run: async (_bot, msg, _args) => {
    const embed = new EmbedBuilder()
      .setTitle("USACO Site")
      // @ts-ignore
      .setColor(colors.default_purple)
      .setDescription("Resources related to USACO")
      .addFields(
        {
          name: "Website",
          value: "http://www.usaco.org/",
          inline: true,
        },
        {
          name: "USACO Training",
          value: "http://train.usaco.org/",
          inline: true,
        }
      )
      .setFooter({ text: "NEVER SHARE YOUR USACO LOGINS TO ANYONE" });

    msg.channel.send({ embeds: [embed] });
  },
};
