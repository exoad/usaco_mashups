const { EmbedBuilder } = require("discord.js");
// @ts-ignore
const colors = require("../../../../configs/colors.json");
// @ts-ignore
const app = require("../../../../configs/bot.json");
const { Database } = require("secure-db");
// @ts-ignore
const manifest = require("../../../../internal/MANIFEST.json");

module.exports = {
  config: {
    name: "idhelp",
    category: "General",
    description: "Get information on how problem ID works for this bot",
    usage: app.strings.arguments_null,
    aliases: [`idsystem`, `idk`],
  },
  run: async (bot, msg, args) => {
    const embed = new EmbedBuilder()
      .setTitle("ID System README")
      .setDescription("```" + app.strings.id_system_readme + "```");

    msg.channel.send({ embeds: [embed] });
  },
};
