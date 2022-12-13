function uptime(bot) {
  let uptime_seconds = bot.uptime / 1000;
  let dys = Math.floor(uptime_seconds / 86400);
  uptime_seconds %= 86400;
  let hrs = Math.floor(uptime_seconds / 3600);
  uptime_seconds %= 3600;
  let min = Math.floor(uptime_seconds / 60);
  let sec = Math.floor(uptime_seconds % 60);
  return { days: dys, hours: hrs, minutes: min, seconds: sec };
}

module.exports = { uptime };
