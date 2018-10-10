const Servo = require('./servo');

/**
 * CameraMount class for the camera mount
 *
 * @class
 */
class CameraMount {
  /**
   * Setup the camera mount.
   *
   * @constructor
   */
  constructor() {
    this.servoHorizontal = new Servo(12, 1000, 2300);
    this.servoVertical = new Servo(18);
  }
  /**
   * Move cameraMount to possition
   *
   * @param {number} xArg arg for horizontal
   * @param {number} yArg arg for vertical
   */
  goTo(xArg, yArg) {
    this.servoHorizontal.moveTo(xArg);
    this.servoVertical.moveTo(yArg);
  }
}
module.export = CameraMount;
