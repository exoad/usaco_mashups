const { EmbedBuilder, Embed } = require("discord.js");
// @ts-ignore
const colors = require("../../../../configs/colors.json");
// @ts-ignore
const app = require("../../../../configs/bot.json");
const { Database } = require("secure-db");
// @ts-ignore
const manifest = require("../../../../internal/MANIFEST.json");

module.exports = {
  config: {
    name: "me",
    category: "General",
    description: "Get your account information",
    usage: "",
    aliases: [`myaccount`],
  },
  run: async (bot, msg, args) => {
    const bldb = new Database(manifest["blacklisted-registry"]);
    if (!bldb.has(msg.author.id) || bldb.get(msg.author.id).level == "1") {
      msg.channel.send(":ocean: Surfing the registry...").then((m) => {
        function parseDiv(intDiv) {
          return intDiv == 1
            ? "Platinum"
            : intDiv == 2
            ? "Gold"
            : intDiv == 3
            ? "Silver"
            : intDiv == 4
            ? "Bronze"
            : intDiv == 5
            ? "Camp/IOI"
            : "None";
        }
        let id = msg.author.id;
        const db = new Database(manifest["users-registry"]);
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
                value: "[" + parseDiv(usr.division) + "]",
                inline: true,
              },
              {
                name: "Solved Qs",
                value: !usr.solved ? "0" : usr.solved,
                inline: true,
              },
              {
                name: "Registration",
                value: !usr.regtime ? "Unknown" : usr.regtime,
                inline: true,
              }
            );
          m.edit("Telemetry found!");
          msg.channel.send({ embeds: [embed] });
        }
      });
    }
  },
};
