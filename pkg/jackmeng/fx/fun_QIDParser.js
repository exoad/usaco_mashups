/**
 * @param  {string} qid A question Number ID
 */
function parse_to_arr(qid) {
  return [
    qid.substring(0, 4).toLowerCase(), // year
    qid.substring(4, 7).toLowerCase(), // month
    qid.substring(7, 11).toLowerCase(), // division
    qid.substring(11, 12).toLowerCase(), // q number
  ];
}

/**
 * @param  {number} intDiv Divsiion specifier as an Integer
 */
function parseDiv(intDiv) {
  return intDiv == 1
    ? "Platinum"
    : intDiv == 2
    ? "Gold"
    : intDiv == 3
    ? "Silver"
    : intDiv == 4
    ? "Bronze"
    : intDiv == 5
    ? "Camp/IOI"
    : "None/Unknown";
}

function to_div_int(name) {
  name = name.toLowerCase();
  return name.startsWith("pla")
    ? 1
    : name.startsWith("gol")
    ? 2
    : name.startsWith("sil")
    ? 3
    : name.startsWith("bron")
    ? 4
    : 5;
}

function to_month_name(name) {
  name = name.toLowerCase();
  return name.startsWith("ja")
    ? "January"
    : name.startsWith("dec")
    ? "December"
    : name.startsWith("fe")
    ? "February"
    : name.startsWith("no")
    ? "November"
    : name.startsWith("op")
    ? "USOpen"
    : name.startsWith("ma")
    ? "March"
    : "UnknownMonth";
}

function to_month_num(name) {
  name = name.toLowerCase();
  return name.startsWith("ja")
    ? 1
    : name.startsWith("dec")
    ? 12
    : name.startsWith("fe")
    ? 2
    : name.startsWith("no")
    ? 11
    : name.startsWith("op")
    ? 4
    : name.startsWith("ma")
    ? 3
    : 0;
}

/**
 * You should refer to using the much more intuitive:
 * fun_StaticAPI.parse_pack(qid) and build your own readable format from there
 * @param  {string} qid A question Number ID
 */
function parse_to_readable(qid) {
  const x = parse_to_arr(qid);
  return (
    "USACO " +
    (x[2].startsWith("go")
      ? "Gold"
      : x[2].startsWith("sil")
      ? "Silver"
      : x[2].startsWith("br")
      ? "Bronze"
      : x[2].startsWith("pl")
      ? "Platinum"
      : "Unknown") +
    " " +
    x[0] +
    " " +
    (x[1].startsWith("ja")
      ? "January"
      : x[1].startsWith("dec")
      ? "December"
      : x[1].startsWith("fe")
      ? "February"
      : x[1].startsWith("no")
      ? "November"
      : x[1].startsWith("op")
      ? "USOpen"
      : x[1].startsWith("ma")
      ? "March"
      : "Unknown") +
    " Problem #" +
    x[3]
  );
}

module.exports = {
  parse_to_readable,
  parse_to_arr,
  parseDiv,
  to_div_int,
  to_month_name,
  to_month_num
};
