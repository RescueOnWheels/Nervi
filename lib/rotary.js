/**
 * Debug dependencies
 */
const debug = require('debug')('RRS:Nervi:Rotary');

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
 * Dependencies
 */
const { EventEmitter } = require('events');
const { Gpio } = require('pigpio');

/**
 * Class representing a rotary encoder.
 *
 * @class
 * @extends EventEmitter
 */
class Rotary extends EventEmitter() {
  /**
   * Setup the rotary encoder.
   *
   * @constructor
   * @param {Number} pin - GPIO number, not the physical number.
   */
  constructor(pin) {
    super();

    /**
     * The rotary encoder.
     */
    this.rotary = null;

    /*
     * Setup the GPIO pin.
     */
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
    this.lastCheck = 0;

    /*
     * Handle interrupt in a separate function.
     */
    this.rotary.on('interrupt', this.onInterrupt.bind(this));

    /**
     * Interval to calculate the average speed;
     * between the current and previous interval.
     */
    this.interval = setInterval(this.calculateSpeed, 500);
  }

  /**
   * Calcutes the average speed.
   *
   * @function
   */
  calculateSpeed() {
    /**
     * Time at which the calculation started.
     */
    const now = Date.now();

    /**
     * The total distance covered.
     */
    const distance = WHEEL_CIRCUMFERENCE * (this.count / WHEEL_SPOKES);

    /**
     * The total time required to cover the distance.
     */
    const time = (now - this.lastCheck) / 1000;

    /**
     * Average speed in M/s.
     */
    const speed = distance / time;

    /*
     * Prevent spamming the environment.
     */
    if (speed === this.lastSpeed) {
      return;
    }

    /*
     * Reset the interrupt variables.
     */
    this.count = 0;
    this.lastCheck = now;
    this.lastSpeed = speed;

    debug(`Traveled ${Math.round(distance)} in ${Math.round(time)}ms, with an average speed of ${Math.round(speed)} m/s`);

    this.emit('speed', speed);
  }

  /**
   * Handles the interrupts triggered by the rotary encoder.
   * Increases the interrupt count by one.
   *
   * @function
   */
  onInterrupt() {
    this.count += 1;
  }
}

module.exports = Rotary;
