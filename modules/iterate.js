
class itObj {
  constructor() {
    this.filtered = [];
    this.start = (obj) => {

      Object.entries(obj).forEach(([key, value]) => this.filtered.push([key,value])); 

    }
  }

  * it() { 
  for(let u=0; u < this.filtered.length;u++) {
    yield this.filtered[u]; 
  }
}

*[Symbol.iterator]() {
    while(true) {
      yield this.filtered.next();
    } 
 }

}


let a = new itObj();

a.start({"aa":11,"bb":22});


console.log(a.filtered)

//console.log(a.next())

let v = a.it();
console.log(v.next());
console.log(v.next());
console.log(v.next());






class Cx {
  constructor() { this.a = [], this.u = 0; }
  add(x) { this.a.push(x) }
  *[Symbol.iterator]() { 
    for(let u=0; u < this.a.length;u++) {
      yield this.a[u]; 
    }
  }
  * it() { 
    for(let u=0; u < this.a.length;u++) {
      yield this.a[u]; 
    }
  }
}


let c = new Cx();
c.add(1); 
c.add(2);
c.add(3)
for (let p of c) {
  console.log(p)
}

let cit = c.it();
console.log(cit.next())
console.log(cit.next())
console.log(cit.next())
console.log(cit.next())

