/**
 * Check input if it is a url string.
 *
 * @param {*}  value to check.
 * @returns boolean true if is a url or false if not.
 */
const isUrl = (data) => {
  const urlRegex = new RegExp('^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?');

  if (urlRegex.test(data)) return true;

  return false;
};

module.exports = isUrl;
