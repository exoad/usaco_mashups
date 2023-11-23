const { NodeHtmlMarkdown } = require("node-html-markdown");
const { EmbedBuilder } = require("discord.js");
// @ts-ignore
// @ts-ignore
const { Database } = require("secure-db");
// @ts-ignore
const manifest = require("../../../../internal/MANIFEST.json");
const { schedule } = require("../../../../bin/usaco.json");

module.exports = {
  config: {
    name: "contest",
    category: "General",
    description: "Get the latest schedule posted on usaco.org",
    usage: "No argument accepted",
    aliases: [`contests`],
  },
  run: async (_, msg, __) => {
    let id = msg.author.id;
    const bldb = new Database(manifest["blacklisted-registry"]);
    if (bldb.has(id)) {
      return;
    } else {
      const embed = new EmbedBuilder()
        .setTitle("USACO Contest Schedule")
        .setDescription(
          !schedule
            ? "Unable to retrieve request"
            : NodeHtmlMarkdown.translate(schedule)
        )
        .setColor("Random");
      msg.channel.send({ embeds: [embed] });
    }
  },
};
