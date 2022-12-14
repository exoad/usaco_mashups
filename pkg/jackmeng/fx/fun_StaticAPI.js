const master = require("../../../bin/map_master.json");
const slave = require("../../../bin/map_slave.json");
const qtype = require("../../../bin/qType.json");
const rnd_qa = require("../../../bin/rnd.json");
const qidVerifier = require("./fun_QIDVerifier");
const qidParser = require("./fun_QIDParser");

const DIVISION_TYPES = {
  PLATINUM: Symbol(1),
  GOLD: Symbol(2),
  SILVER: Symbol(3),
  BRONZE: Symbol(4),
  CAMP_N_IOI: Symbol(5),
  UNKNOWN: Symbol(0),
};

const DIVISION_NUMERICS = {
  PLATINUM: 4,
  GOLD: 3,
  SILVER: 2,
  BRONZE: 1,
  CAMP_N_IOI: 5,
  UNKNOWN: -1,
};

function numeric_2_type(numericValue) {
  return numericValue === DIVISION_NUMERICS.PLATINUM
    ? DIVISION_TYPES.PLATINUM
    : numericValue === DIVISION_NUMERICS.GOLD
    ? DIVISION_TYPES.GOLD
    : numericValue === DIVISION_NUMERICS.SILVER
    ? DIVISION_TYPES.SILVER
    : numericValue === DIVISION_NUMERICS.BRONZE
    ? DIVISION_TYPES.BRONZE
    : numericValue === DIVISION_NUMERICS.CAMP_N_IOI
    ? DIVISION_TYPES.CAMP_N_IOI
    : DIVISION_TYPES.UNKNOWN;
}

function type_2_numeric(typeValue) {
  return typeValue == DIVISION_TYPES.PLATINUM
    ? DIVISION_NUMERICS.PLATINUM
    : typeValue == DIVISION_TYPES.GOLD
    ? DIVISION_NUMERICS.GOLD
    : typeValue == DIVISION_TYPES.SILVER
    ? DIVISION_NUMERICS.SILVER
    : typeValue == DIVISION_TYPES.BRONZE
    ? DIVISION_NUMERICS.BRONZE
    : typeValue == DIVISION_TYPES.CAMP_N_IOI
    ? DIVISION_NUMERICS.CAMP_N_IOI
    : DIVISION_NUMERICS.UNKNOWN;
}

function calc_division(divNumerics, string_calc) {
  let operation = string_calc.substring(0, 1);
  let modifier = string_calc.substring(1, 2);
  let res = divNumerics.description;
  if ((operation != "+" && operation != "-") || !modifier.match("^[0-9]+$")) {
    return numeric_2_type(divNumerics);
  } else {
    res = Number.parseInt(res);
    modifier = Number.parseInt(modifier);
    res =
      operation == "+"
        ? res + modifier
        : Math.max(res, modifier) - Math.min(res, modifier);
    if (res > DIVISION_NUMERICS.PLATINUM) res = 1 + (res % 4); console.log(res);
    if (res < DIVISION_NUMERICS.BRONZE) res = 4 + (res % 4);
    console.log(
      res +
        " | " +
        numeric_2_type(res).description +
        " | " +
        modifier +
        operation +
        divNumerics.description
    );
    return numeric_2_type(res);
  }
}

function rnd_q_by_div_qid(division) {
  switch (division) {
    case DIVISION_TYPES.PLATINUM:
      return qtype.plat[Math.floor(Math.random() * qtype.plat.length)];
    case DIVISION_TYPES.GOLD:
      return qtype.gold[Math.floor(Math.random() * qtype.gold.length)];
    case DIVISION_TYPES.SILVER:
      return qtype.silv[Math.floor(Math.random() * qtype.silv.length)];
    case DIVISION_TYPES.BRONZE:
      return qtype.brnz[Math.floor(Math.random() * qtype.brnz.length)];
    default:
      const e = Math.floor(Math.random() * 4);
      return e == 0
        ? qtype.plat[Math.floor(Math.random() * qtype.plat.length)]
        : e == 1
        ? qtype.gold[Math.floor(Math.random() * qtype.gold.length)]
        : e == 2
        ? qtype.silv[Math.floor(Math.random() * qtype.silv.length)]
        : qtype.brnz[Math.floor(Math.random() * qtype.brnz.length)];
  }
}

function divint_to_divtype(intDiv) {
  switch (intDiv) {
    case 1:
      return DIVISION_TYPES.PLATINUM;
    case 2:
      return DIVISION_TYPES.GOLD;
    case 3:
      return DIVISION_TYPES.SILVER;
    case 4:
      return DIVISION_TYPES.BRONZE;
    case 5:
      return DIVISION_TYPES.CAMP_N_IOI;
    default:
      return DIVISION_TYPES.UNKNOWN;
  }
}

function qid_to_parseable(qid) {
  return slave[master[qid]];
}

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

function rnd_q() {
  return rnd_qa[Math.floor(Math.random() * rnd_qa.length)];
}

function parse_pack(qid) {
  const e = qidParser.parse_to_arr(qid);
  return {
    bare_qid: qid.toLowerCase(),
    year: e[0],
    month_name: qidParser.to_month_name(e[1]),
    month_numer: qidParser.to_month_num(e[1]),
    division_number: qidParser.to_div_int(e[2]),
    division_name: qidParser.parseDiv(qidParser.to_div_int(e[2])),
    problem_number: e[3],
  };
}

module.exports = {
  full_by_qid,
  is_bronze,
  is_gold,
  is_plat,
  is_silver,
  is,
  rnd_q,
  parse_pack,
  DIVISION_TYPES,
  rnd_q_by_div_qid,
  divint_to_divtype,
  qid_to_parseable,
  DIVISION_NUMERICS,
  type_2_numeric,
  calc_division,
};
