/*
This method takes a string and removes any html elements it may have.
@params {*} the value to check
@returns {string}
 */

const removehtml = contents => contents.replace(/<(?:.|\n)*?>/gm, '');

module.exports = removehtml;
