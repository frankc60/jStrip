const jStrip = require("./jStrip");

//******************************************************************
let a = new jStrip();

a.on("m1", (d) => {
  console.log("reply from google.com: before replace: " + d.data)
})


a.on("m2", (d) => {
  console.log("reply from google.com: after replace: " + d.data)
})

a.getData('https://www.google.com/').selector('title').marker('m1').replace(/G/,"g").marker('m2').show();
//******************************************************************


//******************************************************************
let jStrip4 = new jStrip();

jStrip4.on("marker3", (d) => {
  console.log(`current time in nz is: ${d.data}`);
});

jStrip4.getData('https://goo.gl/e234y2').selector("div#rs1")
  .marker("marker2").selector("#i_time").marker("marker3");
jStrip4.pretty().show(); 
//******************************************************************

let jStrip5 = new jStrip();

jStrip5.getData('hello world').replace("hello","hi").show();
jStrip5.pretty().show(); 
//******************************************************************

const jStrip6 = new jStrip();

jStrip6.getData('<b>tttt</b><u>yyyy</u>').pretty().show();
jStrip6.removehtml().show(); 
//******************************************************************
