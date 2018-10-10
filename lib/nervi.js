/**
 * Dependencies
 */
const { EventEmitter } = require('events');

/**
 * Sensors
 */
const Rotary = require('./rotary');

/**
 * Represents the nervi.
 *
 * @class
 * @extends EventEmitter
 */
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();

const rightEncoder = new Rotary(4);

rightEncoder.on('speed', (value) => {
  this.myEmitter.emit('rotary speed', value);
});

module.exports = myEmitter;
