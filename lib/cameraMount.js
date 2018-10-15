/**
 * Dependencies
 */
const Servo = require('./servo');

/**
 * Vertical servo minimum value (calculation usesthis as max).
 */
const VERTICAL_MIN = 1800;

/**
 * Class representing a single camera mount (dual axis).
 *
 * @class
 */
class CameraMount {
  /**
   * Initialize dual axis mount.
   *
   * @param {Number} pinHorizontal - Horizontal servo pin.
   * @param {Number} pinVertical - Vertical servo pin.
   */
  constructor(pinHorizontal, pinVertical) {
    this.servoHorizontal = new Servo(pinHorizontal);
    this.servoVertical = new Servo(pinVertical);
  }

  /**
   * Move the mount to the specified position.
   *
   * @function
   * @param {Number} xArg - Argument for the horizontal position.
   * @param {Number} yArg - Argument for the vertical position.
   */
  moveTo(xArg, yArg) {
    let x = xArg;
    x += 1; // From -1/1 to 0/2.
    x /= 2; // From -0/2 to 0/1.
    x = ((2500 - 1000) * x) + 1000;

    let y = yArg;
    y += 1; // From -1/1 to 0/2.
    y /= 2; // From -0/2 to 0/1.
    y = ((VERTICAL_MIN - 1000) * y) + 1000;

    this.servoHorizontal.moveTo(x);
    this.servoVertical.moveTo(y);
  }
}

module.export = CameraMount;
