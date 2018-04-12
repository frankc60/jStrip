# jStrip

[![NPM](https://nodei.co/npm/jstrip.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/jstrip/)<br/>
[![Build Status](https://travis-ci.org/frankc60/jStrip.svg?branch=master)](https://travis-ci.org/frankc60/jStrip)
[![Dependencies](https://david-dm.org/frankc60/jStrip.svg)](https://www.npmjs.com/package/jstrip?activeTab=dependencies)
[![Coverage Status](https://coveralls.io/repos/github/frankc60/jStrip/badge.svg)](https://coveralls.io/github/frankc60/jStrip)
[![Join the chat at https://gitter.im/jStrip_npm/Lobby](https://badges.gitter.im/jStrip_npm/Lobby.svg)](https://gitter.im/jStrip_npm/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

jStrip let's you easily grab data from the web or text and apply multiple methods to change the data to your liking. jStrip returns the data Async, allowing for smooth operations.

**New** `v 2.0` now has chainable methods. With an **on()** method to capture async operations. Grab data from the web or use your own text. Easy to Use. I will updating this readme file over the next week or so with new *features*. To keep your `v 1.0` code working as before, please read the Migration section below.

## Installing

Start with installing **jStrip**.
Install with npm.

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

jStrip allows you to append as many manipulation tools as you like by simply chaining the methods together with a dot delimiter. For Example:

```js
jStrip4.getData('https://www.timeanddate.com/worldclock/fullscreen.html?n=264').selector("div#rs1").marker("marker2").selector("#i_time").marker("marker3")
jStrip4.pretty().show();
```

### First method - getData()

The only requirement is to first grab the data before changing it. Start by using the getData() method.

getData() can accept 2 values: a **URL** or **text**.

```js
jStrip1.getData("http://www.google.com")
//or
jStrip1.getData("my own string of text here!")
```

### pretty()

pretty() will format the data it is given. This is great for tidying html, xml or standard text.

```js
jStrip1.getData("hello    world").pretty()  // hello world (removed extra spaces)
```

### selector(*jquery*)

selector() lets you grabs html from the data. Check out the many available [jQuery selectors](https://api.jquery.com/category/selectors/) you can use.

```js
jStrip1.getData("http://www.google.com").selector("div span:first-child")
```

### show()

show() displays the contents to the console output.

```js
jStrip1.getData("hello world").show()   //hello world
```
### replace(*regex, string*)

Use regular expression to replace content. **regex** is a [regular expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions). 
**string** is quoted text.

```js
jStrip5.getData('hello world').selector('title').replace(/hello/,"hi there").show() // hi there world
```

## marker() and on()

Grabbing html data from the web is not instant, so jStrip provides an **event handler** to tell you when it has all it's data ready, Asynchronously.

Set a marker (or many) in your jStrip call, simply by using the **marker()** method and naming it anything.

```js
jStrip1.getData("http://www.messyhtml.com").marker("marker1").pretty().marker("marker2")
```

Display the markers asynchronously with the **on()** method. 
Two parameters are needed, the named marker to trigger on and a function to execute.
jStrip returns an object, with a property 'data' containing the content.

```js
jStrip1.on("marker1",(d) => {
  console.log(`html ${d.data}`);
});

jStrip1.on("marker2",(d) => {
  console.log(`pretty html ${d.data}`);
});
```
*The **on()** event handler should be placed before the **marker()** is set.

## Migrating from Version 1 to Version 2

To keep your `v 1.0` code working with `v 2`, make these two simple updates to your existing code:

- Create a seperate instance for each jStrip call, with the **new** operator.

```js
let jStripInstance1 = new jStrip(); //new version 2 way
```

- Call the _jStrip() method:

```js
jStrip("<URL>","<jQuery>")  //older version 1 way
```

 to

 ```js
 jStripInstance1._jStrip("<URL>","<jQuery>") //new version 2 way
 ```

That's all!

You can still use `Version 1` features together with all `Version 2`.


## _jStrip("url","jquery")

_jStrip() can be written as a **Promise** or as **Async/Await**.

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