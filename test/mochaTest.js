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
        //chai.expect(result.data).to.equal('Google');
        //done();
      })
      .catch((e) => {
       // console.log(e)
        chai.expect(e);
        done();    
      });
    
  });
});


describe('jStrip - await', () => {
  it("should return 'Google' as title", async () => {
    let p = new Promise((resolve,reject) =>{ 
      try {
      const result = jStrip3.jStrip_('https://www.google.com/', "$('title').html()");
      resolve(result);
      } catch(e) {
        reject(e);
      }
    });

    let result = await p;
    chai.expect(result.data).to.equal('Google');
    
  });
});

const jStrip4 = new jStrip();

describe('jStrip - getData(), selector(), marker()', () => {
  it("should return 'Google'", async () => {
      
      const result = jStrip4.getData('https://www.google.com/').selector("title").marker("m1");
      

      jStrip4.on("m1",(t)=> {

        chai.expect(t).to.equal('Google');

      })
    
    
  });
});

const jStrip5 = new jStrip();

describe('jStrip - getData(), selector(), pretty(), replace(), marker(), show()', () => {
  it("should return 'google'", async () => {
      
      const result = jStrip5.getData('https://www.google.com/').selector("title").pretty(true).replace("G","g").marker("m2").show();
      

      jStrip5.on("m2",(q)=> {

        chai.expect(q).to.equal('google');

      })
    
    
  });
});

const jStrip6 = new jStrip();

describe('jStrip - getData("text"), pretty(), replace(), marker()', () => {
  it("should return 'hi world'", async () => {
      
      const result = jStrip6.getData('hello     world').pretty(true).replace("hello","hi").marker("m3");
      

      jStrip6.on("m3",(e)=> {

        chai.expect(e).to.equal('hi world');

      })
    
    
  });
});

const jStrip7 = new jStrip();

describe('jStrip - getData("text"), pretty(), marker(), replace(), marker()', () => {
  it("should return 'hello world' and 'hello people'", async () => {
      
      const result = jStrip6.getData('hello     world').pretty(true).marker("m4").replace("world","people").marker("m5");
      
      jStrip7.on("m4",(f)=> {

        chai.expect(f).to.equal('hello world');

      })
    
      jStrip7.on("m5",(e)=> {

        chai.expect(e).to.equal('hello people');


        let bb = jStrip7.show();
        chai.expect(bb).to.equal('hello people');
  

      })
    
    
jStrip7.on("xxx",() => {
// non-existing event

})

    
  });
});