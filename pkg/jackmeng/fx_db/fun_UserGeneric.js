const { Database } = require("secure-db");
const manifest = require("../../../internal/MANIFEST.json");
const bldb = new Database(manifest["blacklisted-registry"]);
const db = new Database(manifest["users-registry"]);

function user_solved(qid, user_id) {
  return (
    db.get(user_id).solvedqs.includes(qid.toLowerCase())
  );
}

module.exports = { user_solved };
