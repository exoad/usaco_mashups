const discord = require("discord.js");

module.exports = {
  config: {
    name: "echo",
    category: "Fun",
    description: "Echos / repeats what you said",
    usage: "args : [ anything after ]",
    aliases: ["mock", "say"],
  },
  run: async (bot, msg, args) => {
    let rety = msg.content.split(" ").slice(1);
    msg.channel.send(rety.join(" "));
  },
};
