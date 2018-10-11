/**
 * Sensors
 */
const Rotary = require('./rotary');

/**
 * Class representing the nerve system (Nervi) of a single Rover.
 *
 * @class
 */
class Nervi {
  /**
   * Create a Nervi.
   *
   * @constructor
   */
  constructor() {
    super();

    /**
     * Rotary encoder on the right front wheel.
     */
    this.rightRotary = new Rotary(4);
  }
}

/**
 * Constructor
 *
 * Allows the user to create their own instance of Nervi.
 */
Nervi.prototype.Nervi = Nervi;

/**
 * Singleton
 *
 * Because `require` caches the value assigned to `module.exports`,
 * all calls to `require` will return this same instance.
 */
module.exports = exports = new Nervi(); // eslint-disable-line no-multi-assign
