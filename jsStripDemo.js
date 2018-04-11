const jStrip = require("./jStrip");


let a = new jStrip();


a.getData('https://www.google.com/').selector('title').replace(/G/,"g").marker('m2').show();

a.on("m2", (d) => {

console.log(d.data)

})