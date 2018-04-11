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
  it("should return 'Google' as title",  (done) => {
    const p = new Promise((resolve, reject) => {
      try {
        const result = jStrip3.jStrip_('https://www.google.com/', "$('title').html()");
        resolve(result);
      } catch (e) {
        reject(e);
      }
    });

    p.then((result) => {
      chai.expect(result.data).to.equal("Google");
      done();
    })
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

    jStrip4.getData("https://www.google.com").selector('title').marker('m1').show();

  });
});



const jStrip5 = new jStrip();

describe('jStrip - getData(), selector(), pretty(), replace(), marker(), show()', () => {
  it("should return 'google'",  (done) => {
    const result = jStrip5.getData('https://www.google.com/').selector('title').pretty(true).replace(/G/,"g").marker('m2').show();


    jStrip5.on('m2', (q) => {
      chai.expect(q.data).to.equal('google');
      done();
    });
  });
});

/*
const jStrip6 = new jStrip();

describe('jStrip - getData("text"), pretty(), replace(), marker()', () => {
  it("should return 'hi world'", async () => {
    const result = jStrip6.getData('hello     world').pretty(true).replace('hello', 'hi').marker('m3');


    jStrip6.on('m3', (e) => {
      chai.expect(e).to.equal('hi world');
    });
  });
});

const jStrip7 = new jStrip();

describe('jStrip - getData("text"), pretty(), marker(), replace(), marker()', () => {
  it("should return 'hello people'", async (done) => {
    const result = jStrip6.getData('hello     world').pretty(true).marker('m4').replace('world', 'people')
.marker('m5');

    jStrip7.on('m5', (e) => {
      console.log("m5 = " + e)
      chai.expect(e).to.equal('hello people');

      done();

    });
  });
});

const jStrip8 = new jStrip();

describe('jStrip - getData(dummy url)', () => {
  it("should return 'blank'", async (done) => {
    const result = jStrip8.getData('http://s123s.dds').pretty(true).marker('m4').replace('world', 'people')
.marker('m5');

    jStrip8.on('m4', (f) => {
      chai.expect(f).to.equal('hello world');
    });

    jStrip8.on('no_exists', (f) => {
      chai.expect(f).to.equal('');
      done();
    });
    

  });
});

const jStrip9 = new jStrip();

describe('jStrip - data not ready', () => {
  it("should return a blank",  (done) => {
    const result = jStrip9.show().pretty(true).show().marker("mm");

    chai.expect(result).to.not.equal("");

    jStrip9.on('mm', (f) => {
      chai.expect(f).to.equal('hello world');
      done();
    });


  });
});
*/