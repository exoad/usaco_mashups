function arr_rm(arr, v) {
  return arr.filter((x) => {
    return x != v;
  });
}

function parseMonth(intMonth) {
  return intMonth == 1
    ? "January"
    : intMonth == 2
    ? "February"
    : intMonth == 3
    ? "March"
    : intMonth == 4
    ? "USOpen/April"
    : intMonth == 12
    ? "December"
    : "Unexpected Month " + intMonth;
}

module.exports = { arr_rm, parseMonth };
