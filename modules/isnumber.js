/**
 * Check input if it is a number.
 *
 * @param {*}  value to check.
 * @returns boolean true if is a number or false if not.
 */
const isNumber = (data) => {
  if (typeof (data) === 'number') return true;

  return false;
};

module.exports = isNumber;