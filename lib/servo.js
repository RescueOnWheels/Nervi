/**
 * Dependencies
 *
 */
const { Gpio } = require('pigpio');
/**
 * Class representing the servo used by the rover.
 *
 */
class Servo {
/**
 * Create a servo.
 *
 * @param {Number} pin - The pin connected to the servo.
 */
  constructor(pin) {
    this.servo = new Gpio(pin, {
      mode: Gpio.OUTPUT,
    });
  }

  /**
   * Move servo to value given in the parameter.
   *
   * @param {Number} value - The value that the servo should move to
   */
  moveTo(value) {
    this.servo.servoWrite(value);
  }
}
module.exports = Servo;
