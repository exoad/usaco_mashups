// Copyright 2023 Jack Meng. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

// @ts-ignore
// @ts-ignore
// @ts-ignore
const manifest = require("../../../../internal/MANIFEST.json");

module.exports = {
  config: {
    name: "db_listusers",
    category: "Developer",
    description: "INTERNAL_ONLY",
    usage: "INTERNAL_ONLY",
    aliases: [``],
  },
  run: async (_bot, msg, args) => {
    let id = msg.author.id;
    if (id == manifest.MASTER_ID) {
    }
  },
};
