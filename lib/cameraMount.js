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
}
module.export = CameraMount;
