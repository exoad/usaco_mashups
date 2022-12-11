const { EmbedBuilder } = require("discord.js");
const colors = require("../../../../configs/colors.json");
const app = require("../../../../configs/bot.json");

module.exports = {
  config: {
    name: "cmdspew",
    category: "Utility",
    description: "Spews all of the avaliable commands",
    usage: app.strings.arguments_null,
    aliases: [`commandspew`],
  },
  run: async (bot, msg, args) => {
    const embed = new EmbedBuilder()
      // @ts-ignore
      .setColor(colors.default_green)
      .setDescription(
        "```" + Array.from(bot.commands.keys()).toString() + "```"
      )
      .setTimestamp()
      .setTitle(
        "Command Spew [" + Array.from(bot.commands.keys()).length + "]"
      );

    msg.channel.send({ embeds: [embed] });
  },
};
