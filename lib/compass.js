/**
 * Dependencies
 */
const Raspi = require('raspi-io');
const five = require('johnny-five');
const { EventEmitter } = require('events');
const debug = require('debug')('RRS:Nervi:Compass');

const board;
const compass;

class Compass extends EventEmitter {

  /**
   * Create a compass object
   */
  constructor() {
    // self this trick
    let self = this;

   /**
    * Initialize board with raspiberry pi IO plugin
    */
    this.board = new five.Board({
      io = new Raspi()
    });

    /**
     * Initialize compass with HMC5883L controller
     */

    this.board.on("ready", () => {
      self.compass = new five.Compass({
        controller: "HMC5883L"
       });
    })

    /*
     * Initialize EventEmitter.
     */
    super();

    /**
     * Handle measurement event in seperate function
     */
    this.echo.on('measure', this.onMeasure.bind(this));
  }

  onMeasure() {
    /**
     * Display debug message in console
     */
    debug("Heading: ", Math.floor(this.heading));
    debug("Bearing: ", this.bearing.name);
    debug("-------------------------------")

    /**
     * Emit heading data
     */
    this.emit("heading", this.heading);
  }

  /**
   * Getter for board object
   * @function
   * @returns {five.Board} The board object
   */
  get board() {
    return self.board;
  }

  /**
   * Getter for board object
   * @function
   * @returns {five.Compass} The compass   object
   */
  get compass() {
    return self.compass;
  }
};


