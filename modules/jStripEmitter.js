/**
 * jStrips own event emitter class
 * @module jStripEmitter Class
 */
module.exports = class jStripEmitter {
  constructor() {
    this.events = {};
  }

  emit(eventName, ...data) {
    const event = this.events[eventName];
    if (event) {
      event.forEach((fn) => {
        fn.call(null, ...data);
      });
    }
  }

  on(eventName, fn) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].push(fn);

    const that = this;
    return (that.events[eventName].filter(eventFn => fn !== eventFn));
  }
};
