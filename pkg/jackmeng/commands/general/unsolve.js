/**
 */

const { EmbedBuilder } = require("discord.js");
const qidVerifier = require("../../fx/fun_QIDVerifier");
const qidParser = require("../../fx/fun_QIDParser");
const BasicsManip = require("../../fx/fun_Basics");
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
    name: "unsolve",
    category: "General",
    description:
      "Remove a solved problem from your solved list (if it exists).",
    usage:
      "1 Argument is accepted\nThis argument is the unique problem ID\nIf you need help with the unique ID system, use the command:\n\n" +
      app.utils.prefix +
      "idhelp\n\n for more information.\nExample Usage: " +
      app.utils.prefix +
      "solved 2021opnbrnz1",
    aliases: [`unac`],
  },
  run: async (bot, msg, args) => {
    let id = msg.author.id;
    const bldb = new Database(manifest["blacklisted-registry"]);
    if (bldb.has(id)) {
      return;
    } else {
      const db = new Database(manifest["users-registry"]);
      if (!db.has(msg.author.id)) {
        msg.channel.send(
          "**?!**\nThis command requires you to be registered to the bot's registry.\nYou can do this by using the command: `" +
            app.utils.prefix +
            "register [division=plat,gold,silver,bronze,camp,ioi,none]`"
        );
      } else if (!args[0]) {
        msg.channel.send(
          "**??**\nThis command requires 1 argument: [qid].\nYou can find more information on the ID system using the command: `" +
            app.utils.prefix +
            "idhelp`"
        );
      } else {
        let qid = args[0];
        if (qidVerifier.verify_qid(qid)) {
          let s_q = db.get(msg.author.id).solvedqs;
          if (!s_q || s_q.indexOf(qid.toLowerCase()) < 0) {
            msg.channel.send(
              "**!!**\nIt seems you have not solved: " +
                qidParser.parse_to_readable(args[0])
            );
          } else {
            s_q = BasicsManip.arr_rm(s_q, args[0]);
            db.set(msg.author.id + ".solvedqs", s_q);
            msg.channel.send(
              "**OK**\nSuccessfully removed " +
                qidParser.parse_to_readable(args[0]) +
                " from your solved list!"
            );
          }
        } else {
          msg.channel.send(
            "**??**\nThis command requires a valid [qid]. Which you did not supply. Check below for more information: `" +
              app.utils.prefix +
              "idhelp`"
          );
        }
      }
    }
  },
};
