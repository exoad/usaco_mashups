// @ts-ignore
const { Database } = require("secure-db");
const manifest = require("../../../../internal/MANIFEST.json");

module.exports = {
  config: {
    name: "deblacklist",
    category: "Developer",
    description: "INTERNAL ONLY",
    usage: "INTERNAL ONLY",
    aliases: [`unblock`],
  },
  run: async (_bot, msg, args) => {
    if (msg.author.id == manifest.MASTER_ID) {
      const db = new Database(manifest["blacklisted-registry"]);
      if (args[0] && db.has(args[0])) {
        db.delete(args[0]);
        msg.channel.send("Delisted user: " + args[0] + " from the blacklist.");
      }
    }
  },
};
