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
    usage: "1 arg(s) : [div={platinum,gold,silver,bronze}]",
    aliases: [`randomproblem`, `randomquestion`, `gimme`, `singleton`],
  },
  run: async (bot, msg, args) => {},
};
