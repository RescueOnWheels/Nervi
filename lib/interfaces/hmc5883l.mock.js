/* eslint-disable class-methods-use-this */

/**
 * Class representing a HMC5883L.
 *
 * @class
 */
class HMC5883L {
  /**
   * Create a HMC5883L.
   *
   * @constructor
   * @param  {...any} args - Additional arguments.
   */
  constructor(...args) {
    this.args = args;
  }

  /**
   * Get the heading in decimal degrees, where heading is between 0 and 360 degrees.
   *
   * @function
   * @return {Number} The heading, value between 0 and 360 degrees.
   */
  getHeadingDegrees(axis1, axis2, cb) {
    const VALID_AXIS = ['x', 'y', 'z'];

    /* istanbul ignore if */
    if (VALID_AXIS.indexOf(axis1) < 0 || VALID_AXIS.indexOf(axis2) < 0 || axis1 === axis2) {
      cb(new Error('At least of the supplied axis are not valid, they must be different and one of:', VALID_AXIS));
    } else {
      cb(null, Math.random() * 360);
    }
  }
}

module.exports = HMC5883L;
