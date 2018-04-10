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


