const request = require('request');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

// const rp = require('request-promise');
// const cheerio = require('cheerio');

class _CrawlPage {
  constructor() {
    this.htmlparser2Options = {
      withDomLvl1: true,
      normalizeWhitespace: false,
      xmlMode: true,
      decodeEntities: true,
    };
    this.options = {
      uri: 'blank',
      transform(body) {
        return cheerio.load(body, this.htmlparser2Options);
      },
    };
  }

  get(url) {
    this.options.uri = url;
    const start = Date.now();
    return new Promise((resolve, reject) => {
      // console.log(`crawling ${url}`);
      request(url, (error, response, body) => {
        if (error) reject(error);
        const dom = new JSDOM(body);
        let window = dom.window.document.defaultView;
        let $ = require('jquery')(window);
        resolve($);
      });
    });
  }
/*
      rp(this.options)
        .then(async ($) => {
          //await console.log(`done in ${(Date.now() - start)} ms`);
          resolve($);
        })
        .catch((err) => {
          reject((err));
        });
  */
}

const CrawlPage = url => new _CrawlPage(url); // so don't need a new contructor call
const crawlpage = CrawlPage();

/*
crawlpage.get('https://www.google.com')
  .then(($) => {
    console.log(`via promise: ${$('title').html()}`);
  })
  .catch((err) => {
    console.log(`promise Error: ${err}`);
  });
*/

const jStrip = async (uri, jquery) => {
  try {
    const $ = await crawlpage.get(uri);
    const arg = await new Function('$,jquery', `'use strict';return ${jquery}`);
    const x = await arg($, jquery);
    // await console.log(`${uri} page crawled`);
    // await console.log(`via await: ${x}`); // eval(jquery) - look for alternative
    return x;
  } catch (err) {
    // console.log(`async Error ${err}`);
    throw err;
  }
};

// EXAMPLE USAGE:
// jStrip('https://www.bbc.co.uk', "$('title').html()");
// jStrip('https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function', "$('title').html()");


module.exports = jStrip;
