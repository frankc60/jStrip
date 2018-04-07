const request = require('request');
const jsdom = require('jsdom');

const { JSDOM } = jsdom;

const crawlpage = {

  get: url => new Promise((resolve, reject) => {
    const start = Date.now();
    request(url, (error, response, body) => {
      if (error) reject(error);
      resolve([body, (Date.now() - start), response && response.statusCode]);
    });
  }),
  jdom: async (body, jquery) => {
    const dom = await new JSDOM(body, { runScripts: 'outside-only' });
    const window = await dom.window.document.defaultView;
    const $ = await require('jquery')(window);
    const rnd = await Math.floor((Math.random() * 1000) + 1);
    await window.eval(`$('body').append('<jStrip id=\\'jStripSpecialTag${rnd}\\'>' + ${jquery}  + '</jStrip>');`);
    const rtn = await $(`jStrip#jStripSpecialTag${rnd}`).html();
    return rtn;
  },
};

const jStrip = async (uri, jquery) => {
  try {
    const body = await crawlpage.get(uri);
    const data = await crawlpage.jdom(body[0], jquery);
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

// EXAMPLE USAGE:
// jStrip('https://www.bbc.co.uk', "$('title').html()");
// jStrip('https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function', "$('title').html()");


module.exports = jStrip;
