const master = require("../../../bin/map_master.json");
const slave = require("../../../bin/map_slave.json");
const qtype = require("../../../bin/qType.json");
const qidVerifier = require("./fun_QIDVerifier");

function full_by_qid(qid) {
  return qidVerifier.verify_qid(qid) ? slave[master[qid.toLowerCase()]] : null;
}

function is_gold(qid) {
  return qtype.gold.indexOf(qid.toLowerCase()) >= 0;
}

function is_plat(qid) {
  return qtype.plat.indexOf(qid.toLowerCase()) >= 0;
}

function is_bronze(qid) {
  return qtype.brnz.indexOf(qid.toLowerCase()) >= 0;
}

function is_silver(qid) {
  return qtype.silv.indexOf(qid.toLowerCase()) >= 0;
}

function is(qid) {
  return is_gold(qid) || is_plat(qid) || is_bronze(qid) || is_silver(qid);
}

module.exports = { full_by_qid };
