// Copyright 2023 Jack Meng. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

const { EmbedBuilder } = require("discord.js");
// @ts-ignore
const colors = require("../../../../configs/colors.json");
// @ts-ignore
const app = require("../../../../configs/bot.json");
const { Database } = require("secure-db");
// @ts-ignore
const manifest = require("../../../../internal/MANIFEST.json");
const superagent = require("superagent");
const { off } = require("superagent");

module.exports = {
  config: {
    name: "db_listusers",
    category: "Developer",
    description: "INTERNAL_ONLY",
    usage: "INTERNAL_ONLY",
    aliases: [``],
  },
  run: async (bot, msg, args) => {
    let id = msg.author.id;
    if (id == manifest.MASTER_ID) {
    }
  },
};
