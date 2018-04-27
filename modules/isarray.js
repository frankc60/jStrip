/**
 * Check input if it is an Array.
 *
 * @param {*}  value to check.
 * @returns boolean true if an array or false if not an array
 */
const isArray = (data) => {
  if (data && typeof data === 'object') {
    if (Array.isArray(data)) return true;
  }
  return false;
};

module.exports = isArray;
