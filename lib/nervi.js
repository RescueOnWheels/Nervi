/**
 * Dual-axis camera platform.
 */
const CameraMount = require('./cameraMount');

/**
 * Rotary Encoder.
 */
const Rotary = require('./rotary');

/**
 * Ultrasonic Sensor (HC-SR04).
 */
const Ultrasonic = require('./ultrasonic');

/**
 * Class representing the nerve system (Nervi) of a single Rover.
 */
class Nervi {
  /**
   * Initialize all sensors and actuators.
   */
  constructor() {
    /**
     * Dual axis camera mount
     */
    this.cameraMount = new CameraMount(12, 18);

    /**
     * Rotary encoder on the right front wheel.
     */
    this.rightRotary = new Rotary(4);

    /**
     * Ultrasonic sensor on the front of the Rover
     */
    this.ultrasonicFront = new Ultrasonic(6, 5);
  }
}

/**
 * Singleton because `require` caches the value assigned to `module.exports`,
 * all calls to `require` will return this same instance.
 */
module.exports = exports = new Nervi(); // eslint-disable-line no-multi-assign
