const jsdom = require('jsdom');
const jPrettyMod = require('jpretty');
const removehtml = require('./modules/removehtml');
const show = require('./modules/show');
const uppercase = require('./modules/uppercase');
const lowercase = require('./modules/lowercase');


const {
  JSDOM,
} = jsdom;
const prettyHtml = require('pretty');
const request = require('request');

//* ******************************************************************************************
//* ******************************************************************************************
//* ******************************************************************************************
/**
 * jStripEmitter
 *
 */
class jStripEmitter {
  constructor() {
    this.events = {};
  }

  emit(eventName, ...data) {
    const event = this.events[eventName];
    if (event) {
      event.forEach((fn) => {
        fn.call(null, ...data);
      });
    }
  }

  on(eventName, fn) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].push(fn);

    const that = this;
    return (that.events[eventName].filter(eventFn => fn !== eventFn));
  }
}
//* ******************************************************************************************
//* ******************************************************************************************
//* ******************************************************************************************
/**
 * jStrip
 */
class jStrip extends jStripEmitter {
  constructor() {
    super();

    this.o = []; // new Map(); //
    this.o.dataRetrieved = false;
    this.o.contents = '';
    this.o.timeout = 10000;
    this.o.tmp = '';
    this.o.type = undefined;
    this.o.url = undefined;
  }
  //* **********************************************
  //* **********************************************
  // Getter
  get timeout() {
    return this.o.timeout;
  }
  //* **********************************************
  //* **********************************************
  // Setter
  set timeout(n) {
    this.o.timeout = n;
  }
  //* **********************************************
  //* **********************************************

  static isJson(data) {
    const tdata = data;
    try {
      JSON.parse(tdata); // if json data is already stringified (in quotes)
      return true;
    } catch (e) {
      // console.log("not  json " + e)
      try {
      // add json featues!
      const obj = JSON.parse(JSON.stringify(tdata)); // if json in raw format.
      // console.log("obj: " + obj)z
      if (obj && typeof obj === 'object') {
        return true;
      }
      return false;
       } catch (er) {
      // never called!
      // console.log("not  json " + er)
      // return false;
       }
    }
  }

  static isUrl(data) {
    const urlRegex = new RegExp('^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?');

    if (urlRegex.test(data)) return true;

    return false;
  }

  static isString(data) {
    if (typeof (data) === 'string') return true;

    return false;
  }

  /*  prettyJson(strEvents, t = 0) {
    // for (i in events) {
    // for (const i of Object.keys(events)) {
    const events = JSON.parse(strEvents);
    const that = this;
    function pJson(events, t = 0) {
     // console.log("pjson1")
      Object.keys(events).forEach((i) => {
     //   console.log("pjson2")
    //    console.log(i, events[i]);
        if (typeof events[i] === 'object') {
          that.o.tmp += `${'\t'.repeat(t)}**${i}**\n`;
          pJson(events[i], (t + 1));
        } else {
          that.o.tmp += `${'\t'.repeat(t)}${i} = ${events[i]}\n`;
        }
      });
    }
    pJson(events);
    let tmpData = this.o.tmp;
    this.o.tmp = "";
    return tmpData;
  } */

  addToQueue(f, ...d) {
    this.o.push([
      [f],
      [...d],
    ]);
  }
  //* **********************************************
  //* **********************************************
  processQueue() {
    const that = this;
    // let remove;
    const r = this.o;
    let i = 0;
    for (const [fn, ...arg] of r) {
      fn[0].apply(that, ...arg);
      i++;
    }
    // console.log("o: " + JSON.stringify(this.o))
    this.o.splice(0, i);
    // console.log("i:" + i)
    // console.log("o: " + JSON.stringify(this.o))
  }
  //* **********************************************
  //* **********************************************
  getData(data) {
    if (this.o.dataRetrieved === false) {
      this.on('dataReceived', (d) => {
        this.o.contents = d.data;
        if (jStrip.isJson(d.data)) { this.o.type = 'json'; } else {
          this.o.type = d.type; // need to check again, incase url is now json
        }
        if (d.url) this.o.url = d.url;
        this.o.dataRetrieved = true;
        this.processQueue();
      });


      if (jStrip.isUrl(data)) {
        // if (urlRegex.test(data)) {
        const options = {
          url: data,
          timeout: this.o.timeout,
        };
        // success
        request(options, (error, response, body) => {
          //   if (error) { body = (`${error} ${response && response.statusCode}`); }
          this.emit('dataReceived', {
            data: body,
            type: 'url',
            url: data,
          });
        });
      } else if (jStrip.isJson(data)) {
      //   console.log('data is JSON format.');
        this.emit('dataReceived', {
          data,
          type: 'json',
        });
        // return this;
      } else if (jStrip.isString(data)) {
        this.emit('dataReceived', {
          data,
          type: 'string',
        });
      }
    }
    return this;
  }
  //* **********************************************
  //* **********************************************
  selector(j) {
    if (this.o.dataRetrieved === false) {
      this.addToQueue(this.selector, j);
    } else {
      const dom = (new JSDOM(this.o.contents));
      // if (typeof dom.window !== 'object') throw ('problem with dom');
      const $ = require('jquery')(dom.window);
      this.o.contents = $(j).html();
    }
    return this;
  }
  //* **********************************************
  //* **********************************************
  show() {
    if (this.o.dataRetrieved === false) {
      this.addToQueue(this.show, true);
    } else {
      show(this.o.contents);
    }
    return this;
  }
  //* **********************************************
  //* **********************************************
  marker(a) {
    if (this.o.dataRetrieved === false) {
      this.addToQueue(this.marker, a);
    } else {
      // console.log("marker: " + a);
      this.emit(a, {
        data: this.o.contents,
        type: this.o.type,
        url: this.o.url,
      });
    }
    return this;
  }
  //* **********************************************
  //* **********************************************
  replace(reg, wth) {
    if (this.o.dataRetrieved === false) {
      this.addToQueue(this.replace, reg, wth);
    } else {
      // console.log("marker: " + a);
      this.o.contents = (this.o.contents).replace(reg, wth);
    }
    return this;
  }
  //* **********************************************
  //* **********************************************
  pretty() {
    if (this.o.dataRetrieved === false) {
      this.addToQueue(this.pretty, true);
      /*  } else if (this.o.contents.type == 'json') {
      this.o.contents = this.prettyJson(this.o.contents); */
    /* }  else if (this.o.type === 'json') {
      console.log("type:" + this.o.type)
      this.o.contents = this.prettyJson(this.o.contents); */
    } else {
      this.o.contents = prettyHtml(this.o.contents);
    }

    return this;
  }
  //* **********************************************
  //* **********************************************
  jpretty() {
    if (this.o.dataRetrieved === false) {
      this.addToQueue(this.jpretty, true);
    } else {
      // console.log("jpretty(");
      // console.log(this.o.contents);

      this.o.contents = jPrettyMod(this.o.contents);
    }

    return this;
  }

  //* **********************************************
  //* **********************************************
  removehtml() {
    if (this.o.dataRetrieved === false) {
      this.addToQueue(this.removehtml, true);
    } else {
      this.o.contents = removehtml(this.o.contents);
    }
    return this;
  }
  //* **********************************************
  //* **********************************************
  uppercase() {
    if (this.o.dataRetrieved === false) {
      this.addToQueue(this.uppercase, true);
    } else {
      this.o.contents = uppercase(this.o.contents);
    }
    return this;
  }
  //* **********************************************
  //* **********************************************
  lowercase() {
    if (this.o.dataRetrieved === false) {
      this.addToQueue(this.lowercase, true);
    } else {
      this.o.contents = lowercase(this.o.contents);
    }
    return this;
  }
  //* **********************************************
  //* **********************************************
  //* **********************************************
  //* **********************************************
  async jStrip_(uri, jquery) {
    try {
      const options = {
        url: uri,
        timeout: this.o.timeout,
      };
      const body = await this.oldjStripGet(options);
      const data = await this.oldjStripJsdom(body[0], jquery);
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
  }
  //* **********************************************
  //* **********************************************
  async oldjStripGet(url) {
    return new Promise((resolve, reject) => {
      // console.log(`crawling ${url}`);
      const start = Date.now();
      request(url, (error, response, body) => {
        if (error) reject(error);
        resolve([body, (Date.now() - start), response && response.statusCode]);
      });
    });
  }
  //* **********************************************
  //* **********************************************
  async oldjStripJsdom(body, jquery) {
    const dom = await new JSDOM(body, {
      runScripts: 'outside-only',
    });
    const window = await dom.window.document.defaultView;
    const $ = await require('jquery')(window);
    const rnd = await Math.floor((Math.random() * 1000) + 1);
    await window.eval(`$('body').append('<jStrip id=\\'jStripSpecialTag${rnd}\\'>' + ${jquery}  + '</jStrip>');`);
    const rtn = await $(`jStrip#jStripSpecialTag${rnd}`).html();
    return rtn;
  }
  //* **********************************************
  //* **********************************************
}


module.exports = jStrip;
