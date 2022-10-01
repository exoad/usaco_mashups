/**
 */

const { EmbedBuilder } = require("discord.js");
// @ts-ignore
const colors = require("../../../../configs/colors.json");
// @ts-ignore
const app = require("../../../../configs/bot.json");
const { Database } = require("secure-db");
// @ts-ignore
const manifest = require("../../../../internal/MANIFEST.json");
const superagent = require("superagent");
const { schedule } = require("../../../../bin/usaco.json");

module.exports = {
  config: {
    name: "contest",
    category: "General",
    description: "Get the latest schedule posted on usaco.org",
    usage: "No argument accepted",
    aliases: [`contests`],
  },
  run: async (bot, msg, args) => {
    let id = msg.author.id;
    const bldb = new Database(manifest["blacklisted-registry"]);
    if (bldb.has(id)) {
      return;
    } else {
      const embed = new EmbedBuilder()
        .setTitle("USACO Contest Schedule")
        .setDescription(!schedule ? "Unable to retrieve reqest" : schedule)
        .setFooter({
          text: "[!!] These date and time are not up to date, even at the usaco.org level [!!]",
        })
        .setColor("Random");
      msg.channel.send({ embeds: [embed] });
    }
  },
};
