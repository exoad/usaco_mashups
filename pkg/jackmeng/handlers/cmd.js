const { readdirSync } = require("fs");
const moment = require("moment");
const BOT = require("../../../configs/bot.json");

module.exports = (bot) => {
  const load = (dirs) => {
    const commands = readdirSync("./pkg/jackmeng/commands/" + dirs).filter(
      (d) => d.endsWith(".js")
    );
    let count = 0;
    for (let f of commands) {
      let cmd = require("../commands/" + dirs + "/" + f);
      bot.commands.set(cmd.config.name, cmd);
      if (cmd.config.aliases) {
        cmd.config.aliases.forEach((a) => bot.aliases.set(a, cmd.config.name));
      }
      console.log(
        count +
          1 +
          ") Command | " +
          cmd.config.name +
          " has loaded" +
          " | Category: " +
          cmd.config.category
      );
      count++;
    }
    console.log("Loaded: " + count + " commands");
  };
  BOT.internals["commands-mocale"].forEach((x) => load(x));
};
