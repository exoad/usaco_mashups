const app = require('../../../../configs/bot.json');

module.exports = async (bot) => {
  console.log("[READY_EVENT_HANDLER] Online...");
  bot.user.setActivity(app.utils.status);
}
