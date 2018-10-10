const Gpio = require('pigpio').Gpio;

class Servo {
  constructor(pin, min = 1000, max = 2500) {
    const servopin = new Gpio(pin, { mode: Gpio.OUTPUT });
    const motory = new Gpio(18, { mode: Gpio.OUTPUT });

    MOTOR_X_MIN = 1000;
    MOTOR_Y_MIN = 1200;
    MAX_MASK = 2;

    const pulseWidth = 1000;
    const increment = 100;
  }

  moveTo(x_arg, y_arg) {
    let x = x_arg;
    const y = y_arg;
    x += 1;
    const out = x * motorx_max;

    pulseWidth += increment;
	    if (pulseWidth >= 2000) {
	        increment = -100;
	    } else if (pulseWidth <= 1000) {
	        increment = 100;
	    }

	    pulseWidth += increment;
	    if (pulseWidth >= 2000) {
	        increment = -100;
	    } else if (pulseWidth <= 1000) {
	        increment = 100;
	    }
	        motorx.servoWrite(y);
	        motory.servoWrite(x);
  }
}
module.export = Servo;
