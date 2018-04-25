/**
 * Make object iterable.
 *
 * @param {*} object to make iterable.
 */

function* genrtr(k,v) {

  yield v
  while (true) {
    console.log("K" + k)
  yield k;
  }
 //return;

  while(true) {
    yield 1;
    yield 2;
    yield 3;
    return
  }

 
}

function a(obj) {
  Object.entries(obj).forEach( function([key, val])  {
     genrtr(key, val);
  });

}


const iterate = function* (obj) {
  if (typeof obj === 'object') {
    
    yield  a(obj);
    //yield genrtr(x);
  }
  return new Error('Not an object');
};


const x = { a: 1, b: 44, c: 'hello world' };

const it = iterate(x);

for (const t of it) {
  console.log(`t ${t}`);
}

// module.exports = iterate;
