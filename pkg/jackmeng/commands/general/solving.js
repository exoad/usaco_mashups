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
    name: "solving",
    category: "General",
    description:
      'Puts a problem on your current solve list. This is a track record of problems you are attempting to solve. This is an optional feature meaning you can use the "solved" command instantly to mark a problem as solved',
    usage:
      "1 Argument is accepted\nThis argument is the unique problem ID\nIf you need help with the unique ID system, use the command:\n\n" +
      app.utils.prefix +
      "idhelp\n\n for more information.\nExample Usage: " +
      app.utils.prefix +
      "solving 2021opnbrnz1",
    aliases: [`trying`],
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
      let qid = args[0];
      let e = db.get(id).others["solving-qs"];
      if (!e) {
        msg.channel.send({
          embeds: [
            new EmbedBuilder()
              .setTitle("You are not solving any problems!")
              .setDescription(
                "Mark a problem you are trying to solve as `solving` to keep track of problems on your list!"
              ),
          ],
        });
        return;
      } else if(qid) {

      } else if (!qid) { // print out the ones the user is trying to solve at the current time
        

      }
    }
  },
};
