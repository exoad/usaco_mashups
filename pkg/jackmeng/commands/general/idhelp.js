const { EmbedBuilder } = require("discord.js");
// @ts-ignore
// @ts-ignore
const app = require("../../../../configs/bot.json");
const { Database } = require("secure-db");
// @ts-ignore

module.exports = {
  config: {
    name: "idhelp",
    category: "General",
    description: "Get information on how problem ID works for this bot",
    usage: app.strings.arguments_null,
    aliases: [`idsystem`, `idk`],
  },
  run: async (_bot, msg, _args) => {
    const embed = new EmbedBuilder()
      .setTitle("ID System README")
      .setDescription("```" + app.strings.id_system_readme + "```");

    msg.channel.send({ embeds: [embed] });
  },
};
