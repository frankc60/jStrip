# jStrip

[![NPM](https://nodei.co/npm/jstrip.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/jstrip/)<br/>
[![Build Status](https://travis-ci.org/frankc60/jStrip.svg?branch=master)](https://travis-ci.org/frankc60/jStrip)
[![Dependencies](https://david-dm.org/frankc60/jStrip.svg)](https://david-dm.org/frankc60/jStrip)
[![Coverage Status](https://coveralls.io/repos/github/frankc60/jStrip/badge.svg)](https://coveralls.io/github/frankc60/jStrip)
[![Join the chat at https://gitter.im/jStrip_npm/Lobby](https://badges.gitter.im/jStrip_npm/Lobby.svg)](https://gitter.im/jStrip_npm/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

jStrip let's you easily grab data from the web or from text and apply multiple filters to change the data to your liking, before it's returned asynchronously.

**New** `v 2.x` now comes with chainable methods and event handlers.  New features being added regularly. *To keep your `v 1.x` code working as before, please read the Migration section below.*

## Example

```js
const jStrip = require("jstrip");

let jStrip1 = new jStrip();

jStrip1.on("marker1", (d) => {
  console.log(`current time in nz is: ${d.data}`);
  console.log(`url: ${d.url}`); // https://goo.gl/e234y2
});

jStrip1.getData('https://goo.gl/e234y2').selector("div#rs1")
  .selector("#i_time").marker("marker1");
jStrip1.pretty().show();

```

### Install

Install **jstrip** with [npm](https://www.npmjs.com/):

```sh
$ npm i -S jstrip
```

Include **jStrip** and create an instance.

```js
const jStrip = require('jstrip'); //top of file
...
let jStrip1 = new jStrip();
```

## Chainable Methods

jStrip allows you to append as many filters as you like by simply chaining methods together with a dot delimiter. For example:

```js
jStrip4.getData('https://goo.gl/e234y2').selector("div#rs1")
    .selector("#i_time").pretty()
    .show();  //displays current time in new zealand
```

### First method - .getData(*url* | *text*)

The only requirement is to first grab the data. Start by using the `.getData()` method.

`getData()` accepts 2 string types: a **"url"** or **"text"**.

```js
jStrip1.getData("http://www.google.com") // url
//or
jStrip1.getData("my own string of text here!") // string
```
If you use a **url** the default timeout for the http/s request is 10000 milli-seconds. You can change this per instance by changing the timeout property.

```js
jStrip1.timeout = 15000;
console.log(jStrip1.timeout); // 15000 - 15 seconds
```

### .show()

`show()` displays the contents to the console. Great for seeing the results, see **.marker() and .on()** below to add an event handler.

```js
jStrip1.getData("hello world").show()   //hello world
```

### .pretty()

`pretty()` will format the data it is given. This is great for tidying html, xml or standard text.

```js
jStrip1.getData("hello    world")
    .pretty().show();  // hello world (removes extra spaces)
```

### .selector(*jquery*)

`selector()` lets you grabs html from the data using **jQuery** functionality. Check out the many available [jQuery selectors](https://api.jquery.com/category/selectors/) you can use.

```js
jStrip1.getData("http://www.news.com")
    .selector("div#top li:nth-child(2)")
    .show(); //2nd li tag inside div with id 'top'
```

### .replace(*pattern*, *text*)

Use a [regular expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions) or string pattern to search the jStrip content, followed by the replacement string.

```js
jStrip5.getData('hello world').replace(/hello/,"ki ora")
     .show() // ki ora world
```

### .removehtml()

html elements are stripped out.

```js
jStrip5.getData('<h1hello</h1> <p>world</p>').removehtml()
     .show() // hello world
```

### .uppercase()

convert string contents to upper case.

```js
jStrip5.getData('hello world').uppercase()
     .show() // HELLO WORLD
```

### .lowercase()

convert string contents to lower case.

```js
jStrip5.getData('HELLO WORLD').lowercase()
     .show() // hello world
```

## Async Event Handlers .marker() and .on()

Grabbing data from the web is not instant, so jStrip **caches** the filters and provides an **event handler** to tell you when it has all it's data ready, and send it asynchronously without blocking.

Set a **marker** (or many) in your jStrip call, simply by using the **marker()** method and giving it a unique name.

#### .marker(*eventname*)

```js
jStrip1.getData("have  a   nice   day")
    .marker("marker1") // 1st marker
    .pretty().marker("marker2"); //  2nd marker
```

Display the markers asynchronously with the **on()** event handler.
Two parameters are needed: the named marker() to trigger on followed with a function,
jStrip returns an object to the function, with 3 properties:
- `data`  - containing the content
- `type`  - datatype (*string* | *url* | *json*)
- `url`   - url address used, if type is 'url', otherwise equals undefined.

#### .on(*marker name*, *function(returned data)*)

```js
jStrip1.on("marker1",(d) => {  //       first marker
  console.log(`html ${d.data}`); //     have  a   nice   day
  console.log(`datatype ${d.type}`); // string
  console.log(`url ${d.url}`); //       undefined
});

jStrip1.on("marker2",(d) => {  //           second marker
  console.log(`pretty html ${d.data}`);  // have a nice day
});
```

- The **on()** event handler(s) should be placed before the **marker()** is set.

## Migrating from Version 1 to Version 2

To keep your `v 1.x` code working with `v 2.x`, make these two simple updates to your existing code:

- Create a seperate instance for each jStrip call, with the **new** operator.

```js
let jStripInstance1 = new jStrip(); //new version 2 way
```

- Replace your jStrip call with _jStrip():

```js
jStrip("<URL>","<jQuery>")  //older version 1 way
```

 to

 ```js
 jStripInstance1._jStrip("<URL>","<jQuery>") //new version 2 way
 ```

That's all!

You can still use `Version 1` features together with `Version 2`.

## _jStrip( *"url", "jquery"* )

_jStrip() returns data via a **Promise** or as **Async/Await**.

### Using Promises

```js
// Using Promise
jStripInstance1._jStrip('https://www.bing.com', "$('title').html()")
  .then((result) => {
    console.log(`promise result: ${result.data}
      time taken: ${result.timed}
      uri: ${result.uri}
      jquery: ${result.jquery}`);
  })
  .catch((e) => {
    console.log(`Error: ${e}`);
  });
```

### Using Async/Await

```js
// Using Async/Await
const fn = (async () => {
  try {
    const result = await jStripInstance1._jStrip('https://www.youtube.com', "$('title').html()");
    await console.log(`async/await result: ${result.data}
      time taken: ${result.timed}
      uri: ${result.uri}
      jquery: ${result.jquery}`);
  } catch (err) {
    console.log(`error ${err}`);
  }
})();
```

## Tests

Automated CI test builds are run with each update. [![Build Status](https://travis-ci.org/frankc60/jStrip.svg?branch=master)](https://travis-ci.org/frankc60/jStrip) [![Coverage Status](https://coveralls.io/repos/github/frankc60/jStrip/badge.svg)](https://coveralls.io/github/frankc60/jStrip)

## Versioning

We use [SemVer](http://semver.org/) for versioning.

## Get Involved

### Issues

If you have an issue, or a bug let us know and we will do our best.

Create an issue [here](https://github.com/frankc60/jStrip/issues).

### Contributing

If you have any questions, comments, suggestions or ideas, feel free to drop me a line. [![Join the chat at https://gitter.im/jStrip_npm/Lobby](https://badges.gitter.im/jStrip_npm/Lobby.svg)](https://gitter.im/jStrip_npm/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
We'd love to hear your suggestions and ideas!

## Authors

- **Frank C** - [frankc60](https://github.com/frankc60)

## License

This project is licensed under the MIT License. [![GitHub license](https://img.shields.io/github/license/frankc60/jStrip.svg?longCache=true)](https://github.com/frankc60/jStrip/blob/master/LICENSE)