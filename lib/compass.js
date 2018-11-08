/* Dependencies */
const HMC5883L = require('./interfaces/hmc5883l');

/**
 * Class representing a compass (HMC5883L).
 */
class Compass {
  /**
   * Setup the compass.
   */
  constructor() {
    this.compass = new HMC5883L(1, {
      calibrate: {
        offset: {
          x: 11.31499999999997,
          y: -403.68999999999994,
          z: -14.234999999999985,
        },
        scale: {
          x: 1.4924406047516199,
          y: 1.3391472868217054,
          z: 1.7146401985111663,
        },
      },
    });

    /**
     * Variable used to store the reference to the interval.
     * Used to clear and re-set the interval.
     */
    this.headingInterval = null;

    /**
     * Current angle based on the North and West heading.
     */
    this.degrees = -1;

    /**
     * Stores a reference to `this`.
     */
    const self = this;

    /*
     * Trigger an update every 5ms.
     */
    this.headingInterval = setInterval(() => self.compass.getHeadingDegrees('y', 'z', self.setDegrees.bind(self)), 5);
  }

  /**
   * Sets the degrees property to -1 or the provided value depending on the error status.
   *
   * @param {Object} err - Error object, null if there was no error.
   * @param {Number} degrees - Number of degrees.
   */
  setDegrees(err, degrees) {
    this.degrees = Math.round(err ? -1 : degrees);
  }
}

module.exports = Compass;
