const { EmbedBuilder } = require("discord.js");
// @ts-ignore
const colors = require("../../../../configs/colors.json");
// @ts-ignore
const app = require("../../../../configs/bot.json");

module.exports = {
  config: {
    name: "rndq",
    category: "General",
    description: "Get a random question from USACO",
    usage: app.strings.arguments_null,
    aliases: [`singleton`],
  },
  run: async (bot, msg, args) => {
    function parseMonth(intMonth) {
      return intMonth == 1
        ? "January"
        : intMonth == 2
        ? "February"
        : intMonth == 3
        ? "March"
        : intMonth == 4
        ? "USOpen/April"
        : intMonth == 12
        ? "December"
        : "Unexpected Month " + intMonth;
    }
    const qs = require("../../../../bin/rnd.json");
    let rnd = qs[Math.floor(Math.random() * qs.length)];
    const embed = new EmbedBuilder()
      .setTitle(`RNDQ: ${rnd.name}`)
      .setURL(rnd.url)
      .setDescription(
        "USACO - " +
          rnd.year +
          " | " +
          parseMonth(rnd.month) +
          " [" +
          rnd.month +
          "]"
      )
      .addFields(
        {
          name: "Division",
          value: "" + rnd.div,
          inline: true,
        },
        {
          name: "Problem #",
          value: "" + rnd.qnum,
          inline: true,
        },
        {
          name: "Link",
          value: "" + rnd.url,
          inline: true,
        }
      );
    msg.channel.send({ embeds: [embed] });
  },
};
