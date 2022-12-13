const { EmbedBuilder, Embed, parseEmoji } = require("discord.js");
// @ts-ignore
const colors = require("../../../../configs/colors.json");
// @ts-ignore
const app = require("../../../../configs/bot.json");
const { Database } = require("secure-db");
// @ts-ignore
const manifest = require("../../../../internal/MANIFEST.json");
const {parseDiv} = require("../../fx/fun_QIDParser");
module.exports = {
  config: {
    name: "me",
    category: "Registry",
    description: "Get your account information",
    usage:
      "Optional Arguments\n1 -> setdiv = set division\n2 -> A division to set yourself to {plat,gold,silver,bronze,ioi,camp,none}",
    aliases: [`who`],
  },
  run: async (bot, msg, args) => {
    const bldb = new Database(manifest["blacklisted-registry"]);
    const db = new Database(manifest["users-registry"]);
    if (!bldb.has(msg.author.id) || bldb.get(msg.author.id).level == "1") {
      function matches_set_manifest(stringArgs0, dealerArr) {
        stringArgs0 = stringArgs0.toLowerCase();
        return dealerArr.includes(stringArgs0);
      }


      function pDiv(divStr) {
        divStr = divStr.toLowerCase();
        return divStr.startsWith("plat")
          ? 1
          : divStr.startsWith("gold")
          ? 2
          : divStr.startsWith("silv")
          ? 3
          : divStr.startsWith("bro")
          ? 4
          : divStr.includes("camp") || divStr.includes("ioi")
          ? 5
          : -1;
      }

      function cross_x() {
        msg.channel.send(":ocean: Surfing the registry...").then((m) => {
          function parseDivEmoji(intDiv) {
            return intDiv == 1
              ? manifest["platinum-emoji"]
              : intDiv == 2
              ? manifest["gold-emoji"]
              : intDiv == 3
              ? manifest["silver-emoji"]
              : intDiv == 4
              ? manifest["bronze-emoji"]
              : manifest["unknown-div-emoji"];
          }
          let id = msg.author.id;
          if (!db.has(id)) {
            m.edit(
              ":red_circle: **BRUH!**\nYou are not a registered user!\nUse `" +
                app.utils.prefix +
                "register [division=plat,gold,silver,bronze,camp,ioi,none]` to register yourself!"
            );
          } else {
            let usr = db.get(id);
            const embed = new EmbedBuilder()
              .setTitle("Telemetry For: " + msg.author.username)
              .addFields(
                {
                  name: "Division",
                  value:
                    parseDivEmoji(usr.division) +
                    " [" +
                    parseDiv(usr.division) +
                    "]",
                  inline: true,
                },
                {
                  name: "Solved Qs",
                  value: "```" + usr.solved + "```",
                  inline: true,
                },
                {
                  name: "Registration Time",
                  value: "```" + usr.regtime + "```",
                  inline: true,
                }
              );
            m.edit("Telemetry found!");
            msg.channel.send({ embeds: [embed] });
          }
        });
      }
    }
    if (!args[0]) {
      cross_x();
    } else if (matches_set_manifest(args[0], app.commands_maxims.me_arg0)) {
      let cmd = args[0];
      if (
        args[1] &&
        matches_set_manifest(args[1], app.commands_maxims.me_arg1)
      ) {
        if (db.has(msg.author.id)) {
          db.set(msg.author.id + ".division", pDiv(args[1]));
          msg.channel.send(
            "**OK**\nSet user: " +
              msg.author.username +
              " to division: **" +
              parseDiv(pDiv(args[1])) +
              "**"
          );
        } else {
          msg.channel.send(
            ":red_circle: **BRUH!**\nYou are not a registered user!\nUse `" +
              app.utils.prefix +
              "register [division=plat,gold,silver,bronze,camp,ioi,none]` to register yourself!"
          );
        }
      } else {
        msg.channel.send(
          "Failed to [ " +
            cmd +
            " ]\nThis command requires an argument after of: ```" +
            app.commands_maxims.me_arg1 +
            "```"
        );
      }
    }
  },
};
