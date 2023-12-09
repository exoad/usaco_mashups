const Fuse=require('fuse.js');

function fuzzySearchStrings(keys, searchPattern, list) {
  const fuse=new Fuse(list, {keys:keys});
  return fuse.search(searchPattern);
}

/**
 * @param  {Array} arr Array to look through (filter through)
 * @param  {Object} v Object instance to remove
 */
function arr_rm(arr, v) {
  return arr.filter((x) => {
    return x != v;
  });
}
/**
 * @param  {number|string} intMonth The month number 1-12 representing what type to be validated as
 */
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

module.exports = { arr_rm, parseMonth, fuzzySearchStrings };
