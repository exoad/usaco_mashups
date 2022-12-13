function parse_to_arr(qid) {
  return [
    qid.substring(0, 4).toLowerCase(), // year
    qid.substring(4, 7).toLowerCase(), // month
    qid.substring(7, 11).toLowerCase(), // division
    qid.substring(11, 12).toLowerCase(), // q number
  ];
}

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
      : x[1].starsWith("ma")
      ? "March"
      : "Unknown") +
    " Problem #" +
    x[3]
  );
}

module.exports = { parse_to_readable, parse_to_arr };
