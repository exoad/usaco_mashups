const {
  Client,
  GatewayIntentBits,
  Collection,
  IntentsBitField,
  cleanContent,
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
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

// @ts-ignore
app.get("/", (r, res) => res.send(MESSAGES["api-on-ready"]));
// @ts-ignore
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
    msg.channel.send(
      `My prefix is: \`${BOT.utils.prefix}\`\nUse \`${BOT.utils.prefix}help\` to get commands to use`
    );
  if (msg.content === "1984") {
    msg.channel.send(
      "read and be inspired by big brother here: https://rauterberg.employee.id.tue.nl/lecturenotes/DDM110%20CAS/Orwell-1949%201984.pdf"
    );
  }
  if (msg.author.id == MANIFEST.MASTER_ID) {
    if (msg.content == "kys bot") {
      let curr = new Date().getTime();
      let curr2 = new Date().getTime();
      msg.channel
        .send("**BRUH!**\nGoing down for a restart...")
        .then((m) => {
          m.delete();
          curr = new Date().getTime();
          bot.destroy();
        })
        .then(() => {
          let lt = new Date().getTime();
          bot.login(MANIFEST.TOKEN);
          // @ts-ignore
          msg.channel.send(
            "**OK**\nRestarted In: " +
              (new Date().getTime() - curr2) +
              "ms\nWith Error: " +
              (lt - curr) +
              "ms"
          );
        });
    }
    if (msg.content.startsWith("&emanc")) {
      try {
        let cmd = msg.content.substring(6);

        msg.channel.send("Printed Result:\n```sh\n" + eval(cmd) + "```");
      } catch (err) {
        console.log("Failed eval(): => " + err);
        msg.channel.send("**Eval() failed with:**\n```" + err + "```");
        return;
      }
    }



  }
});

bot.login(MANIFEST.TOKEN);
