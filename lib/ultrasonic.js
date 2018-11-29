/* Dependencies */
const { EventEmitter } = require('events');
const Gpio = require('./interfaces/pigpio');

/* Auxilio */
const {
  Debug,
} = require('./Auxilio');

/* Debug */
const debug = Debug('RRS:Nervi:Ultrasonic');

/**
 * Default interval time in miliseconds.
 */
const DEFAULT_INTERVAL = 100;

/**
 * Speed of sound in dry air at 20 °C; in meters per second (m/s).
 */
const SPEED_OF_SOUND = 343.21;

/**
 * Constant used for calculating the distance covered by the ultrasonic pulse.
 */
const MICROSECONDS_PER_M = 1e6 / SPEED_OF_SOUND;

/**
 * Class representing an ultrasonic sensor (HC-SR04).
 */
class Ultrasonic extends EventEmitter {
  /**
   * Create an ultrasonic sensor.
   *
   * @param {Number} pinTrigger - an unsigned integer specifying the GPIO number.
   * @param {Number} pinEcho - an unsigned integer specifying the GPIO number.
   */
  constructor(pinTrigger, pinEcho) {
    /* Require the user to specify the trigger pin. */
    if (!pinTrigger || pinTrigger <= 0) {
      throw new Error('Trigger pin must be specified!');
    }

    /* Require the user to specify the echo pin. */
    if (!pinEcho || pinEcho <= 0) {
      throw new Error('Echo pin must be specified!');
    }

    /* Initialize EventEmitter. */
    super();

    /**
     * Stores a reference to `this`.
     */
    const self = this;

    /**
     * Stores a copy of the echo pin number.
     */
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

    /* Make sure that trigger pin is low. */
    this.trigger.digitalWrite(0);

    /* Handle alert in a separate function. */
    this.echo.on('alert', this.onAlert.bind(self));

    /* Trigger a measurement once per second. */
    this.triggerInterval = setInterval(() => self.trigger.trigger(10, 1), DEFAULT_INTERVAL);
  }

  /**
   * Enables the trigger interval on the default interval time.
   */
  enable() {
    this.setInterval(DEFAULT_INTERVAL);
  }

  /**
   * Disable the trigger interval.
   */
  disable() {
    clearInterval(this.triggerInterval);
    this.triggerInterval = null;
  }

  /**
   * Set the interval time of the trigger function.
   *
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

    /* Reset the previous interval. */
    clearInterval(self.triggerInterval);

    /* Trigger a measurement once per specified interval. */
    this.triggerInterval = setInterval(() => {
      /* Set trigger high for 10 microseconds. */
      self.trigger.trigger(10, 1);
    }, interval);
  }

  /**
   * Handles the interrupts triggered by the echo pin.
   * Calculates the distance towards the object in front of the sensor.
   *
   * @param {Number} level - the GPIO level when the state change occurred, 0 or 1.
   * @param {Number} tick - the time stamp of the state change, an unsigned 32 bit integer.
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
      const distance = Math.round((time / 2 / MICROSECONDS_PER_M) * 100) / 100;

      /* Output all calculations to the debug. */
      debug(`${this.pinEcho} | Pulse traveled ${Math.round((distance * 2) * 100) / 100}m in ${Math.round((time) * 100) / 100}μs; Distance to the object is ${Math.round(distance * 100) / 100}m.`);

      if (distance < 0.05 || distance > 2.55) {
        /* We don't trust the calculated distance, thus send a negative number. */
        this.emit('data', -1);
      } else {
        /* Send data to all interested parties. */
        this.emit('data', distance);
      }
    }
  }
}

module.exports = Ultrasonic;
