/* Auxilio */
const {
  Debug,
  normalize,
} = require('./Auxilio');

/* Debug */
const debug = Debug('RRS:Nervi:CameraMount');

/* Dependencies */
const Servo = require('./servo');

/**
 * Lower limit of the horizontal servo.
 */
const HORIZONTAL_MIN = 500;

/**
 * Upper limit of the horizontal servo.
 */
const HORIZONTAL_MAX = 2500;

/**
 * Lower limit of the vertical servo.
 */
const VERTICAL_MIN = 500;

/**
 * Upper limit of the vertical servo.
 */
const VERTICAL_MAX = 1800;

/**
 * Class representing a dual-axis platform.
 */
class CameraMount {
  /**
   * Setup the dual-axis platform.
   *
   * @param {Number} pinHorizontal - An integer specifying the GPIO number of the horizontal servo.
   * @param {Number} pinVertical - An integer specifying the GPIO number of the vertical servo.
   */
  constructor(pinHorizontal, pinVertical) {
    this.servoHorizontal = new Servo(pinHorizontal);
    this.servoVertical = new Servo(pinVertical);
    this.moveTo(0, 0);
  }

  /**
   * Move the camera mount to the specified position.
   *
   * @param {Number} xArg - Argument for the horizontal position.
   * @param {Number} yArg - Argument for the vertical position.
   */
  moveTo(xArg, yArg) {
    /* Validate input */
    let x = normalize(xArg, -1, 1);

    /* Convert and validate */
    x += 1;
    x /= 2;
    x = ((HORIZONTAL_MAX - HORIZONTAL_MIN) * x) + HORIZONTAL_MIN;
    x = normalize(x, HORIZONTAL_MIN, HORIZONTAL_MAX, true);

    /* Validate input */
    let y = normalize(yArg, -1, 1);

    /* Convert and validate */
    y += 1;
    y /= 2;
    y = ((VERTICAL_MAX - VERTICAL_MIN) * y) + VERTICAL_MIN;
    y = normalize(y, VERTICAL_MIN, VERTICAL_MAX, true);

    /* Debug it */
    debug('Moving platform to [X: %d, Y: %d]', x, y);

    /* Write to the servo's */
    this.servoHorizontal.moveTo(x);
    this.servoVertical.moveTo(y);
  }
}

module.exports = CameraMount;
