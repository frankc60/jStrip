/**
 * Check input if it is a string.
 *
 * @param {*}  value to check.
 * @returns boolean true if is a string or false if not.
 */
const isString = (data) => {
  if (typeof (data) === 'string') return true;

  return false;
};

module.exports = isString;
