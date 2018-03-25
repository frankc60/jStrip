const jStrip = require('./jStrip');


// Using Promise
jStrip('https://www.bing.com', "$('title').html()")
  .then((result) => {
    console.log(`promise result: ${result}`);
  })
  .catch((e) => {
    console.log(`Error: ${e}`);
  });


// Using Async/Await
const fn = (async () => {
  try {
    const result = await jStrip('https://www.youtube.com', "$('title').html()");
    await console.log(`async/await result: ${result}`);
  } catch (err) {
    console.log(`error ${err}`);
  }
})();
