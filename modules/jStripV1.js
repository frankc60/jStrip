/**
 * jStrip version 1.x
 *
 * @param {uri}  a url to load.
 * @param {jquery}  jquery selector to perform on html page.
 *
 * @returns {*} data,
      timed: body[1],
      uri,
      jquery,
      statuscode: body[2]
 */
const jsdom = require('jsdom'); // needed for legacy v.1
const request = require('request');

const {
  JSDOM,
} = jsdom; // needed for legacy v.1.x


//* **********************************************
//* **********************************************
const oldjStripGet = async (url) => new Promise((resolve, reject) => {
    // console.log(`crawling ${url}`);
    const start = Date.now();
    request(url, (error, response, body) => {
      if (error) reject(error);
      resolve([body, (Date.now() - start), response && response.statusCode]);
    });
  });
//* **********************************************
//* **********************************************
const oldjStripJsdom = async (body, jquery) => {
  const dom = await new JSDOM(body, {
    runScripts: 'outside-only',
  });
  const window = await dom.window.document.defaultView;
  const $ = await require('jquery')(window);
  const rnd = await Math.floor((Math.random() * 1000) + 1);
  await window.eval(`$('body').append('<jStrip id=\\'jStripSpecialTag${rnd}\\'>' + ${jquery}  + '</jStrip>');`);
  const rtn = await $(`jStrip#jStripSpecialTag${rnd}`).html();
  return rtn;
};
//* **********************************************
//* **********************************************
const jStrip_ = async (uri, jquery, tmeout) => {
  try {
    const options = {
      url: uri,
      timeout: tmeout,
    };
    const body = await oldjStripGet(options);
    const data = await oldjStripJsdom(body[0], jquery);
    return {
      data,
      timed: body[1],
      uri,
      jquery,
      statuscode: body[2],
    };
  } catch (err) {
    throw err;
  }
};

module.exports = jStrip_;
