/**
 * Debug dependencies
 */
const debug = require('debug')('RRS:Nervi:Rotary');

/**
 * Dependencies
 */
const { Gpio } = require('pigpio');

const motor = new Gpio(10, {
  mode: Gpio.OUTPUT,
});

let pulseWidth = 1000;
let increment = 100;

debug('Turning on servo');

setInterval(() => {
  motor.servoWrite(pulseWidth);

  pulseWidth += increment;
  if (pulseWidth >= 2000) {
    increment = -100;
  } else if (pulseWidth <= 1000) {
    increment = 100;
  }
}, 500);
