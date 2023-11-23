const { EmbedBuilder } = require("discord.js");
// @ts-ignore
// @ts-ignore
const app = require("../../../../configs/bot.json");
// @ts-ignore

module.exports = {
  config: {
    name: "help",
    category: "Utility",
    description:
      "Find a problem based on selected attributes/arguments in the command.",
    usage:
      "A single argument is required.\nThis argument [ command ], the command you wish to find more information on.\nExample usage: " +
      app.utils.prefix +
      "search me",
    aliases: [`cmd`],
  },
  run: async (bot, msg, args) => {
    let cmd = args[0];
    if (!cmd) {
      function getIndividualCategories() {
        let arr = bot.commands;
        let t = new Map();
        arr.forEach((x) => {
          if (x.config.category != "Developer") {
            let old =
              (!t.get(x.config.category) ? "" : t.get(x.config.category)) +
              x.config.name +
              " ";
            t.set(x.config.category, old);
          }
        });
        let ar = [];
        t.forEach((re, r) => {
          ar.push({
            name: "**" + r + "**",
            value: "```\n" + re + "```",
            inline: true,
          });
        });
        return ar;
      }
      const embed = new EmbedBuilder()
        .setTitle("Detailed Command Pool")
        .setDescription(
          "This command can be used with an argument: `" +
            app.utils.prefix +
            "help [command]` to get information specific for that command. You can also use `" +
            app.utils.prefix +
            "cmdspew` to get a plain list of aliases and commands without detail."
        )
        .addFields(getIndividualCategories());
      msg.channel.send({ embeds: [embed] });
    } else {
      let fcmd = bot.commands.get(cmd);
      if (!fcmd) {
        msg.channel.send(
          "**??**\nThe requested command: `" +
            args[0] +
            "` could not be found in the commands pool.\nYou may consult the Command Spew Pool using: `" +
            app.utils.prefix +
            "cmdspew` to get a list of avaliable commands!"
        );
      } else {
        const embed = new EmbedBuilder()
          .setTitle(fcmd.config.name)
          .addFields(
            {
              name: "Description",
              value: "```\n" + fcmd.config.description + "```",
            },
            {
              name: "Category",
              value: "`" + fcmd.config.category + "`",
            },
            {
              name: "Usage",
              value: "```\n" + fcmd.config.usage + "```",
            },
            {
              name: "Aliases",
              value: "```" + Array.from(fcmd.config.aliases).toString() + "```",
            }
          )
          .setTimestamp()
          .setColor("Random");

        msg.channel.send({ embeds: [embed] });
      }
    }
  },
};
