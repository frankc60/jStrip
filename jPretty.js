const prettyJson = (strEvents) => {
  let tmp = '';
  const events = JSON.parse(strEvents); // json needs to arrive stringified

  function pJson(events, top = '') {
    Object.keys(events).forEach((i) => {
      if (typeof events[i] === 'object') {
        let rtn;
        if (Object.prototype.toString.call(events) === '[object Array]') {
          rtn = (`${top}.[${i}]`);
        } else { rtn = (`${top}.${i}`); }
        pJson(events[i], rtn);
      } else if (Object.prototype.toString.call(events) === '[object Array]') {
        tmp += `{}${top}[${i}] = ${events[i]}\n`;
      } else {
        tmp += `{}${top}.${i} = ${events[i]}\n`;
      }
    });
  }
  pJson(events);
  return tmp;
};

const jPretty = obj => prettyJson((obj));

module.exports = jPretty;
