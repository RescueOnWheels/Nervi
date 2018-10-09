const Gpio = require('pigpio').Gpio;

const button = new Gpio(4, {
  mode: Gpio.INPUT,
  pullUpDown: Gpio.PUD_DOWN,
  edge: Gpio.EITHER_EDGE
});

let count = 0;
button.on('interrupt', () => {
    count++;
});

let lastSpeed = 0;
setInterval(() => {
    const speedLeft = Math.round((3.14 * 6.4) * (count / 20) / 0.5);
    count = 0;

    if(speedLeft === lastSpeed) {
        return;
    }

    lastSpeed = speedLeft;
    console.log(`${speedLeft/100} M/s`);
}, 500);
