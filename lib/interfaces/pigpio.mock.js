const { EventEmitter } = require('events');

class Gpio extends EventEmitter {
  constructor(gpio, options) {
    super();

    this.gpio = gpio;
    this.options = options;
  }

  /**
   * Triggers the specified event as if it was emitted by the GPIO.
   *
   * @param {String} eventName - Name of the event to be triggered.
   * @param  {...any} args - Any arguments to be added to the event.
   */
  triggerEvent(eventName, ...args) {
    this.emit(eventName, ...args);
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
