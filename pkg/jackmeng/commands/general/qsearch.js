const { EmbedBuilder } = require("discord.js");
// @ts-ignore
const colors = require("../../../../configs/colors.json");
// @ts-ignore
const app = require("../../../../configs/bot.json");
const { Database } = require("secure-db");
// @ts-ignore
const manifest = require("../../../../internal/MANIFEST.json");

const qdbmaster = require("../../../../bin/map_master.json");
const qdbslave = require("../../../../bin/map_slave.json");

module.exports = {
  config: {
    name: "qsearch",
    category: "General",
    description: "Find a problem based on the custom ID given to it",
    usage:
      "A specific problem ID as the first argument.\nIf you need help with ID usage, consult the command:\n" +
      app.utils.prefix +
      "idhelp\nfor more information.\n\nExample Usage: " +
      app.utils.prefix +
      "qsearch 2012marsilv3",
    aliases: [`qfind`],
  },
  run: async (bot, msg, args) => {
    const bldb = new Database(manifest["blacklisted-registry"]);
    const db = new Database(manifest["users-registry"]);
    function parseID(qid) {
      if (qid.length != 12) {
        return false;
      }
      return [qdbmaster][qid] == undefined;
    }

    function getProper(qpid) {
      return qdbslave[qdbmaster[qpid]];
    }

    function parseMonth(intMonth) {
      return intMonth == "1"
        ? "January"
        : intMonth == "2"
        ? "February"
        : intMonth == "3"
        ? "March"
        : intMonth == "4"
        ? "US Open"
        : intMonth == "11"
        ? "November"
        : intMonth == "12"
        ? "December"
        : "?";
    }
    if (!args[0]) {
      const failure = new EmbedBuilder()
        .setTitle("Uh oh...This command requires a query!")
        .setDescription(
          "A specific problem ID as the first argument is required.\nIf you need help with ID usage, consult the command:\n" +
            app.utils.prefix +
            "idhelp\nfor more information.\n\nExample Usage: " +
            app.utils.prefix +
            "qsearch 2012marsilv3"
        )
        .setColor("Random");
      msg.channel.send({ embeds: [failure] });
      return;
    }
    let uqid = args[0].toLowerCase();
    msg.channel
      .send("?! Querying your request for: `" + args[0] + "`...")
      .then((m) => {
        if (parseID(uqid)) {
          m.edit(":green_circle: Found!");
          let found = getProper(uqid);
          const embed = new EmbedBuilder()
            .setTitle("Query: " + found.name)
            .setDescription(
              "Contest Q: USACO " +
                found.year +
                " " +
                parseMonth(found.month) +
                " " +
                found.qnum
            )
            .setTimestamp()
            .setURL(found.url)
            .setColor("Random")
            .addFields(
              {
                name: "Division",
                value: found.div.toLowerCase(),
                inline: true,
              },
              {
                name: "URI",
                value: found.url,
                inline: true,
              },
              {
                name: "Contest Problem ID",
                value: qdbmaster[uqid],
              }
            );
          msg.channel.send({ embeds: [embed] });
        } else {
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
        }
        if (db.has(msg.author.id)) {
          db.push(msg.author.id + ".history", args[0]);
        }
      });
  },
};
