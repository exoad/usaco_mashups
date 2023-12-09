const { EmbedBuilder } = require("discord.js");
const qidParser = require("../../fx/fun_QIDParser");
// @ts-ignore
const colors = require("../../../../configs/colors.json");
// @ts-ignore
const app = require("../../../../configs/bot.json");
const { Database } = require("secure-db");
// @ts-ignore
const manifest = require("../../../../internal/MANIFEST.json");
const qdbmaster = require("../../../../bin/map_master.json");
const qdbslave = require("../../../../bin/map_slave.json");
const usrParser = require("../../fx_db/fun_UserGeneric");
module.exports = {
  config: {
    name: "solved",
    category: "General",
    description: "Adds a solved problem to your solved list!",
    usage:
      "1 Argument is accepted\nThis argument is the unique problem ID\nIf you need help with the unique ID system, use the command:\n\n" +
      app.utils.prefix +
      "idhelp\n\n for more information.\nExample Usage: " +
      app.utils.prefix +
      "solved 2021opnbrnz1",
    aliases: [`ac`],
  },
  run: async (_bot, msg, args) => {
    const bldb = new Database(manifest["blacklisted-registry"]);
    const db = new Database(manifest["users-registry"]);
    if (!bldb.has(msg.author.id) && db.has(msg.author.id) && args[0]) {
      msg.channel.send(":hedgehog: Validating your solve...").then((m) => {
        function parseID(qid) {
          if (qid.length != 12) {
            return false;
          }
          return [qdbmaster][qid] == undefined;
        }
        function getProper(qpid) {
          return qdbslave[qdbmaster[qpid]];
        }
        let uqid = args[0].toLowerCase();

        if (!parseID(uqid)) {
          m.edit(
            "**??**\nFailed to query an id for " +
              args[0] +
              "\nTried toLowerCase: " +
              uqid +
              "\nExpected Length: 12 | Got:  " +
              uqid.length +
              "\n\n> If you have trouble with using this command use: `" +
              app.utils.prefix +
              "idhelp` for more information on the ID system"
          );
        } else if (db.get(msg.author.id + ".solvedqs").includes(args[0])) {
          m.edit(
            "**??**\nIt seems you have already solved this problem:\n> *" +
              qidParser.parse_to_readable(args[0]) +
              "*"
          );
          return;
        } else {
          db.add(msg.author.id + ".solved", 1);
          db.push(msg.author.id + ".solvedqs", uqid);
          m.edit("**:D**\nSuccessfully noted that you solved:");
          let found = getProper(uqid);
          const embed = new EmbedBuilder()
            .setTitle(
              "Q: " +
                found.name +
                " (" +
                qidParser.parse_to_readable(args[0]) +
                ")"
            )
            .setDescription(found.url)
            // @ts-ignore
            .setColor(colors.default_green);
          msg.channel.send({ embeds: [embed] });
        }
      });
    } else if (bldb.has(msg.author.id)) {
      return;
    } else if (!db.has(msg.author.id)) {
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
    }
  },
};
