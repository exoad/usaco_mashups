const BOT = require("../../../../configs/bot.json");
const bot_profile = require("../../fx_db/fun_BotGeneric");
const talkedRecently_userIDS = new Set();
const manifest = require("../../../../internal/MANIFEST.json");

module.exports = async (bot, msg) => {
  if (
    msg.author.bot ||
    msg.channel.type === "dm" ||
    !msg.content.startsWith(BOT.utils.prefix)
  )
    return;
  if (
    BOT.internals["use-command-timeout"] &&
    talkedRecently_userIDS.has(msg.author.id)
  )
    msg.channel.send(BOT.internals["command-timeout-message"]);
  else {
    const args = msg.content.slice(BOT.utils.prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    let cmdFile =
      bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd));
    if (cmdFile) {
      cmdFile.run(bot, msg, args);
      bot_profile.interaction_increment();
      if (BOT.internals["use-command-timeout"] && msg.author.id != manifest.MASTER_ID) {
        talkedRecently_userIDS.add(msg.author.id);
        setTimeout(
          () => talkedRecently_userIDS.delete(msg.author.id),
          BOT.internals["command-timeout-ms"]
        );
      }
    }
  }
};
