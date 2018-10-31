/* Dependencies */
const { Gpio } = require('pigpio');

/* Helpers */
const normalize = require('./helpers/normalize');

/**
 * Class representing a servo.
 */
class Servo {
  /**
   * Create a servo.
   *
   * @param {Number} pin - An unsigned integer specifying the GPIO number.
   */
  constructor(pin) {
    this.servo = new Gpio(pin, {
      mode: Gpio.OUTPUT,
    });
  }

  /**
   * Starts servo pulses at 50Hz on the GPIO, 500 (most anti-clockwise) to 2500 (most clockwise).
   *
   * @param {Number} value - Pulse width in microseconds, a number in the range 500 through 2500.
   */
  moveTo(value) {
    value = normalize(value, 500, 2500, true);
    this.servo.servoWrite(value);
  }
}

module.exports = Servo;
