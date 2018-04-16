const jsdom = require('jsdom');

const {
  JSDOM,
} = jsdom;
const prettyHtml = require('pretty');
const request = require('request');

//* ******************************************************************************************
//* ******************************************************************************************
//* ******************************************************************************************
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
class jStrip extends jStripEmitter {
  constructor() {
    super();

    this.o = []; // new Map(); //
    this.o.dataRetrieved = false;
    this.o.contents = '';
    this.o.timeout = 10000;
    this.o.tmp = '';
    this.o.type = undefined;
  }
  //* **********************************************
  //* **********************************************
  static isJson(str) {
    try {
      JSON.parse(str);
      return true;
    } catch (e) {
      // console.log("not  json " + e)
      return false;
    }
  }

  static isUrl(str) {
    const urlRegex = new RegExp('^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?');

    if (urlRegex.test(str)) return true;

    return false;
  }

  /*  prettyJson(events, t = 0) {
    // for (i in events) {
    // for (const i of Object.keys(events)) {
    let that = this;
    function pJson(events, t = 0) {
      Object.keys(events).forEach((i) => {
      //   console.log(i, events[i]);
        if (typeof events[i] === 'object') {
          that.o.tmp += `${'\t'.repeat(t)}**${i}**`;
          this.pJson(events[i], (t + 1));
        } else {
          that.o.tmp += `${'\t'.repeat(t)}${i} * ${events[i]}`;
        }
      });
    }
    return this.o.tmp;
  }
 */
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
    // let i = 0;
    for (const [fn, ...arg] of r) {
      fn[0].apply(that, ...arg);
      //  const ndx = r.splice(i, 1); // clear queue memory after running
      //  i++;
    }
  }
  //* **********************************************
  //* **********************************************
  getData(data) {
    if (this.o.dataRetrieved === false) {
      this.on('dataReceived', (d) => {
        this.o.contents = d.data;
        this.o.type = d.type;
        this.o.dataRetrieved = true;
        this.processQueue();
      });


      // const urlRegex = new RegExp('^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?');

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
          });
        });
      } else if (jStrip.isJson(data)) {
        // console.log('data is JSON format.');
        this.emit('dataReceived', {
          data,
          type: 'json',
        });
        // return this;
      } else { // isString
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
    if (this.o.dataRetrieved == false) {
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
      console.log(this.o.contents);
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
    } else {
      this.o.contents = prettyHtml(this.o.contents);
    }

    return this;
  }
  //* **********************************************
  //* **********************************************
  removehtml() {
    if (this.o.dataRetrieved === false) {
      this.addToQueue(this.removehtml, true);
    } else {
      this.o.contents = (this.o.contents).replace(/<(?:.|\n)*?>/gm, '');
    }
    return this;
  }
  //* **********************************************
  //* **********************************************
  uppercase() {
    if (this.o.dataRetrieved === false) {
      this.addToQueue(this.uppercase, true);
    } else {
      this.o.contents = (this.o.contents).toUpperCase();
    }
    return this;
  }
  //* **********************************************
  //* **********************************************
  lowercase() {
    if (this.o.dataRetrieved === false) {
      this.addToQueue(this.lowercase, true);
    } else {
      this.o.contents = (this.o.contents).toLowerCase();
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
