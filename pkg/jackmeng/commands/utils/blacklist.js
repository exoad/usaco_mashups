const { EmbedBuilder } = require("discord.js");
// @ts-ignore
// @ts-ignore
const { Database } = require("secure-db");
const manifest = require("../../../../internal/MANIFEST.json");

module.exports = {
  config: {
    name: "blacklist",
    category: "Developer",
    description: "INTERNAL ONLY",
    usage: "REDACTED",
    aliases: [`block`],
  },
  run: async (_bot, msg, args) => {
    if (msg.author.id == manifest.MASTER_ID) {
      const db = new Database(manifest["blacklisted-registry"]);
      const usersdb = new Database(manifest["users-registry"]);
      if (args[0] && args[1] && args[2] && !db.has(args[0])) {
        db.set(args[0], { level: args[1] });
        let erased = false;
        if (usersdb.has(args[0]) && args[2] == "true") {
          usersdb.delete(args[0]);
          erased = true;
        }
        msg.channel.send(
          "Blocked this user from this bot's services.\nWith level: " +
            args[1] +
            "\nErased Registry? " +
            erased
        );
      }
    }
  },
};
