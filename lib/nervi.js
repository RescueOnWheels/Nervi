/**
 * Dual-axis camera platform.
 */
const CameraMount = require('./cameraMount');

/**
 * Compass (hmc5883l)
 */
const Compass = require('./compass');

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
     * Compass (hmc5883l)
     */
    this.compass = new Compass();

    /**
     * Rotary encoder on the right front wheel.
     */
    this.rightRotary = new Rotary(4);

    /**
     * Ultrasonic sensor on the left of the Rover.
     */
    this.ultrasonicLeft = new Ultrasonic(24, 23);

    /**
     * Ultrasonic sensor on the front of the Rover
     */
    this.ultrasonicFront = new Ultrasonic(6, 5);

    /**
     * Ultrasonic sensor on the right side of the Rover.
     */
    this.ultrasonicRight = new Ultrasonic(27, 17);
  }
}

/**
 * Singleton because `require` caches the value assigned to `module.exports`,
 * all calls to `require` will return this same instance.
 */
module.exports = exports = new Nervi(); // eslint-disable-line no-multi-assign
