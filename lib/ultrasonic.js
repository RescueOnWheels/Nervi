/**
 * Debug dependencies
 */
const debug = require('debug')('RRS:Nervi:Ultrasonic');

/**
 * Dependencies
 */
const { EventEmitter } = require('events');
const { Gpio } = require('pigpio');

// The number of microseconds it takes sound to travel 1cm at 20 degrees celcius

/**
 * Speed of sound in dry air at 20 °C; in meters per second (m/s).
 */
const SPEED_OF_SOUND = 343.21;

/**
 * TBD
 */
const MICROSECONDS_PER_M = 1e6 / SPEED_OF_SOUND;

/**
 * Class representing a Ultrasonic Sensor (HC-SR04).
 *
 * @class
 * @extends EventEmitter
 */
class Ultrasonic extends EventEmitter {
  /**
   * Create a Ultrasonic object.
   *
   * @constructor
   * @param {Number} pinTrigger - GPIO pin number of the trigger.
   * @param {Number} pinEcho - GPIO pin number of the echo.
   */
  constructor(pinTrigger, pinEcho) {
    /*
     * Require the user to specify the trigger pin.
     */
    if (!pinTrigger || pinTrigger === 0) {
      throw new Error('Trigger pin must be specified!');
    }

    /*
     * Require the user to specify the echo pin.
     */
    if (!pinEcho || pinEcho === 0) {
      throw new Error('Echo pin must be specified!');
    }

    /*
     * Initialize EventEmitter.
     */
    super();

    this.pinEcho = pinEcho;

    /**
     * Tick which indicates the timestamp that the pulse has been send on.
     */
    this.startTick = 0;

    /**
     * Variable used to store the reference to the interval.
     * Used to clear and re-set the interval.
     */
    this.triggerInterval = null;

    /**
     * Pin which is used to trigger a pulse to be sent.
     */
    this.trigger = new Gpio(pinTrigger, {
      mode: Gpio.OUTPUT,
    });

    /**
     * Pin which is used to trigger an event on pulse received.
     */
    this.echo = new Gpio(pinEcho, {
      mode: Gpio.INPUT,
      alert: true,
    });

    /*
     * Make sure that trigger is low.
     */
    this.trigger.digitalWrite(0);

    /*
     * Handle alert in a separate function.
     */
    this.echo.on('alert', this.onAlert.bind(this));

    /**
     * Stores a reference to `this`.
     */
    const self = this;

    /*
     * Trigger a measurement once per second.
     */
    this.triggerInterval = setInterval(() => self.trigger.trigger(10, 1), 100);
  }

  /**
   * Set the interval time of the trigger function.
   *
   * @function
   * @param {Number} interval - Number of miliseconds between each measurement.
   */
  setInterval(interval) {
    /**
     * We suggest to use over 60ms measurement cycle,
     * in order to prevent trigger signal to the echo signal.
     *
     * @see https://www.mouser.com/ds/2/813/HCSR04-1022824.pdf
     */
    interval = Math.max(interval, 60); // eslint-disable-line no-param-reassign

    /**
     * Stores a reference to `this`.
     */
    const self = this;

    /**
     * Reset the previous interval.
     */
    clearInterval(self.triggerInterval);

    /*
     * Trigger a measurement once per specified interval.
     */
    this.triggerInterval = setInterval(() => {
      /*
       * Set trigger high for 10 microseconds.
       */
      self.trigger.trigger(10, 1);
    }, interval);
  }

  /**
   * Handles the interrupts triggered by the echo pin.
   * Calculates the distance towards the object in front of the sensor.
   *
   * @function
   * @param {Number} level - Indicates the type of interrupt.
   * @param {Number} tick - Moment at which the interrupt was triggered.
   */
  onAlert(level, tick) {
    if (level === 1) {
      this.startTick = tick;
    } else {
      /**
       * Tick which indicates the timestamp that the pulse has been received on.
       */
      const endTick = tick;

      /**
       * The total time required to cover the distance; in microseconds.
       */
      const time = (endTick >> 0) - (this.startTick >> 0); // eslint-disable-line no-bitwise

      /**
       * The distance towards the object, that the ultrasonic sensor is pointing at; in meters.
       */
      const distance = time / 2 / MICROSECONDS_PER_M;

      /*
       * Output all calculations to the debug.
       */
      debug(`${this.pinEcho} | Pulse traveled ${Math.round((distance * 2) * 100) / 100}m in ${Math.round((time) * 100) / 100}μs; Distance to the object is ${Math.round(distance * 100) / 100}m.`);

      /*
       * Send data to all interested parties.
       */
      this.emit('data', distance);
    }
  }
}

module.exports = Ultrasonic;
