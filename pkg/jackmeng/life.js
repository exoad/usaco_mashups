const http = require('http');
const server = require("../../configs/server.json");
const messages = require("../../configs/cli-messages.json")

http.createServer(function (r, res) {
  res.write(messages['http-ready-write']);
  res.end();
}).listen(server['http-listen-port']);