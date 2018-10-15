/**
 * Rotary Encoder.
 */
const Rotary = require('./rotary');

/**
 * Ultrasonic Sensor (HC-SR04).
 */
const Ultrasonic = require('./ultrasonic');

const CameraMount = require('./cameraMount');
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
    /**
     * Rotary encoder on the right front wheel.
     */
    this.rightRotary = new Rotary(4);

    /**
     * Ultrasonic sensor on the left side of the Rover.
     */
    this.ultrasonicLeft = new Ultrasonic(27, 17);

    /**
     * Ultrasonic sensor on the right side of the Rover
     */
    this.ultrasonicRight = new Ultrasonic(6, 5);

    /**
     * Ultrasonic sensor on the front of the Rover.
     */
    this.ultrasonicFront = new Ultrasonic(24, 23);
    
    /**
     *
     */
    this.cameraMount = new CameraMount();
  }
}

/**
 * Class representing the nerve system (Nervi) of a single Rover.
 *
 * @class
 */
Nervi.prototype.Nervi = Nervi;

/**
 * Singleton
 *
 * Because `require` caches the value assigned to `module.exports`,
 * all calls to `require` will return this same instance.
 */
module.exports = exports = new Nervi(); // eslint-disable-line no-multi-assign
