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
    name: "search",
    category: "General",
    description: "Find a problem based on selected attributes/arguments in the command.",
    usage: "",
    aliases: [`query`, `qfind`],
  },
  run: async (bot, msg, args) => {

  },
};
