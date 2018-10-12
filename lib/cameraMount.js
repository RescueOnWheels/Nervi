const Servo = require('./servo');

/**
 * Class representing the camera mount (dual axis).
 *
 * @class
 */
class CameraMount {
  /**
   * Create a camera mount object.
   *
   * @constructor
   */
  constructor() {
    this.servoHorizontal = new Servo(12, 1000, 2300);
    this.servoVertical = new Servo(18);
  }

  /**
   * Move the mount to the specified possition.
   *
   * @function
   * @param {Number} xArg - Argument for the horizontal position.
   * @param {Number} yArg - Argument for the vertical position.
   */
  goTo(xArg, yArg) {
    this.servoHorizontal.moveTo(xArg);
    this.servoVertical.moveTo(yArg);
  }
}

module.export = CameraMount;
