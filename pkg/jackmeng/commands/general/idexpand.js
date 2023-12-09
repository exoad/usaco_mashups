const { EmbedBuilder } = require("discord.js");
// @ts-ignore
const qidParser = require("../../fx/fun_QIDParser");
// @ts-ignore
const app = require("../../../../configs/bot.json");
const { Database } = require("secure-db");
// @ts-ignore
const manifest = require("../../../../internal/MANIFEST.json");

module.exports = {
  config: {
    name: "idexpand",
    category: "General",
    description: "Expand a QID into a human readable format",
    usage:
      'A single argument of [qid] is required.\nUse: "' +
      app.utils.prefix +
      'idhelp" for more information on the usage of a QID standard',
    aliases: [`idid`],
  },
  run: async (bot, msg, args) => {
    let id = msg.author.id;
    const bldb = new Database(manifest["blacklisted-registry"]);
    if (bldb.has(id)) {
      return;
    } else {
      if (!args || !args[0]) {
        msg.channel.send(
          '**!!**\nA single argument of [qid] is required.\nUse: "' +
            app.utils.prefix +
            'idhelp" for more information on the usage of a QID standard'
        );
      } else {
        msg.channel.send(
          "**I tried parsing the qid:**\n> **__Input:__** `" +
            args[0] +
            "`\n> **__Output:__** `" +
            qidParser.parse_to_readable(args[0]) +
            "`\n> **Received Tokens:** `|" +
            qidParser.parse_to_arr(args[0]).join("|") +
            "|`"
        );
      }
    }
  },
};
