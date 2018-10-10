const { Gpio } = require('pigpio');

const INPUT_RANGE = 2;
/**
 * Servo class
 *
 * @class
 */
class Servo {
  /**
   *
   * @param {Number} pin The gpio pin on the pi.
   * @param {Number} min Optional minimum range. (default = 1000)
   * @param {Number} max Optional maximum range. (default = 2500)
   */
  constructor(pin, min = 1000, max = 2500) {
    this.servoPin = new Gpio(pin, { mode: Gpio.OUTPUT });

    this.servoMin = min;
    this.servoMax = max;

    this.pulseWidth = 1000;
    this.increment = 100;
  }

  /**
   * Move servo to possition.
   *
   * @param {Number} posArg Possition
   */
  moveTo(posArg) {
    let pos = posArg;

    pos += INPUT_RANGE / 2;

    this.servoPin.servoWrite((pos * (this.servoMax - this.servoMin) / INPUT_RANGE) + this.servoMin);
  }
}
module.export = Servo;
