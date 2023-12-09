const app = require("../../../../configs/bot.json");
const fx_basics=require("../../fx/fun_Basics");

module.exports = {
  config: {
    name: "search",
    category: "General",
    description: "Search for a problem using either QID or problem name.",
    usage:
      "First argument: 'qid', 'name'\nSecond argument:\nThe related argumented to the first",
    aliases: [``],
  },
  run: async (bot, msg, args) => {
    if (args[0]) {
      if (args[0] === "name") {
        msg.channel.send("name");
        
        return;
      } else if (args[0] === "qid") {
        msg.channel.send("## This command is still being built!");
        return;
      }
    }
    msg.channel.send(
      `This command's usage requires an argument 1 of type: \`qid\` or \`name\` followed by the associated value.\n**Example:** \`\`\`${app.utils.prefix}search name cow camp\`\`\``
    );
  },
};
