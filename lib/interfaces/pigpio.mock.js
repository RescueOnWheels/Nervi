const { EventEmitter } = require('events');

class Gpio extends EventEmitter {
  constructor(gpio, options) {
    super();

    this.gpio = gpio;
    this.options = options;

    this.triggerEvent = (eventName, eventData) => {
      this.emit(eventName, eventData);
    };
  }

  /* mode */
  static get INPUT() { return 0; } // PI_INPUT

  /* pull up/down resistors */
  static get PUD_DOWN() { return 1; } // PI_PUD_DOWN;

  /* isr */
  static get EITHER_EDGE() { return 2; } // EITHER_EDGE;
}

module.exports = {
  Gpio,
};
