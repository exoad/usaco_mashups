// @ts-nocheck
const { EmbedBuilder } = require("discord.js");
const colors = require("../../../../configs/colors.json");
const internals = require("../../../../internal/MANIFEST.json");
const app = require("../../../../configs/bot.json");
const sys = require("systeminformation");
const discordjs = require("../../fx/fun_DiscordJS");
const mybot = require("../../fx_db/fun_BotGeneric");
module.exports = {
  config: {
    name: "botinfo",
    category: "Utility",
    description: "Get information regarding the bot itself",
    usage: app.strings.arguments_null,
    aliases: [`bot`],
  },
  run: async (bot, msg, _args) => {
    const e = discordjs.uptime(bot);
    const embed = new EmbedBuilder()
      .setColor(`${colors.default_orange}`)
      .setTitle("Bot Information")
      .setDescription("This bot is created by exoad#9292")
      .addFields(
        {
          name: "Source Code Repository",
          value: "[GitHub Mirror](https://github.com/exoad/usaco-mashup-bot)",
          inline: true,
        },
        {
          name: "Support Discord Server",
          value: "[Click Here](https://discord.gg/PbJQRT9zQ8)\n\n`PbJQRT9zQ8`",
          inline: true,
        },
        {
          name: "Uptime",
          value: `${e.days} days\n${e.hours} hours\n${e.minutes} minutes\n${e.seconds} seconds`,
          inline: true,
        },
        {
          name: "Database Schema Provider",
          value: "`" + internals.database_backed_schema_v + "`",
          inline: true,
        },
        {
          name: "Service Hosting Information",
          value:
            "**OS** `" +
            (await sys.osInfo()).platform +
            ":" +
            (await sys.osInfo()).distro +
            "-" +
            (await sys.osInfo()).release +
            " | " +
            (await sys.osInfo()).kernel +
            " | " +
            (await sys.osInfo()).build +
            "`\n**Network** `" +
            (await sys.networkInterfaceDefault()) +
            "`\n**Hostle Timezone** `" +
            sys.time().timezoneName +
            "`",
          inline: true,
        },
        {
          name: "Bot Telemetry",
          value:
            "**Interactions** `" +
            mybot.interactions() +
            "`\n**Accepted Guilds** `" +
            bot.guilds.cache.size +
            "`\n**Global Cooldown**`" +
            app.internals["use-command-timeout"] +
            "`",
        }
      );

    msg.channel.send({ embeds: [embed] });
  },
};
