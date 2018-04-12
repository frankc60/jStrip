const jStrip = require("./jStrip");


let a = new jStrip();


a.getData('https://www.google.com/').selector('title').replace(/G/,"g").marker('m2').show();

a.on("m2", (d) => {

console.log(d.data)

})

let jStrip4 = new jStrip();

jStrip4.on("marker3", (d) => {
  console.log(`current time in nz is: ${d.data}`);
});

jStrip4.getData('https://goo.gl/e234y2').selector("div#rs1")
  .marker("marker2").selector("#i_time").marker("marker3");
jStrip4.pretty().show(); 