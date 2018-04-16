const jStrip = require('./jStrip');

//* *****************************************************************
const a = new jStrip();

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

function jsonrepack(obj) { return JSON.parse(JSON.stringify(obj)); }

const y = jsonrepack(objjson2);


function inside(events, t=0) {
  // for (i in events) {
  // for (const i of Object.keys(events)) {
  Object.keys(events).forEach((i) => {
    //   console.log(i, events[i]);
    if (typeof events[i] === 'object') {
      console.log(`${"  ".repeat(t)}**${i}**`);
      inside(events[i],(t+1));
    } else {
      console.log(`${"  ".repeat(t)}${i} * ${events[i]}`);
    }
  });
}

inside(y);

const jStrip7 = new jStrip();

jStrip7.on('m1', (d) => {
  // console.log("bitcoin price: " + d.data)
  const e = d.data;
  const g = JSON.parse(e);
  /*  const r = JSON.parse(d.data, (key, value) => {
    console.log(`vv: ${key} = ${value}`);
  }); */

  inside(g);

  Object.keys(g).forEach((key) => {
    console.log('__' + key, g[key]);
  });


/*   for (var prop in g) {
    console.log("Key:" + prop + " == " + g[prop]);
}

inside(g)

   console.log("a key = " + g.a)
 */
  // console.log(r);

  /* JSON.parse(d.data, (key, value) => {
    console.log(key);for (var prop in jsonObject) {for (var prop in jsonObject) {
        alert("Key:" + prop);
        alert("Value:" + jsonObject[prop]);
    }
        alert("Key:" + prop);
        alert("Value:" + jsonObject[prop]);
    }
  }); */

  // console.log(Object.keys(r).indexOf(''+12) > -1); // true
  /*  r.filter((a) => {
    console.log('a:' + a);

  }); */
});

jStrip7.getData('{ "a": 12, "b": 15, "c" : "sss", "d": 1234, "e" : { "a" : 1111, "e2" : 2222 }, "f" : 88, "h": { "aa" : { "aaaaa" : 2332}}, "g" : 2333}').marker('m1');
/*
  var lookup = { 12: { foo: 'b'}, 13: { foo: 'a' }, 14: { foo: 'c' }};
console.log(Object.keys(lookup).indexOf(12) > -1); // false
console.log(Object.keys(lookup).indexOf(''+12) > -1); // true

var items = [ { id: 1 }, { id: 2}, { id: 3}, { id: 4 }];
// only include items with even id's
items = items.filter(function(item){
  return (item.id % 2 == 0);
}); */
