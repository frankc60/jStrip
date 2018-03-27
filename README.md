# jStrip

Pass a webpage uri with pure [jQuery](http://api.jquery.com/) to jStrip and retrieve the results. The results are returned via a Promise or Async/Await, examples below.

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

jStrip returns an **object**, with four properties:
* data: the results from your jquery selector.
* timed: milliseconds taken for uri retrieval.
* uri: the uri of the page.
* jquery: the jquery executed on the uri.

for example:

```js
{
  data:  "Sunny with light winds.",
  timed: 1238,
  uri: "http://www.my-weather.co.nz",
  jquery: "$('div#weatherDesc').html()"
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

## Versioning

We use [SemVer](http://semver.org/) for versioning. 

## Authors

* **Frank C** - [frankc60](https://github.com/frankc60)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

