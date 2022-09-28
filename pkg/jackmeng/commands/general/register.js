const { EmbedBuilder } = require("discord.js");
// @ts-ignore
const colors = require("../../../../configs/colors.json");
// @ts-ignore
const app = require("../../../../configs/bot.json");
const { Database } = require("secure-db");
const manifest = require("../../../../internal/MANIFEST.json");

module.exports = {
  config: {
    name: "register",
    category: "Registry",
    description:
      "Register yourself to the bot and allow telemetry for recommending you problems.",
    usage: "1 argument | {division=plat,gold,silver,bronze,camp,ioi,none}",
    aliases: [``],
  },
  run: async (bot, msg, args) => {
    let author = msg.author.id;

    const blacklistdb = new Database(manifest["blacklisted-registry"]);
    if (!blacklistdb.has(author)) {
      function parseDiv(divStr) {
        divStr = divStr.toLowerCase();
        return divStr.includes("plat")
          ? 1
          : divStr.includes("gold")
          ? 2
          : divStr.includes("silver")
          ? 3
          : divStr.includes("bronze")
          ? 4
          : divStr.includes("camp") || divStr.includes("ioi")
          ? 5
          : -1;
      }
      if (args[0]) {
        msg.channel.send(":skull: Validating...").then((x) => {
          const db = new Database(manifest["users-registry"]);
          setTimeout(function () {
            if (!db.has(author)) {
              db.set(author, {
                division: parseDiv(args[0]),
                regtime: new Date().toLocaleString(),
                solved: 0,
                rating: 0,
                solvedqs: [],
                history: [],
                others: [],
              });
              x.edit(
                "**Registered** " +
                  msg.author.username +
                  " [" +
                  msg.author.id +
                  "] **to the registry!**\nUse `" +
                  app.utils.prefix +
                  "me` to get information on your account!\n*If this was by mistake, use:* `" +
                  app.utils.prefix +
                  "deregister`"
              );
            } else {
              x.edit(":red_circle: Bruh!");
              const embed = new EmbedBuilder()
                // @ts-ignore
                .setColor(colors.default_orange)
                .setTitle("Whoops!")
                .setDescription(
                  "You are already registered...\nUse `" +
                    app.utils.prefix +
                    "me` to get information on your account!\n\n**To remove yourself, use** `" +
                    app.utils.prefix +
                    "deregister`"
                )
                .setTimestamp();

              msg.channel.send({ embeds: [embed] });
            }
          }, 1000);
        });
      } else {
        msg.channel.send(
          "This command's usage requires an argument 1 of types: `plat,gold,silver,bronze,none`"
        );
      }
    }
  },
};
