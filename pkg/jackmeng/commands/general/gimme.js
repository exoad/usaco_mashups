const { EmbedBuilder, Embed } = require("discord.js");
// @ts-ignore
const colors = require("../../../../configs/colors.json");
// @ts-ignore
const app = require("../../../../configs/bot.json");
const { Database } = require("secure-db");
// @ts-ignore
const manifest = require("../../../../internal/MANIFEST.json");
const api = require("../../fx/fun_StaticAPI");
const qidParser = require("../../fx/fun_QIDParser");
const usrParser = require("../../fx_db/fun_UserGeneric");
const { parseMonth } = require("../../fx/fun_Basics");

module.exports = {
  config: {
    name: "gimme",
    category: "General",
    description:
      'Recommends you a specific problem. This command compared to "rndq" allows more search parameters.\nHowever this command requires a clean record with the bot with no blacklist levelling.',
    usage:
      "If no arguments are provided, a q of best fit will be selected. This command can take a set varargs of valid arguments (meaning you can string arguments separated by a space together to form a specific request) of the following types:\nplat,gold,silver,bronze,q3,q1,q2,q4,dec,nov,jan,feb,mar,opn,nopast,[year]\n\nArgument Description:\n - plat -> Recommend Platinum Qs\n - gold -> Recommend Gold Qs\n - silver -> Recommend Silver Qs\n - bronze -> Recommend Bronze Qs\n - q3,q2,q1,q4 -> A problem order in the contest\n - dec,nov,feb,jan,mar,opn -> A specific month to pull a Q from\n - [year] -> A specific year to pull from\n - nopast -> Will not recommend you Qs that you have already solved\n\nExample Usage: " +
      app.utils.prefix +
      "gimme gold",
    aliases: [`recommend`, `rec`],
  },
  run: async (bot, msg, args) => {
    let id = msg.author.id;
    const bldb = new Database(manifest["blacklisted-registry"]);
    const db = new Database(manifest["users-registry"]);
    if (bldb.has(id) || !db.has(id)) {
      msg.channel.send(
        "**!!**\nThere was an issue with retrieving your registry\nThis could be narrowed down to the following:\n>  1. You don't have an account | Use: `" +
          app.utils.prefix +
          "register [division=plat,gold,silver,bronze,none]`\n>   2. You have been blacklisted from the bot"
      );
    } else {
      let usrDiv = db.get(msg.author.id).division;
      let type = args[0];

      msg.channel
        .send(":hedgehog: Performing an exhaustive request...")
        .then(async (m) => {
          switch (type) {
            case type
              .toLowerCase()
              .indexOf([
                "gold",
                "silver",
                "bronze",
                "platinum",
                "plat",
                "silv",
                "brnz",
              ]) != -1:
              const re = api.rnd_q_by_div_qid(api.divint_to_divtype(usrDiv));
              const rt = new EmbedBuilder()
                .setTitle("RNDQ: " + api.qid_to_parseable(re).name)
                .setURL(api.qid_to_parseable(re).url)
                .setDescription(
                  "USACO - " +
                    api.qid_to_parseable(re).year +
                    " | " +
                    parseMonth(api.qid_to_parseable(re).month) +
                    " [" +
                    api.qid_to_parseable(re).month +
                    "]"
                )
                .addFields(
                  {
                    name: "Division",
                    value: "" + api.qid_to_parseable(re).div,
                    inline: true,
                  },
                  {
                    name: "Problem #",
                    value: "" + api.qid_to_parseable(re).qnum,
                    inline: true,
                  },
                  {
                    name: "Link",
                    value: "" + api.qid_to_parseable(re).url,
                    inline: true,
                  }
                );
              m.edit(
                "**Here is a recommended problem for you (+0 => delta_division):**"
              );
              msg.channel.send({ embeds: [rt] });
              break;
            case api.divint_to_divtype(usrDiv) ==
              api.calc_division(api.divint_to_divtype(usrDiv), type) ||
              !type ||
              args.length == 0:
              let q_rec_qid = api.rnd_q_by_div_qid(
                api.divint_to_divtype(usrDiv)
              );
              let exhaust = 0;
              while (
                usrParser.user_solved(q_rec_qid, msg.author.id) &&
                exhaust <= 30
              ) {
                if (
                  exhaust > 30 ||
                  !usrParser.user_solved(q_rec_qid, msg.author.id)
                )
                  break;
                q_rec_qid = api.rnd_q_by_div_qid(api.divint_to_divtype(usrDiv));
                exhaust++;
              }
              if (exhaust > 30) {
                m.edit(
                  "**Exhaustive Search**\nFailed to recommend a problem you have not solved!\nYou can try this command with an argument of the division name to give you a specific division\n\n**Anyways,** here is a random problem:"
                );
                const r = api.rnd_q();
                const e = new EmbedBuilder()
                  .setTitle("RNDQ: " + r.name)
                  .setURL(r.url)
                  .setDescription(
                    "USACO - " +
                      r.year +
                      " | " +
                      parseMonth(r.month) +
                      " [" +
                      r.month +
                      "]"
                  )
                  .addFields(
                    {
                      name: "Division",
                      value: "" + r.div,
                      inline: true,
                    },
                    {
                      name: "Problem #",
                      value: "" + r.qnum,
                      inline: true,
                    },
                    {
                      name: "Link",
                      value: "" + r.url,
                      inline: true,
                    }
                  );
                msg.channel.send({ embeds: [e] });
              } else {
                m.edit(
                  "**Here is a recommended problem for you (+0 => delta_divison):**"
                );
                const e = new EmbedBuilder()
                  .setTitle("RNDQ: " + api.qid_to_parseable(q_rec_qid).name)
                  .setURL(api.qid_to_parseable(q_rec_qid).url)
                  .setDescription(
                    "USACO - " +
                      api.qid_to_parseable(q_rec_qid).year +
                      " | " +
                      parseMonth(api.qid_to_parseable(q_rec_qid).month) +
                      " [" +
                      api.qid_to_parseable(q_rec_qid).month +
                      "]"
                  )
                  .addFields(
                    {
                      name: "Division",
                      value: "" + api.qid_to_parseable(q_rec_qid).div,
                      inline: true,
                    },
                    {
                      name: "Problem #",
                      value: "" + api.qid_to_parseable(q_rec_qid).qnum,
                      inline: true,
                    },
                    {
                      name: "Link",
                      value: "" + api.qid_to_parseable(q_rec_qid).url,
                      inline: true,
                    }
                  );
                msg.channel.send({ embeds: [e] });
              }
              break;
            default:
              m.edit(
                "**Here is a recommended problem for you (" +
                  type +
                  " => delta_division):**"
              );
              const t = api.rnd_q_by_div_qid(
                api.calc_division(
                  api.type_2_numeric(api.divint_to_divtype(usrDiv)),
                  type
                )
              );
              const e = new EmbedBuilder()
                .setTitle("RNDQ: " + api.qid_to_parseable(t).name)
                .setURL(api.qid_to_parseable(t).url)
                .setDescription(
                  "USACO - " +
                    api.qid_to_parseable(t).year +
                    " | " +
                    parseMonth(api.qid_to_parseable(t).month) +
                    " [" +
                    api.qid_to_parseable(t).month +
                    "]"
                )
                .addFields(
                  {
                    name: "Division",
                    value: "" + api.qid_to_parseable(t).div,
                    inline: true,
                  },
                  {
                    name: "Problem #",
                    value: "" + api.qid_to_parseable(t).qnum,
                    inline: true,
                  },
                  {
                    name: "Link",
                    value: "" + api.qid_to_parseable(t).url,
                    inline: true,
                  }
                );
              msg.channel.send({ embeds: [e] });
              break;
          }
        });
    }
  },
};
