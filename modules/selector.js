/**
 * Applies jQuery selector against string.
 * Converts contents into DOM and apply jQuery selector.
 *
 * @param {*} string contents.
 * @param {*} string jQuery selector.
 * @returns string converted contents
 */
const { JSDOM } = require('jsdom');
const jq = require('jquery');

const selector = (cntts, jQry) => {
  const dom = (new JSDOM(cntts));
  // if (typeof dom.window !== 'object') throw ('problem with dom');
  const $ = jq(dom.window);
  const ndata = $(jQry).html();
  return ndata;
};

module.exports = selector;
