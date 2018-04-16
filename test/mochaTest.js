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
      console.log(`${d.data } again!`);
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
    jStrip8.on('m4', (f) => {
      chai.expect(f.data).to.equal('hello world');
      done();
    });

    jStrip8.pretty(true).getData('hello world').pretty(false).marker('m4')
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

    jStrip13.getData('http://www.google.com').selector("title").uppercase().marker('m5').show();
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

    jStrip15.getData('https://www.google.com').selector("title").lowercase().marker('m5')
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
