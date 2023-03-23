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
    name: "delist",
    category: "Registry",
    description: "Removes your accounts from the bot's registry. :(",
    usage: app.strings.arguments_null,
    aliases: [`deregister`],
  },
  run: async (bot, msg, args) => {
    const bldb = new Database(manifest["blacklisted-registry"]);
    if (!bldb.has(msg.author.id) || bldb.get(msg.author.id).level == "1") {
      const mfilter = (trrr) => trrr.author.id === msg.author.id;
      msg.channel
        .send(
          "**Are you sure?**\nDelisting your account will delete everything regarding your account from the registry.\nThis process is irreversible...\nType y/Y/yes/n/N/no\nTime limit: 5 seconds"
        )
        .then(
          await msg.channel
            .awaitMessages({
              filter: mfilter,
              max: 1,
              time: 5_000,
              errors: ["time"],
            })
            .then((m) => {
              m = m.first();
              if (
                m.content.toUpperCase() == "YES" ||
                m.content.toUpperCase() == "Y"
              ) {
                m.channel
                  .send("Clearing your section of the registry...bye bye...")
                  .then((xx) => {
                    const db = new Database(manifest["users-registry"]);
                    if (db.has(msg.author.id)) {
                      db.delete(msg.author.id);
                      xx.edit(
                        "**OK**\nDeleted user: " +
                          msg.author.username +
                          " [" +
                          msg.author.id +
                          "] from the registry"
                      );
                    } else {
                      xx.edit(
                        "**??**\nFailed to find user: " +
                          msg.author.username +
                          " with ID: " +
                          msg.author.id +
                          " in the registry...\nProcess cancelled."
                      );
                    }
                  });
              } else if (
                m.content.toUpperCase() == "NO" ||
                m.content.toUpperCase() == "N"
              ) {
                m.channel.send(
                  "**Deletion Invalidated**\nUser invalidated deletion process!"
                );
              } else {
                m.channel.send("**Response Invalid.**\nTry again later...");
              }
            })
            .catch(() => {
              msg.channel.send(
                "**Request to delist user:**\n" +
                  msg.author.username +
                  "\nTIMED OUT, try again later..."
              );
            })
        );
    }
  },
};
