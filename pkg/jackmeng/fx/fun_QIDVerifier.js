function has_qid_year(qid_partition) {
  return qid_partition.substring(0, 4).match("^[12][0-9]{3}$");
}

function has_qid_month_name(qid_partition) {
  return (
    ["dec", "nov", "jan", "feb", "mar", "opn"].indexOf(
      qid_partition.substring(4, 7).toLowerCase()
    ) >= 0
  );
}

function has_qid_div_name(qid_partition) {
  return (
    ["brnz", "gold", "silv", "plat"].indexOf(
      qid_partition.substring(7, 11).toLowerCase()
    ) >= 0
  );
}

function verify_qid(qid) {
  return (
    qid.length == 12 &&
    has_qid_year(qid) &&
    has_qid_month_name(qid) &&
    has_qid_div_name(qid) &&
    ["1", "2", "3", "4"].indexOf(qid.substring(11, 12).toLowerCase()) >= 0
  );
}

module.exports = {
  verify_qid,
  has_qid_div_name,
  has_qid_month_name,
  has_qid_year,
};
