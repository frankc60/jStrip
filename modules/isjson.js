/**
 * Check input if it is a JSON object.
 *
 * @param {*}  value to check.
 * @returns boolean true if json or false if not json.
 */
const isJson = (data) => {
  try {
    JSON.parse(data); // if json data is already stringified (in quotes)
    return true;
  } catch (e) {
    try {
      const obj = JSON.parse(JSON.stringify(data)); // if json in raw format.
      if (obj && typeof obj === 'object') {
        return true;
      }
      return false;
    } catch (er) {
      // doesn't appear to be json in any format.
      // console.log("isJson = "+ data + ", " + JSON.stringify(data));
      return false;
    }
  }
};

module.exports = isJson;
