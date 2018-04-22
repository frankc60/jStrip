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
const objjson2 = {
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
};


const jStrip7 = new jStrip();

jStrip7.on('m1', (d) => {
  const x = JSON.stringify(d.data);

  console.log(`a ${x}`);
  console.log(`aa : ${(d.data)}`);
  console.log(`aa type: ${JSON.stringify(d.type)}`);
});

jStrip7.getData(objjson2).marker('m1');
const ss = 66;

console.log(ss);


const htmlSample = `
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

const d = new jStrip();

d.getData('hello     world'); // if not url, then data is used as the original contents.

d.show().replace(/hello/, 'hi').show();
d.pretty().show();


d.getData('next one here').show(); // ignoreed, as getData already executed.

const e = new jStrip();
e.getData(htmlSample).selector('li').show();

const f = new jStrip();

// if using a marker for instint data, need to put the on() before getting the data and marking!
f.on('mark99', (a) => {
  console.log(`need to define before setting the marker, otherwise may have already been called**limm: ${a.data}`);
});

f.getData(htmlSample).selector('li').marker('mark99').show();


const jStrip1 = new jStrip();

jStrip1.on('marker3', (d) => {
  console.log(`current time in nz is: ${d.data}`);
  console.log(`data type: ${d.type}`);
  console.log(`url: ${d.url}`);
});

jStrip1.getData('https://goo.gl/e234y2').selector('div#rs1')
  .selector('#i_time').marker('marker3');
jStrip1.pretty().show();

const jStrip18 = new jStrip();

jStrip18.on('m1', (d) => {

  let t = JSON.parse(d.data);
  console.log(`current time in nz is: ${d.data}`);
  console.log(`data type: ${d.type}`);
  console.log(`dd: ${t.bpi.USD.rate}`);
});



jStrip18.getData("https://api.coindesk.com/v1/bpi/currentprice/gbp.json").marker("m1").jpretty().show();

const jStrip19 = new jStrip();

jStrip19.getData("<html>hello</html> <p>world</p> i say <br/>").show().removehtml().show();
