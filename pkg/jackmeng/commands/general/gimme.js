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

module.exports = {
  config: {
    name: "gimme",
    category: "General",
    description:
      'Recommends you a specific problem. This command compared to "rndq" allows more search parameters.\nHowever this command requires a clean record with the bot with no blacklist levelling.',
    usage:
      "If no arguments are provided, a q of best fit will be selected. This command can take a set varargs of valid arguments (meaning you can string arguments separated by a space together to form a specific request) of the following types:\nplat,gold,silver,bronze,q3,q1,q2,q4,dec,nov,jan,feb,mar,opn,nopast,[year]\n\nArgument Description:\n - plat -> Recommend Platinum Qs\n - gold -> Recommend Gold Qs\n - silver -> Recommend Silver Qs\n - bronze -> Recommend Bronze Qs\n - q3,q2,q1,q4 -> A problem order in the contest\n - dec,nov,feb,jan,mar,opn -> A specific month to pull a Q from\n - [year] -> A specific year to pull from\n - nopast -> Will not recommend you Qs that you have already solved\n\nExample Usage: " +
      app.utils.prefix +
      "gimme gold",
    aliases: [`recommend`, `rec`],
  },
  run: async (bot, msg, args) => {
    let id = msg.author.id;
    const bldb = new Database(manifest["blacklisted-registry"]);
    const db = new Database(manifest["users-registry"]);
    if (bldb.has(id) || !db.has(id)) {
      msg.channel.send(
        "**!!**\nThere was an issue with retrieving your registry\nThis could be narrowed down to the following:\n>  1. You don't have an account | Use: `" +
          app.utils.prefix +
          "register [division=plat,gold,silver,bronze,none]`\n>   2. You have been blacklisted from the bot"
      );
    } else {
      if (args.length == 0) {
        let div = db.get(id).division;

      } else {

      }
    }
  },
};
