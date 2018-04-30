const jPrettyMod = require('jpretty');
const prettyHtml = require('pretty');
const request = require('request');

const removehtml = require('./modules/removehtml');
const show = require('./modules/show');
const uppercase = require('./modules/uppercase');
const lowercase = require('./modules/lowercase');
const selector = require('./modules/selector');
const jStripEmitter = require('./modules/jStripEmitter');
const isArray = require('./modules/isarray');
const isJson = require('./modules/isjson');
const isUrl = require('./modules/isurl');
const isString = require('./modules/isstring.js');
const isNumber = require('./modules/isnumber.js');
const jStripV1 = require('./modules/jStripV1');
const replace = require('./modules/replace');


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
    this.reverse.maxLength = 100;
    this.sort.maxLength = 100;
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
        if (isJson(d.data)) { this.o.type = 'json'; } else {
          this.o.type = d.type; // need to check again, incase url is now json
        }
        if (d.url) this.o.url = d.url;
        this.o.dataRetrieved = true;
        this.processQueue();
      });


      if (isUrl(data)) {
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
      } else if (isNumber(data)) {
        this.emit('dataReceived', {
          data,
          type: 'number',
        });
      } else if (isArray(data)) {
        this.emit('dataReceived', {
          data,
          type: 'array',
        });
      } else if (isJson(data)) {
      //   console.log('data is JSON format.');
        this.emit('dataReceived', {
          data,
          type: 'json',
        });
        // return this;
      } else if (isString(data)) {
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
  selector(jQry) {
    if (this.o.dataRetrieved === false) {
      this.addToQueue(this.selector, jQry);
    } else {
      this.o.contents = selector(this.o.contents, jQry);
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
      this.o.contents = replace(this.o.contents, reg, wth);
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
  sort() {
    if (this.o.dataRetrieved === false) {
      this.addToQueue(this.sort, true);
    } else if (isArray(this.o.contents)) {
      this.o.contents = this.o.contents.sort();
    } else if (isString(this.o.contents)) {
      if ((this.o.contents).length > this.sort.maxLength) {
        this.o.contents = `error: sort() maximum string length is ${this.sort.maxLength}. Can't sort ${(this.o.contents).length}.`;
      } else {
        const splitString = this.o.contents.split('');
        const sortArray = splitString.sort();
        const joinArray = sortArray.join('');
        this.o.contents = joinArray.trim();
      }
    } else {
      this.o.contents = ('jStrip.sort() requires an array or string/url');
    }
    return this;
  }
  //* **********************************************
  //* **********************************************
  reverse() {
    if (this.o.dataRetrieved === false) {
      this.addToQueue(this.reverse, true);
    } else if (isArray(this.o.contents)) {
      this.o.contents = this.o.contents.reverse();
    } else if (isString(this.o.contents)) {
      if ((this.o.contents).length > this.reverse.maxLength) {
        this.o.contents = `error: reverse() maximum string length is ${this.reverse.maxLength}. Can't reverse ${(this.o.contents).length}.`;
      } else {
        // console.log("length of contents: " + (this.o.contents).length);
        const splitString = this.o.contents.split('');
        const reverseArray = splitString.reverse();
        const joinArray = reverseArray.join('');
        this.o.contents = joinArray.trim();
      }
    } else {
      this.o.contents = ('jStrip.reverse() requires an array or string/url.');
    }
    return this;
  }
  //* **********************************************
  //* **********************************************
  add(num) {
    if (this.o.dataRetrieved === false) {
      this.addToQueue(this.add, num);
    } else if (isNumber(this.o.contents) && isNumber(num)) {
      this.o.contents = this.o.contents + num;
    } else {
      this.o.contents = ('jStrip.add() requires a number only.');
    }
    return this;
  }
  //* **********************************************
  //* **********************************************
  minus(num) {
    if (this.o.dataRetrieved === false) {
      this.addToQueue(this.minus, num);
    } else if (isNumber(this.o.contents) && isNumber(num)) {
      this.o.contents = this.o.contents - num;
    } else {
      this.o.contents = ('jStrip.minus() requires a number only.');
    }
    return this;
  }
  //* **********************************************
  //* **********************************************
  /*
  * Legacy V.1.x jStrip
  * @ jStrip_()
  */
  jStrip_(uri, jquery) { return jStripV1(uri, jquery, this.o.timeout); }
}


module.exports = jStrip;
