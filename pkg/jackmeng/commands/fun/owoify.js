/**
 */

const { EmbedBuilder } = require("discord.js");
// @ts-ignore
const colors = require("../../../../configs/colors.json");
// @ts-ignore
const app = require("../../../../configs/bot.json");
const { Database } = require("secure-db");
const superagent = require("superagent");
// @ts-ignore
const manifest = require("../../../../internal/MANIFEST.json");

module.exports = {
  config: {
    name: "owoify",
    category: "Fun",
    description: "OwOify your message ~nya~ (not furry)",
    usage:
      "An unlimited amoung of arguments accepted.\nThis unlimited argument contains the message to be owoified.",
    aliases: [`uwuify`],
  },
  run: async (bot, msg, args) => {
    let id = msg.author.id;
    const bldb = new Database(manifest["blacklisted-registry"]);
    if (bldb.has(id)) {
      return;
    } else {
      const { body } = await superagent.get(
        manifest.api_endpoints.owo_endpoint_own + args.join("%20")
      );
      msg.channel.send(body.owo == undefined ? body.msg : body.owo);
    }
  },
};
