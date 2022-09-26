// @ts-nocheck
const { EmbedBuilder } = require('discord.js');
const colors = require("../../../../configs/colors.json");

module.exports = {
  config: {
    name: "botinfo",
    category: "Utility",
    description: "Get information regarding the bot itself",
    aliases: [`bot`]
  },
  run: async (bot, msg, args) => {
    const embed = new EmbedBuilder()
      .setColor(`${colors.default_orange}`)
      .setTitle("Bot Information Pane")
      .setDescription("This bot is created by exoad#9292")
    .addFields("Source Repository", "[GitHub]()")
  }
}