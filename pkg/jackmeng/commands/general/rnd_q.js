const { EmbedBuilder } = require("discord.js");
const { parseMonth } = require("../../fx/fun_Basics");
// @ts-ignore
const colors = require("../../../../configs/colors.json");
// @ts-ignore
const app = require("../../../../configs/bot.json");
const { rnd_q } = require("../../fx/fun_StaticAPI");
module.exports = {
  config: {
    name: "rndq",
    category: "General",
    description: "Get a random question from USACO",
    usage: app.strings.arguments_null,
    aliases: [`randomq`],
  },
  run: async (bot, msg, args) => {
    let rnd = rnd_q();
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
