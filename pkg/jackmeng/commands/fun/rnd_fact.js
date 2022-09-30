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
    name: "fact",
    category: "Fun",
    description: "Gives you a random fact",
    usage: "No Arguments Accepted",
    aliases: [`randomfact`, `rndfact`],
  },
  run: async (bot, msg, args) => {
    let id = msg.author.id;
    const bldb = new Database(manifest["blacklisted-registry"]);
    if (bldb.has(id)) {
      return;
    } else {
      msg.channel
        .send("**Thinking about a random fact...**")
        .then(async (m) => {
          const { body } = await superagent.get(
            manifest.api_endpoints.fact_endpoint_own
          );
          m.edit(">>> " + body.fact);
        });
    }
  },
};
