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
    if (['x', 'y', 'z'].indexOf(axis1) === -1) {
      cb(new Error('Value provided for axis1 is not valid!'));
    } else if (['x', 'y', 'z'].indexOf(axis2) === -1) {
      cb(new Error('Value provided for axis2 is not valid!'));
    } else {
      cb(null, Math.random() * 360);
    }
  }
}

module.exports = HMC5883L;
