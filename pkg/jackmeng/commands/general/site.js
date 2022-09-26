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
  run: async (bot, msg, args) => {
    const embed = new EmbedBuilder()
      .setTitle("USACO Site")
      // @ts-ignore
      .setColor(colors.default_purple)
      .setDescription(
        "You can find the USACO website here: " + app.urls.usaco_site
      )
      .setFooter({ text: "NEVER SHARE YOUR USACO LOGINS TO ANYONE" });

    msg.channel.send({ embeds: [embed] });
  },
};
