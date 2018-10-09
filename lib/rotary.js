/**
 * Debug dependencies
 */
const debug = require('debug')('RRS:Nervi:Rotary');

const { Gpio } = require('pigpio');

const button = new Gpio(4, {
  mode: Gpio.INPUT,
  pullUpDown: Gpio.PUD_DOWN,
  edge: Gpio.EITHER_EDGE,
});

let count = 0;
button.on('interrupt', () => {
  count += 1;
});

let lastSpeed = 0;
setInterval(() => {
  const speedLeft = Math.round((3.14 * 6.4) * (count / 20) / 0.5);
  count = 0;

  if (speedLeft === lastSpeed) {
    return;
  }
  lastSpeed = speedLeft;

  debug(`${speedLeft / 100} M/s`);
}, 500);
