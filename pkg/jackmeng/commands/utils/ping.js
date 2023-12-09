require("discord.js");
// @ts-ignore
// @ts-ignore
const app = require("../../../../configs/bot.json");
const ping = require("latenz");

module.exports = {
  config: {
    name: "ping",
    category: "Utility",
    description: "Perform a latency test",
    usage: app.strings.arguments_null,
    aliases: [],
  },
  run: async (bot, msg) => {
    msg.channel.send("Playing ping pong... :ping_pong:").then((m) => {
      let client = Date.now() - msg.createdTimestamp;
      let api = Math.round(bot.ws.ping);
      m.edit(
        (client <= app.internals.green_ping
          ? ":green_circle:"
          : client > app.internals.green_ping &&
            client <= app.internals.yellow_ping
          ? ":yellow_circle:"
          : ":red_circle:") +
          " **Client Latency:** " +
          client +
          "ms" +
          "\n" +
          (api <= app.internals.green_ping
            ? ":green_circle:"
            : api > app.internals.green_ping && api <= app.internals.yellow_ping
            ? ":yellow_circle:"
            : ":red_circle:") +
          " **API Latency:** " +
          api +
          "ms\n"
      );
      msg.channel
        .send("Playing ping pong with Bessie... :ping_pong:")
        .then((x) => {
          const l = new ping();
          l.measure("usaco.org").then((xr) => {
            let result = parseInt(xr[0].time);
            let response = parseInt(xr[2].time);
            x.edit(
              (result <= app.internals.green_ping
                ? ":green_circle:"
                : result > app.internals.green_ping &&
                  result <= app.internals.yellow_ping
                ? ":yellow_circle:"
                : ":red_circle:") +
                " **USACO Gateway [DNS_LOOKUP]:** " +
                result +
                "ms\n" +
                (response <= app.internals.green_ping
                  ? ":green_circle:"
                  : response > app.internals.green_ping &&
                    response <= app.internals.yellow_ping
                  ? ":yellow_circle:"
                  : ":red_circle:") +
                " **USACO Gateway [HOST_RESPONSE]:** " +
                response +
                "ms"
            );
          });
        });
    });
  },
};
