const { Database } = require("secure-db");
const manifest = require("../../../internal/MANIFEST.json");

const bot_db = new Database(manifest["bot-telemetry-registry"]);

function validate() {
  if (!bot_db.has("bot")) {
    bot_db.set("bot", {});
  }
}

function interaction_increment() {
  validate();
  bot_db.set(
    "bot.interactions_counter",
    bot_db.get("bot.interactions_counter") + 1
  );
}

function interactions() {
  validate();
  return bot_db.get("bot.interactions_counter");
}


module.exports = { interaction_increment, interactions };
