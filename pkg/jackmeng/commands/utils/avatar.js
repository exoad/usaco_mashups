// @ts-nocheck
const { EmbedBuilder } = require("discord.js");
const colors = require("../../../../configs/colors.json");

module.exports = {
  config: {
    name: "avatar",
    category: "Utility",
    description: "Get the avatar of someone",
    usage: "1 arg(s) : [@user]",
    aliases: [``],
  },
  run: async (bot, msg, args) => {
    let avatar = msg.mentions.users.size
      ? msg.mentions.users
          .first()
          .avatarURL({ format: "png", dynamic: true, size: 1024 })
      : msg.author.avatarURL({
          format: "png",
          dynamic: true,
        });
    if (msg.mentions.users.size > 0) {
      const embed = new EmbedBuilder()
        .setColor(colors.default_green)
        .setTitle(
          `:white_check_mark: ${
            msg.mentions.users.first().username
          }\'s Profile Picture:`
        )
        .setImage(`${avatar}`);
      msg.channel.send({ embeds: [embed] });
    } else {
      const embed = new EmbedBuilder()
        .setColor(colors.default_green)
        .setTitle(
          `:white_check_mark: ${msg.author.username}\'s Profile Picture:`
        )
        .setImage(`${avatar}`);
      msg.channel.send({ embeds: [embed] });
    }
  },
};
