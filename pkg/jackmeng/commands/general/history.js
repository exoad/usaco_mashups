const { EmbedBuilder, AttachmentBuilder } = require("discord.js");
// @ts-ignore
const colors = require("../../../../configs/colors.json");
// @ts-ignore
const app = require("../../../../configs/bot.json");
const { Database } = require("secure-db");
// @ts-ignore
const manifest = require("../../../../internal/MANIFEST.json");

module.exports = {
  config: {
    name: "history",
    category: "Registry",
    description:
      "Get certain data surrounding your usage with this bot.\nThis command does not provide full telemetry collected.\nMake sure to use this command with caution if there are certain things you don't want others to see.",
    usage:
      "1 Argument Accepted: [history_type]\n\nhistory_type -> all,solved,queries,solves\n\nExample Usage: " +
      app.utils.prefix +
      "history all",
    aliases: [`hist`],
  },
  run: async (bot, msg, args) => {
    const bldb = new Database(manifest["blacklisted-registry"]);
    const db = new Database(manifest["users-registry"]);
    if (!bldb.has(msg.author.id) || bldb.get(msg.author.id).level == "1") {
      if (args[0] != "all" && args[0] != "solved" && args[0] != "queries") {
        msg.channel.send(
          "**?!**\nA specific argument is required to run this command: [history_type]\nCan be of types: `all` `solves` `queries`\n\n***USE THIS COMMAND WITH CAUTION***"
        );
      } else {
        if (db.has(msg.author.id)) {
          msg.channel.send(":wave: Surfing the registry...").then((m) => {
            function better_str(funArr) {
              if (funArr.length == 0) return "[EMPTY]";
              let str = "";
              funArr.forEach((m) => {
                str += m.toString() + "\n";
              });
              return str;
            }
            function rndstr(length) {
              let result = "";
              let characters =
                "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
              let charactersLength = characters.length;
              for (let i = 0; i < length; i++) {
                result += characters.charAt(
                  Math.floor(Math.random() * charactersLength)
                );
              }
              return result;
            }

            let found = db.get(msg.author.id);
            let query =
              "RESULTS FOR: " + msg.author.username + "#" + msg.author.discriminator + " " +
              msg.author.id +
              "\n\n" +
              (args[0] == "all"
                ? "==SOLVED==\n" +
                  better_str(found.solvedqs) +
                  "\n==QUERIES==\n" +
                  better_str(found.history) +
                  "\n==OTHERS[?]==\n" +
                  better_str(found.others)
                : args[0] == "queries"
                ? "==QUERIES==\n" + better_str(found.history)
                : args[0] == "solved" || args[0] == "solves"
                ? "==SOLVED==\n" + better_str(found.solvedqs)
                : "UNKNOWN");
            m.edit("**:D**\nQueried your history...");
            const hist = new AttachmentBuilder(Buffer.from(query))
              .setDescription(
                "History results for: " +
                  msg.author.username +
                  "#" +
                  msg.author.discriminator
              )
              .setName(rndstr(10) + ".log");
            msg.channel.send({ files: [hist] });
          });
        } else {
          msg.channel.send(
            "**?!**\nThis command requires you to be registered to the bot's registry.\nYou can do this by using the command: `" +
              app.utils.prefix +
              "register [division=plat,gold,silver,bronze,camp,ioi,none]`"
          );
        }
      }
    }
  },
};
