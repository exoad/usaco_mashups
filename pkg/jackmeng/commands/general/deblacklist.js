const { EmbedBuilder } = require("discord.js");
// @ts-ignore
const colors = require("../../../../configs/colors.json");
// @ts-ignore
const app = require("../../../../configs/bot.json");
const { Database } = require("secure-db");
const manifest = require("../../../../internal/MANIFEST.json");

module.exports = {
  config: {
    name: "deblacklist",
    category: "",
    description: "INTERNAL ONLY",
    usage: "",
    aliases: [`unblock`],
  },
  run: async (bot, msg, args) => {
    if (msg.author.id == manifest.MASTER_ID) {
      const db = new Database(manifest["blacklisted-registry"]);
      if (args[0] && db.has(args[0])) {
        db.delete(args[0]);
        msg.channel.send("Delisted user: " + args[0] + " from the blacklist.");
      }
    }
  },
};
