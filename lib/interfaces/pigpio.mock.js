/* eslint-disable class-methods-use-this */

/* Dependencies */
const { EventEmitter } = require('events');

class Gpio extends EventEmitter {
  constructor(gpio, options) {
    super();

    this.gpio = gpio;
    this.options = options;
  }

  /**
   * Sets the GPIO level to 0 or 1.
   * If PWM or servo pulses are active on the GPIO they are switched off. Returns this.
   */
  digitalWrite() {
    // TBD
  }

  /**
   * Sends a trigger pulse to the GPIO.
   * The GPIO is set to level for pulseLen microseconds and then reset to not level.
   */
  trigger() {
    // TBD
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
