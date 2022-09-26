const {
  Client,
  GatewayIntentBits,
  Collection,
  IntentsBitField,
} = require("discord.js");
/// BEGIN STANDARD CONFIGS ///
const MANIFEST = require("../../internal/MANIFEST.json");
const MESSAGES = require("../../configs/cli-messages.json");
const SERVER = require("../../configs/server.json");
const BOT = require("../../configs/bot.json");
/// END STANDARD CONFIGS ///
const express = require("express");
const app = express();
const port = SERVER["express-port"];
const bot = new Client({
  intents: [IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMessages, IntentsBitField.Flags.MessageContent],
});

// @ts-ignore
app.get("/", (r, res) => res.send(MESSAGES["api-on-ready"]));
app.listen(port, () => console.log("Port: " + port));

["aliases", "commands", "description", "category"].forEach(
  (x) => (bot[x] = new Collection())
);
BOT.internals["handlers-mocale"].forEach((x) =>
  require("./handlers/" + x)(bot)
);

bot.setMaxListeners(BOT.internals["listeners-max"]);
bot.once("ready", () => {
  console.log(MESSAGES["api-on-ready"]);
  console.log(
    "Entered as: " + bot.user?.username + "#" + bot.user?.discriminator
  );
});

// @ts-ignore
bot.on("messageCreate", async (msg) => {
  if (
    // @ts-ignore
    msg.content == `<@${bot.user.id}>` ||
    // @ts-ignore
    msg.content == `<@!${bot.user.id}>`
  )
    msg.channel.send(`My prefix is: \`${BOT.utils.prefix}\``);
  if (msg.content === "1984") {
    msg.channel.send(
      "read and be inspired by big brother here: https://rauterberg.employee.id.tue.nl/lecturenotes/DDM110%20CAS/Orwell-1949%201984.pdf"
    );
  }
});

bot.login(MANIFEST.TOKEN);
