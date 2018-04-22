/* 
This method takes a string and removes any html elements it may have.
@params {*} the value to check
@returns {string}
 */

const replace = (contents) => {
  return contents.replace(/<(?:.|\n)*?>/gm, '');
}

exports module replace;