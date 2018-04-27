
class itObj {
  constructor() {
    this.filtered = [];
    this.start = (obj) => {
      Object.entries(obj).forEach(([key, value]) => this.filtered.push([key, value]));
    };
  }

  * it() {
    for (let u = 0; u < this.filtered.length; u++) {
      yield this.filtered[u];
    }
  }

  * [Symbol.iterator]() {
    while (true) {
      yield this.filtered.next();
    }
  }
}


const a = new itObj();

a.start({ aa: 11, bb: 22 });


console.log(a.filtered);

// console.log(a.next())

const v = a.it();
console.log(v.next());
console.log(v.next());
console.log(v.next());


class Cx {
  constructor() { this.a = [], this.u = 0; }
  add(x) { this.a.push(x); }
  * [Symbol.iterator]() {
    for (let u = 0; u < this.a.length; u++) {
      yield this.a[u];
    }
  }
  * it() {
    for (let u = 0; u < this.a.length; u++) {
      yield this.a[u];
    }
  }
}


const c = new Cx();
c.add(1);
c.add(2);
c.add(3);
for (const p of c) {
  console.log(p);
}

const cit = c.it();
console.log(cit.next());
console.log(cit.next());
console.log(cit.next());
console.log(cit.next());

//* ************************************************* */

const sym = Symbol('m');
const sym2 = Symbol('k');


const W = ({
  a: 1,
  b: 2,
  c: {
    ca: 11,
    cb: 22,
    cc: [1,2,3,4,5],
    cd: {
      cda: "aa"
    }
  },
  * [Symbol.iterator]() {
    for (const e of W[sym2]) {
      yield e;
    }
    yield W[sym2]; // is an array of all fuctions, except symbols's as they are hidden
    yield this.b;
    yield 'ddddddddddddddddddddddddd';
  },
  * it() {
    yield 11111111;
    yield 22222222;
  },
  [sym]: (obj, arr = false) => {
    Object.entries(obj).forEach(([key, value]) => {
      if (value && typeof value === 'object') {
        if (Array.isArray(value)) {
          W[sym](value, true); // recurse.  
        }
        W[sym](value); // recurse.
      }
      
      else if (typeof value !== 'function') { 
        if (arr) W[sym2].push(`[${key},${value}-${typeof value}]`);
        else W[sym2].push(`${key}=${value}-${typeof value}`); }// or do something with key and val.
    });
  },
  [sym2]: [],
 // x: (() => setTimeout(() => W[sym](W), 0))(),
});

W[sym](W); // excute a Symbol property of W obj. that loops through object and pushes key=values into array (symbol "sym2")

console.log(`spread ${[...W]}`); // because we have an [Symbol.iterator] property in this obj.

for (const bba of W) { // because we have an [Symbol.iterator] property in this obj.
  console.log(`loop: ${bba}`);
}

console.log(`apple: ${  JSON.stringify(W[Symbol.iterator]().next())}`);


console.log(`banana: ${  JSON.stringify(W.it().next())}`); // can next this objects property because returns next(), ie a generator.

for (const bbb of W.it()) { // because we have an [Symbol.iterator] property in this obj.
  console.log(`loop2: ${bbb}`);
}

//* ************************************************* */


console.log(`show: ${W[sym2]}`); // array of object's properties
