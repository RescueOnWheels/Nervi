/**
 * Dependencies
 */
const { EventEmitter } = require('events');

/**
 * Sensors
 */
const rotary = require('./rotary');

class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();

rotary.on('speed', (value) => {
  this.myEmitter.emit('rotary speed', value);
});

module.exports = myEmitter;
