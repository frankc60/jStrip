# jStrip

[![NPM](https://nodei.co/npm/jstrip.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/jstrip/)<br/>
[![Downloads](http://img.shields.io/npm/dw/jstrip.svg)](https://www.npmjs.com/package/jstrip)
[![Build Status](https://travis-ci.org/frankc60/jStrip.svg?branch=master)](https://travis-ci.org/frankc60/jStrip)
[![Dependencies](https://david-dm.org/frankc60/jStrip.svg)](https://www.npmjs.com/package/jstrip)
[![Gitter](https://img.shields.io/gitter/room/nwjs/nw.js.svg)](https://gitter.im/jStrip_npm/Lobby)


Pass a webpage uri with pure [jQuery](http://api.jquery.com/) to jStrip and retrieve the results. The results are returned as an object via a Promise or Async/Await, examples below.

## Installing

Start with installing **jStrip**.
Install with npm.

```js
$ npm i -S jstrip
```

Include **jStrip** into your code.

```js
const jStrip = require('jstrip');
```

jStrip takes 2 String Parameters, comma delimited: **uri** and pure **jQuery**.
For example:

```js
jStrip("http://www.google.com","$('title').html()");
```

jStrip returns an **object**, with five properties:

<pre>
1. data:       the results from your jquery selector.
2. timed:      milliseconds taken for uri retrieval.
3. uri:        the uri of the page.
4. jquery:     the jquery executed on the uri.
5. statuscode: statusCode returned from uri.
</pre>

for example:

```js
{
  data:  "Sunny with light winds.",
  timed: 1238,
  uri: "http://www.my-weather.co.nz/132443",
  jquery: "$('div#weatherDesc').html()",
  statuscode: 200
}
```

jStrip can be written as a **Promise** or as **Async/Await**.

### Using Promises

```js
// Using Promise
jStrip('https://www.bing.com', "$('title').html()")
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
    const result = await jStrip('https://www.youtube.com', "$('title').html()");
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
To run the test suite, first install the dependencies, then run npm test:

```js
$ npm install
$ npm test
```

Automated CI test runs are also available. [![Build Status](https://travis-ci.org/frankc60/jStrip.svg?branch=master)](https://travis-ci.org/frankc60/jStrip)

## Versioning

We use [SemVer](http://semver.org/) for versioning. 

## Authors

* **Frank C** - [frankc60](https://github.com/frankc60)

##Contributing
If you have some suggestions or ideas drop me a line. [![Gitter](https://img.shields.io/gitter/room/nwjs/nw.js.svg)](https://gitter.im/jStrip_npm/Lobby)

## License

This project is licensed under the MIT License. [![GitHub license](https://img.shields.io/github/license/frankc60/jStrip.svg?longCache=true)](https://github.com/frankc60/jStrip/blob/master/LICENSE)

