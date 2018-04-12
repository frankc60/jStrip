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
    

    jStrip5.on('m2', (q) => {
      chai.expect(q.data).to.equal('google');
      done();
    });
    jStrip5.getData('https://www.google.com/').selector('title').pretty(true).replace(/G/,"g").marker('m2').show();

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

    jStrip6.getData('hello     world').pretty(true).replace('hello', 'hi').marker('m3').show();

  });
});


const jStrip7 = new jStrip();

describe('jStrip - getData(bad url), pretty(), marker(), replace(), marker()', () => {
  it("should return 'Error'",  (done) => {
    
    jStrip7.getData("http://getstatuscode.com/500").pretty(true).marker('m4').replace('world', 'people')
.marker('m5');

    jStrip7.on('m5', (e) => {
      //console.log("m5 = " + e.data)
      chai.expect(e.data).to.have.string("denied");

      done();

    });
  }).timeout(25000);
});



const jStrip8 = new jStrip();

describe('jStrip - multiple event handler calls', () => {
  it("should return 'undefined'", (done) => {
    
    jStrip8.on('m4', (f) => {
      
    });

    jStrip8.on('m4', (f) => {
      chai.expect(f.data).to.be.an('undefined');
      done();
    });

    jStrip8.getData('hello world').pretty(false).marker('m4').show();

  });
});
/* 
 const jStrip9 = new jStrip();

describe('jStrip - non event', () => {
  it("should create a new event", (done) => {
    
    jStrip9.on('m5', (f) => {
      chai.expect(f.data).to.be.an('undefined');
      done();
    });

    jStrip8.getData('hello').marker('m4').getData("sssss").marker("m5").show();

  });
});  */