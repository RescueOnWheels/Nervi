/* Dependencies */
const HMC5883L = require('./interfaces/hmc5883l');

/* Auxilio */
const {
  Debug,
} = require('./Auxilio');

/* Debug */
const debug = Debug('RRS:Nervi:Compass');

/**
 * Default interval time in miliseconds.
 */
const DEFAULT_INTERVAL = 250;

/**
 * Class representing a compass (HMC5883L).
 */
class Compass {
  /**
   * Setup the compass.
   */
  constructor() {
    /**
     * Compass (HMC5883L).
     */
    this.compass = new HMC5883L(1);

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
     * Enable the interval on the default interval time.
     */
    this.setInterval(DEFAULT_INTERVAL);
  }

  /**
   * Enables the heading interval on the default interval time.
   */
  enable() {
    this.setInterval(DEFAULT_INTERVAL);
  }

  /**
   * Disable the heading interval.
   */
  disable() {
    clearInterval(this.headingInterval);
    this.headingInterval = null;
  }

  /**
   * Sets the degrees property to -1 or the provided value depending on the error status.
   *
   * @function
   * @param {Object} err - Error object, null if there was no error.
   * @param {Number} degrees - Number of degrees.
   */
  setDegrees(err, degrees) {
    this.degrees = Math.round(err ? -1 : degrees);
    debug('Current degrees: %d°', this.degrees);
  }

  /**
   * Set the interval time of the heading function.
   *
   * @function
   * @param {Number} interval - Number of miliseconds between each measurement.
   */
  setInterval(interval) {
    interval = Math.max(interval, 0); // eslint-disable-line no-param-reassign

    /**
     * Stores a reference to `this`.
     */
    const self = this;

    /**
     * Reset the previous interval.
     */
    clearInterval(self.headingInterval);

    /*
     * Trigger an update once per specified interval.
     */
    this.headingInterval = setInterval(() => self.compass.getHeadingDegrees('x', 'z', self.setDegrees.bind(self)), interval);
  }
}

module.exports = Compass;
