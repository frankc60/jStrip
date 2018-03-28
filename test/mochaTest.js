// var assert = require('assert');
const chai = require('chai');
const jStrip = require('../jStrip');


describe('jStrip - promise', () => {
  it("should return 'Google' as title", (done) => {
    jStrip('https://www.google.com/', "$('title').html()")
      .then((result) => {
 chai.expect(result.data).to.equal('Google');
        done(); 
});

  });
});

describe('jStrip - await', () => {
  it("should return 'Google' as title", async function() {
    let p = new Promise((resolve,reject) =>{ 
      const result = jStrip('https://www.google.com/', "$('title').html()");
      resolve(result);
    });

    let result = await p;
    chai.expect(result.data).to.equal('Google');
    
  });
});

