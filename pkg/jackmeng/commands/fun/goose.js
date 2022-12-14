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

module.exports = {
  config: {
    name: "goose",
    category: "Fun",
    description: "Gives you a random geese/goose picture",
    usage: "No arguments accepted",
    aliases: [`geese`],
  },
  run: async (bot, msg, args) => {
    let id = msg.author.id;
    const bldb = new Database(manifest["blacklisted-registry"]);
    if (bldb.has(id)) {
      return;
    } else {
      const { body } = await superagent.get(
        "https://nekos.life/api/v2/img/goose"
      );
      const embed = new EmbedBuilder().setImage(body.url).setColor("Random");

      msg.channel.send({ embeds: [embed] }).then((m) => m.react("❤️"));
    }
  },
};
