const { Gpio } = require('pigpio');

const INPUT_RANGE = 2;

/**
 * Class representing a single servo.
 *
 * @class
 */
class Servo {
  /**
   * Create a Servo object.
   *
   * @constructor
   * @param {Number} pin - The GPIO pin on the Raspberry Pi.
   * @param {Number} min - Optional minimum range; default value is 1000.
   * @param {Number} max - Optional maximum range; default value is 2500.
   */
  constructor(pin, min = 1000, max = 2500) {
    this.servoPin = new Gpio(pin, { mode: Gpio.OUTPUT });

    this.servoMin = min;
    this.servoMax = max;

    this.pulseWidth = 1000;
    this.increment = 100;
  }

  /**
   * Move servo to the specified position.
   *
   * @function
   * @param {Number} posArg - Target position.
   */
  moveTo(posArg) {
    let pos = posArg;

    pos += INPUT_RANGE / 2;

    this.servoPin.servoWrite((pos * (this.servoMax - this.servoMin) / INPUT_RANGE) + this.servoMin);
  }
}

module.export = Servo;
