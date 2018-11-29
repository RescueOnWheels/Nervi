/* Dependencies */
const { EventEmitter } = require('events');
const Gpio = require('./interfaces/pigpio');

/* Auxilio */
const {
  Debug,
} = require('./Auxilio');

/* Debug */
const debug = Debug('RRS:Nervi:Rotary');

/**
 * Default interval time in miliseconds.
 */
const DEFAULT_INTERVAL = 500;

/**
 * Number of spokes.
 */
const WHEEL_SPOKES = 20;

/**
 * Diamater of the wheels in meters.
 */
const WHEEL_DIAMETER = 65 / 1000;

/**
 * Circumference of the wheels in meters.
 */
const WHEEL_CIRCUMFERENCE = Math.PI * WHEEL_DIAMETER;

/**
 * Class representing a rotary encoder.
 */
class Rotary extends EventEmitter {
  /**
   * Setup the rotary encoder.
   *
   * @param {Number} pin - GPIO number, not the physical number.
   */
  constructor(pin) {
    /* Initialize EventEmitter. */
    super();

    /**
     * Stores a reference to `this`.
     */
    const self = this;

    /**
     * The rotary encoder.
     */
    this.rotary = null;

    /* Setup the GPIO pin. */
    this.rotary = new Gpio(pin, {
      mode: Gpio.INPUT,
      pullUpDown: Gpio.PUD_DOWN,
      edge: Gpio.EITHER_EDGE,
    });

    /**
     * Number of interrupts.
     */
    this.count = 0;

    /**
     * Last calculated average speed.
     */
    this.lastSpeed = 0;

    /**
     * Timestamp of last calculation.
     */
    this.lastCheck = Date.now();

    /* Handle interrupt in a separate function. */
    this.rotary.on('interrupt', this.onInterrupt.bind(self));

    /**
     * Interval to calculate the average speed;
     * between the current and previous interval.
     */
    this.setInterval(DEFAULT_INTERVAL);
  }

  /**
   * Set the interval time of the speed function.
   *
   * @param {Number} interval - Number of miliseconds between each measurement.
   */
  setInterval(interval) {
    /* Intreval must be a positive number */
    interval = Math.max(interval, 10); // eslint-disable-line no-param-reassign

    /**
     * Stores a reference to `this`.
     */
    const self = this;

    /* Reset the previous interval. */
    clearInterval(self.interval);

    /* Trigger an update once per specified interval. */
    this.interval = setInterval(this.calculateSpeed.bind(self), interval);
  }

  /**
   * Enables the speed interval on the default interval time.
   */
  enable() {
    this.setInterval(DEFAULT_INTERVAL);
  }

  /**
   * Disable the speed interval.
   */
  disable() {
    clearInterval(this.interval);
    this.interval = null;
  }

  /**
   * Calcutes the average speed.
   */
  calculateSpeed() {
    /**
     * Time at which the calculation started.
     */
    const now = Date.now();

    /**
     * The total distance covered in meters.
     */
    const distance = WHEEL_CIRCUMFERENCE * (this.count / WHEEL_SPOKES);

    /**
     * The total time required to cover the distance in seconds.
     */
    const time = (now - this.lastCheck) / 1000;

    /**
     * Average speed in meters per second (m/s).
     */
    const speed = distance / time;

    /* Reset the interrupt variables. */
    this.count = 0;
    this.lastCheck = now;
    this.lastSpeed = speed;

    debug(`Traveled ${Math.round(distance)}m in ${Math.round(time)}s, with an average speed of ${Math.round(speed)} m/s.`);

    this.emit('data', { speed, distance });
  }

  /**
   * Handles the interrupts triggered by the rotary encoder.
   * Increases the interrupt count by one.
   */
  onInterrupt() {
    this.count += 1;
  }
}

module.exports = Rotary;
