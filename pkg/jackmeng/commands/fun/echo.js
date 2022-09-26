const discord = require("discord.js");

module.exports = {
  config: {
    name: "echo",
    category: "Fun",
    description: "Echos / repeats what you said",
    aliases: ["mock", "say"],
  },
  run: async (bot, msg, args) => {
    msg.channel.send("Amgous");
    let rety = msg.content.split(" ").slice(1);
    console.log("Amogus");
    msg.channel.send(rety.join(" "));
  },
};
