const jStrip = require('./jStrip');

// Using Promise
jStrip('https://www.bing.com', "$('title').html()")
  .then((result) => {
    console.log(`promise result: ${result.data}
      time taken: ${result.timed}
      uri: ${result.uri}
      jquery: ${result.jquery}
      statusCode: ${result.statuscode}`);
  })
  .catch((e) => {
    console.log(`Error: ${e}`);
  });


// Using Async/Await
const fn = (async () => {
  try {
    const result = await jStrip('https://www.lloydsbank.com/', "$('title').html()");
    await console.log(`async/await result: ${result.data}
      time taken: ${result.timed}
      uri: ${result.uri}
      jquery: ${result.jquery}
      statusCode: ${result.statuscode}`);
    } catch (err) {
    console.log(`error ${err}`);
  }
})();

