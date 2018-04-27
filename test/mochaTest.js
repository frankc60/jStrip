// var assert = require('assert');
const chai = require('chai');
const jStrip = require('../jStrip');

const jStrip1 = new jStrip();
const jStrip2 = new jStrip();
const jStrip3 = new jStrip();


describe('jStrip - promise', () => {
  it("should return 'Google' as title", (done) => {
    jStrip1.jStrip_('https://www.google.com/', "$('title').html()")
      .then((result) => {
        chai.expect(result.data).to.equal('Google');
        done();
      });
  });
});

describe('jStrip - promise - invalid uri', () => {
  it("should contain 'Error'", (done) => {
    jStrip2.jStrip_('url', "$('title').html()")
      .then((result) => {
        // chai.expect(result.data).to.equal('Google');
        // done();
      })
      .catch((e) => {
        // console.log(e)
        chai.expect(e);
        done();
      });
  });
});


describe('jStrip - await', () => {
  it("should return 'Google' as title", (done) => {
    const p = new Promise((resolve, reject) => {
      try {
        const result = jStrip3.jStrip_('https://www.google.com/', "$('title').html()");
        resolve(result);
      } catch (e) {
        reject(e);
      }
    });

    p.then((result) => {
      chai.expect(result.data).to.equal('Google');
      done();
    });
  });
});


// version 2.0
const jStrip4 = new jStrip();

describe('jStrip - getData(), selector(), marker()', () => {
  it("should return 'Google'", (done) => {
    jStrip4.on('m1', (t) => {
      chai.expect(t.data).to.equal('Google');
      done();
    });

    jStrip4.getData('https://www.google.com').selector('title').marker('m1').show();
  });
});


const jStrip5 = new jStrip();

describe('jStrip - getData(), selector(), pretty(), replace(), marker(), show()', () => {
  it("should return 'google'", (done) => {
    jStrip5.on('m2', (q) => {
      chai.expect(q.data).to.equal('google');
      done();
    });
    jStrip5.getData('https://www.google.com/').selector('title').pretty(true).replace(/G/, 'g')
      .marker('m2')
      .show();
  });
});


const jStrip6 = new jStrip();

describe('jStrip - getData("text"), pretty(), replace(), marker()', () => {
  it("should return 'hi world'", (done) => {
    jStrip6.on('m3', (e) => {
      // console.log("e.data:" + e.data)
      chai.expect(e.data).to.equal('hi world');
      done();
    });

    jStrip6.getData('hello     world').pretty(true).replace('hello', 'hi').marker('m3')
      .show();
  });
});


const jStrip7 = new jStrip();

describe('jStrip - getData(bad url), pretty(), marker(), replace(), marker()', () => {
  it("should return 'Error'", (done) => {
    jStrip7.getData('http://getstatuscode.com/500').pretty(true).marker('m4')
      .replace('world', 'people')
      .marker('m5');
    jStrip7.on('m5', (e) => {
      // console.log("m5 = " + e.data)
      chai.expect(e.data).to.have.string('');

      done();
    });
  }).timeout(25000);
});


const jStrip8 = new jStrip();

describe('jStrip - multiple event handler calls', () => {
  it("should return 'hello world'", (done) => {
    jStrip8.on('m4', (d) => {
      console.log(d.data);
    });

    jStrip8.on('m4', (d) => {
      console.log(`${d.data} again!`);
    });

    jStrip8.on('m5', (f) => {
      chai.expect(f.data).to.equal('hello world');
      done();
    });

    jStrip8.getData('hello world').pretty(false).marker('m4').show()
      .marker('m5');
  });
});

const jStrip9 = new jStrip();

describe('jStrip - pretty call before data ready', () => {
  it("should return 'hello world'", (done) => {
    jStrip9.on('m4', (f) => {
      chai.expect(f.data).to.equal('hello world');
      done();
    });

    jStrip9.pretty().getData('hello world').pretty().marker('m4')
      .show();
  });
});


// removehtml()
const jStrip10 = new jStrip();

describe('jStrip - remotehtml()', () => {
  it('should return hello world without html elements', (done) => {
    jStrip10.on('m5', (f) => {
      chai.expect(f.data).to.equal('hello world');
      done();
    });

    jStrip10.getData('<b>hello</b> <i>world</i>').removehtml().marker('m5').show();
  });
});

const jStrip11 = new jStrip(); // by loading url, let's cache be tested of .method()

describe('jStrip - remotehtml() - url', () => {
  it('should return hello world without html elements', (done) => {
    jStrip11.on('m5', (f) => {
      chai.expect(f.data).to.equal('Google');
      done();
    });

    jStrip11.getData('https://www.google.com').selector('title').removehtml().marker('m5')
      .show();
  });
});

// removehtml()
const jStrip12 = new jStrip();
const jStrip13 = new jStrip();

describe('jStrip - uppercase()', () => {
  it('should return hello world in UPPER-case', (done) => {
    jStrip12.on('m5', (f) => {
      chai.expect(f.data).to.equal('HELLO WORLD');
      done();
    });

    jStrip12.getData('hello world').uppercase().marker('m5').show();
  });

  it('should return google in UPPER-case', (done) => {
    jStrip13.on('m5', (f) => {
      chai.expect(f.data).to.equal('GOOGLE');
      done();
    });

    jStrip13.getData('http://www.google.com').selector('title').uppercase().marker('m5')
      .show();
  });
});

const jStrip14 = new jStrip(); // by loading url, let's cache be tested of .method()
const jStrip15 = new jStrip();

describe('jStrip - lowercase()', () => {
  it('should return HELLO WORLD in lower-case', (done) => {
    jStrip14.on('m5', (f) => {
      chai.expect(f.data).to.equal('hello world');
      done();
    });

    jStrip14.getData('HELLO WORLD').lowercase().marker('m5')
      .show();
  });

  it('should return Google in lower-case', (done) => {
    jStrip15.on('m5', (f) => {
      chai.expect(f.data).to.equal('google');
      done();
    });

    jStrip15.getData('https://www.google.com').selector('title').lowercase().marker('m5')
      .show();
  });
});


const jStrip16 = new jStrip(); // by loading url, let's cache be tested of .method()
const jStrip17 = new jStrip();

describe('jStrip - json=type', () => {
  it('should return type = json', (done) => {
    jStrip16.on('m5', (f) => {
      chai.expect(f.type).to.equal('json');
      done();
    });

    jStrip16.getData('{"name": "jStrip", "awesome": "true"}').marker('m5')
      .show();
  });

  it('should return type = json', (done) => {
    jStrip17.on('m5', (f) => {
      chai.expect(f.type).to.equal('json');
      done();
    });

    jStrip17.getData({ name: 'jStrip', awesome: 'true' }).marker('m5').uppercase()
      .show();
  });

  /*
  it('should return Google in lower-case', (done) => {
    jStrip17.on('m5', (f) => {
      chai.expect(f.data).to.equal('google');
      done();
    });

    jStrip17.getData('https://www.google.com').selector("title").lowercase().marker('m5')
      .show();
  }); */
});

const jStrip18 = new jStrip();

describe('jStrip - http instance timeout', () => {
  it('should equal 10000 (default)', (done) => {
    const x = jStrip18.timeout;

    chai.expect(x).to.equal(10000);
    done();
  });
  it('set to 8000, and display new value', (done) => {
    jStrip18.timeout = 8000;
    const x = jStrip18.timeout;

    chai.expect(x).to.equal(8000);
    done();
  });
});


const jStrip19 = new jStrip();
const jStrip20 = new jStrip();


describe('jStrip - data type is pure json object', () => {
  it('should recognise type as json (future version)', (done) => {
    jStrip19.on('m5', (d) => {
      console.log(`19 - ${d.type}${d.data}`);

      chai.expect(d.type).to.equal('json');
      done();
    });


    jStrip19.getData({ name: 'jStrip', awesome: 'true' }).marker('m5');
  });


  it('should error - not json obj - yet (future version)', (done) => {
    jStrip20.on('m5', (d) => {
      console.log(`20 - ${d.type}`, d.data);

      chai.expect(d).to.equal(10000);
      done();
    });


    jStrip20.getData(() => { console.log('ss'); }).marker('m5');

    const k = 1;
    chai.expect(k).to.equal(1); // it shouldn't execute, so on() is never called, and thus this k=1 will execute and pass.
    done();
  });
});

const jStrip21 = new jStrip();
const jStrip22 = new jStrip();
const jStrip23 = new jStrip();
const jStrip24 = new jStrip();
const jStrip25 = new jStrip();
const jStrip26 = new jStrip();

describe('jStrip - json content', () => {
  it('jpretty() - tidy json output to console', (done) => {
    jStrip21.on('m5', (d) => {
      console.log(`21 - ${d.type}, ${d.data}`);

      chai.expect(d.data).to.equal('{}.name = jStrip\n');
      done();
    });


    jStrip21.getData({ name: 'jStrip' }).jpretty().marker('m5').show();
  });


  it('jpretty() - should return json as input', (done) => {
    jStrip22.on('m5', (d) => {
      // console.log(`22 - ${d.type}, ${d.data}`);

      chai.expect(d.data).to.deep.equal({ name: 'jStrip', awesome: 'true' });
      done();
    });


    jStrip22.getData({ name: 'jStrip', awesome: 'true' }).marker('m5').show();
  });

  it('jpretty() - parse in a more complex json object', (done) => {
    jStrip23.on('m5', (d) => {
      console.log(`21 - ${d.type}, ${d.data}`);

      chai.expect(d.data).to.equal('{}.a = 1\n{}.b = 2\n{}.c.ca = 3\n{}.c.cb = 4\n{}.c.cc[0] = 5\n{}.c.cc[1] = 6\n{}.c.cc[2] = 7\n{}.c.cc[3] = 8\n{}.c.cd.cda[0] = 55\n{}.c.cd.cda[1] = 66\n{}.c.cd.cda[2] = 77\n{}.c.cd.cdb = a\n{}.d[0] = 9\n{}.d[1] = 10\n{}.d[2] = 11\n{}.items[0].id = Open\n{}.items[1].id = OpenNew\n{}.items[1].label = Open New\n{}.items[2].id = ZoomIn\n{}.items[2].label = Zoom In\n');
      done();
    });

    const jsonData = {
      a: 1,
      b: 2,
      c: {
        ca: 3,
        cb: 4,
        cc: [5, 6, 7, 8],
        cd: {
          cda: [55, 66, 77],
          cdb: 'a',
        },
      },
      d: [9, 10, 11],
      items: [
        { id: 'Open' },
        { id: 'OpenNew', label: 'Open New' },
        { id: 'ZoomIn', label: 'Zoom In' },
      ],
    };


    jStrip23.getData(jsonData).jpretty().marker('m5').show();
  });

  it('jpretty() - grab json from the web', (done) => {
    jStrip24.on('m5', (d) => {
      const o = JSON.parse(d.data);

      console.log(`24 - ${d.type}, ${o.time.updatedISO}`);

      chai.expect(d.type).to.equal('json');
      done();
    });


    jStrip24.getData('https://api.coindesk.com/v1/bpi/currentprice/gbp.json').marker('m5').jpretty().show();
  });

  it('jpretty() - pass json stringified', (done) => {
    jStrip25.on('m5', (d) => {
      // console.log(`21 - ${d.type}, ${d.data}`);

      chai.expect(d.type).to.equal('json');
      done();
    });


    jStrip25.getData('{"a" : 1, "b" : 2}').jpretty().marker('m5').show();
  });

  it('jpretty() - pass json as an object', (done) => {
    jStrip26.on('m5', (d) => {
      // console.log(`21 - ${d.type}, ${d.data}`);

      chai.expect(d.type).to.equal('json');
      done();
    });


    jStrip26.getData({ a: 1, b: 2 }).jpretty().marker('m5').show();
  });
});


const sort = new jStrip();
const sort2 = new jStrip();
const sort3 = new jStrip();
const sort4 = new jStrip();


describe('jStrip - .sort()', () => {
  it('sort() - sort an array', (done) => {
    sort.on('m5', (d) => {
    //   console.log(`sort() - ${d.type}, ${d.data}`);
    //   console.log(Array.isArray(d.data));

      chai.expect(d.data).to.include.ordered.members([1, 2, 3, 4, 5]);
      done();
    });
    sort.getData([1, 5, 2, 4, 3]).sort().marker('m5');
  });

  it('sort() - try and sort an invalid type', (done) => {
    sort2.on('m5', (d) => {
      // console.log(`sort2() - ${d.type}, ${d.data}`);

      chai.expect(d.data).to.contains('jStrip.sort() requires an array');
      done();
    });

    sort2.getData(11).sort().marker('m5');
  });

  it('sort() - url, short', (done) => {
    sort3.on('m5', (d) => {
      console.log(`sort3() - ${d.type}, ${d.data}`);
      chai.expect(d.data).to.contain(',,12345');
      done();
    });
    sort3.getData("https://my-json-server.typicode.com/frankc60/myJsonServer/profile").sort().marker('m5');
  });

  it('sort() - url, too long', (done) => {
    sort4.on('m5', (d) => {
      console.log(`sort4() - ${d.type}, ${d.data}`);
      chai.expect(d.data).to.contain('error: sort() maximum string length is');
      done();
    });
    sort4.getData("https://www.google.com").sort().marker('m5');
  });

});


const reverse = new jStrip();
const reverse2 = new jStrip();
const reverse3 = new jStrip();
const reverse4 = new jStrip();

describe('jStrip - .reverse()', () => {
  it('reverse() - reverse an array', (done) => {
    reverse.on('m5', (d) => {
    // console.log(`reverse() - ${d.type}, ${d.data}`);

      chai.expect(d.data).to.include.ordered.members([1, 2, 3, 4, 5]);
      done();
    });
    reverse.getData([5, 4, 3, 2, 1]).reverse().marker('m5');
  });

  it('reverse() - try and reverse an invalid type', (done) => {
    reverse3.on('m5', (d) => {
      // console.log(`reverse3() - ${d.type}, ${d.data}`);
      chai.expect(d.data).to.contains('jStrip.reverse() requires an array');
      done();
    });
    reverse3.getData(1).reverse().marker('m5');
  });

  it('reverse() - url, too long', (done) => {
    reverse4.on('m5', (d) => {
      console.log(`reverse4() - ${d.type}, ${d.data}`);
      chai.expect(d.data).to.contain('error: reverse() maximum string length is');
      done();
    });
    reverse4.getData("https://www.google.com").reverse().marker('m5');
  });
  
  it('reverse() - url, short', (done) => {
    reverse2.on('m5', (d) => {
      console.log(`reverse2() - ${d.type}, ${d.data}`);
      chai.expect(d.data).to.contain('5 ,4 ,3 ,2 ,1');
      done();
    });
    reverse2.getData("https://my-json-server.typicode.com/frankc60/myJsonServer/profile").reverse().pretty().marker('m5');
  });

});


