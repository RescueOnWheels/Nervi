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
          x: 6007.17,
          y: -3512.395,
          z: 64.97,
        },
        scale:
        {
          x: 0.7644414006669843,
          y: 1.517855031334989,
          z: 30.2747641509434,
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
    this.headingInterval = setInterval(() => self.compass.getHeadingDegrees('x', 'z', self.setDegrees.bind(self)), 5);
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
