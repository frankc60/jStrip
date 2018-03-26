# jStrip

Pass a webpage uri with jQuery ([cheerio](https://www.npmjs.com/package/cheerio)) to jStrip and retrieve the result. The result is returned via a Promise or Async/Await, examples below.

## Installing

Start with installing **jStrip**.
Install with npm.

```js
npm i -S jStrip
```

Include **jStrip** into your code.

```js
const jStrip = require('jStrip');
```

jStrip takes 2 String Parameters, comma delimited: [webpage] and [jQuery].
For example:

```js
jStrip("http://www.google.com","$('title').html()");
```

jStrip can be written as a **Promise** or as **Async/Await**.

### Using Promises

```js
// Using Promise
jStrip('https://www.bing.com', "$('title').html()")
  .then((result) => {
    console.log(`promise result: ${result}`);
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
    await console.log(`async/await result: ${result}`);
  } catch (err) {
    console.log(`error ${err}`);
  }
})();
```

## Versioning

We use [SemVer](http://semver.org/) for versioning. 

## Authors

* **Frank C** - [frankc60](https://github.com/frankc60)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

