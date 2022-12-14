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
    name: "joke",
    category: "Fun",
    description: "Tries to be funny by giving you a joke",
    usage: "No argument accepted",
    aliases: [`gimmejoke`],
  },
  run: async (bot, msg, args) => {
    let id = msg.author.id;
    const bldb = new Database(manifest["blacklisted-registry"]);
    if (bldb.has(id)) {
      return;
    } else {
      const { body } = await superagent.get(
        manifest.api_endpoints.backend
      );
      msg.channel.send("> " + body.joke);
    }
  },
};
