# jStrip

Crawl a webpage, and return jQuery (Cheerio) result.

## Installing

Start with installing jStrip.
Install with npm.

```js
npm i -S jStrip
```

```js
const jStrip = require('./jStrip');
```

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

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Frank C** - [frankc60](https://github.com/frankc60)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

