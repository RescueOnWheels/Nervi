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
     * Last calculated speed.
     */
    this.lastSpeed = 0;

    /**
     * Timestamp of last calculation.
     */
    this.lastCheck = 0;

    /**
     * Handle interrupt in a separate function.
     */
    this.rotary.on('interrupt', this.onInterrupt.bind(this));

    setInterval(() => {
      const distance = WHEEL_CIRCUMFERENCE * (this.count / WHEEL_SPOKES);
      const time = Date.now() - this.lastCheck() / 1000;
      const speed = distance / time;

      debug(`Traveled ${Math.round(distance)} in ${Math.round(time)}ms, average speed of ${Math.round(speed)} M/ms`);
    }, 500);
  }

  /**
   * Handle the interrupt triggered by the rotary encoder.
   *
   * @function
   */
  onInterrupt() {
    this.count += 1;
  }
}

module.exports = Rotary;
