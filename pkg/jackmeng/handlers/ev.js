const { readdirSync } = require("fs");
const BOT = require("../../../configs/bot.json");

module.exports = (bot) => {
  const load = (dirs) => {
    const events = readdirSync("./pkg/jackmeng/events/" + dirs + "/").filter(
      (d) => d.endsWith(".js")
    );
    let count = 0;
    for (let f of events) {
      const evt = require("../events/" + dirs + "/" + f);
      let name = f.split(".")[0];
      bot.on(name, evt.bind(null, bot));
      console.log(count + 1 + ") Event | " + name + " has loaded.");
      count++;
    }
    console.log("Loaded: " + count + " event handlers");
  };
  BOT.internals["events-mocale"].forEach((x) => load(x));
};
