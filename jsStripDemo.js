const jStrip = require('./jStrip');

//* *****************************************************************
/* const a = new jStrip();

a.on('m1', (d) => {
  console.log(`reply from google.com: before replace: ${d.data}`);
});


a.on('m2', (d) => {
  console.log(`reply from google.com: after replace: ${d.data}`);
});

a.getData('https://www.google.com/').selector('title').marker('m1').replace(/G/, 'g')
  .marker('m2')
  .show();
//* *****************************************************************


//* *****************************************************************
const jStrip4 = new jStrip();

jStrip4.on('marker3', (d) => {
  console.log(`current time in nz is: ${d.data}`);
});

jStrip4.getData('https://goo.gl/e234y2').selector('div#rs1')
  .marker('marker2').selector('#i_time')
  .marker('marker3');
jStrip4.pretty().show();
//* *****************************************************************

const jStrip5 = new jStrip();

jStrip5.getData('hello world').replace('hello', 'hi').show();
jStrip5.pretty().show();
//* *****************************************************************

const jStrip6 = new jStrip();

jStrip6.getData('<b>tttt</b><u>yyyy</u>').pretty().show();
jStrip6.removehtml().show();
//* *****************************************************************
 */
const objjson2 = JSON.stringify({
  'Meta Data': {
    '1. Information': 'Daily Prices and Volumes for Digital Currency',
    '2. Digital Currency Code': 'BTC',
    '3. Digital Currency Name': 'Bitcoin',
    '4. Market Code': 'CNY',
    '5. Market Name': 'Chinese Yuan',
    '6. Last Refreshed': '2018-04-14 (end of day)',
    '7. Time Zone': 'UTC',
  },
  'Time Series (Digital Currency Daily)': {
    '2018-04-14': {
      '1a. open (CNY)': '49966.62077319',
      '1b. open (USD)': '7962.80809135',
      '2a. high (CNY)': '50721.59958439',
      '2b. high (USD)': '8083.12343974',
      '3a. low (CNY)': '49961.44302767',
      '3b. low (USD)': '7961.98295262',
      '4a. close (CNY)': '50454.71382227',
      '4b. close (USD)': '8040.59184419',
      '5. volume': '480.12038067',
      '6. market cap (USD)': '3860452.01704299',
    },
  },
});


const jStrip7 = new jStrip();

jStrip7.on('m1', (d) => {
  const e = d.data;

  console.log('aa : ' + JSON.stringify(d.data));
  console.log('aa type: ' + JSON.stringify(d.type));
});

jStrip7.getData(objjson2).pretty().marker('m1'); 
let ss = 66;

console.log(ss);


let htmlSample = `
<html>
  <head>
    <title>Enter a title, displayed at the top of the window.</title>
  </head>
  <body>
    <h1>Enter the main heading, usually the same as the title.</h1>
    <p>Be <b>bold</b> in stating your key points. Put them in a list: </p>
  
    <ul>
      <li>The first item in your list</li>
      <li>The second item; <i>italicize</i> key words</li>
    </ul>
  
    <p>Improve your image by including an image. </p>
    <p><img src="http://www.mygifs.com/CoverImage.gif" alt="A Great HTML Resource"></p>
    <p>Add a link to your favorite <a href="http://www.dummies.com/">Web site</a>.
    Break up your page with a horizontal rule or two. </p>
    <hr>
    <p>Finally, link to <a href="page2.html">another page</a> in your own Web site.</p>
    <p>&#169; Wiley Publishing, 2011</p>
  </body>
</html>
`;

let d = new jStrip();

d.getData("hello     world"); //if not url, then data is used as the original contents.

d.show().replace(/hello/, "hi").show(); 
d.pretty(true).show();

d.getData("next one here").show()  //ignoreed, as getData already executed.

let e = new jStrip();
e.getData(htmlSample).selector("li").show();

let f = new jStrip();

// if using a marker for instint data, need to put the on() before getting the data and marking! 
f.on("mark99", (a) => {
  console.log("need to define before setting the marker, otherwise may have already been called**limm: " + a.data);
});

f.getData(htmlSample).selector("li").marker("mark99").show();


let jStrip1 = new jStrip();

jStrip1.on("marker3", (d) => {
  console.log(`current time in nz is: ${d.data}`);
  console.log(`data type: ${d.type}`);
  
});

jStrip1.getData('https://goo.gl/e234y2').selector("div#rs1")
  .selector("#i_time").marker("marker3");
jStrip1.pretty().show();