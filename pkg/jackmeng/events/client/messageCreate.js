const BOT = require("../../../../configs/bot.json");

module.exports = async (bot, msg) => {
  if (
    msg.author.bot ||
    msg.channel.type === "dm" ||
    !msg.content.startsWith(BOT.utils.prefix)
  )
    return;
  const args = msg.content.slice(BOT.utils.prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();
  let cmdFile = bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd));
  if (cmdFile) {
    cmdFile.run(bot, msg, args);
  }
};
