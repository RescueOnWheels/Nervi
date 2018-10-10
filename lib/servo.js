const Gpio = require('pigpio').Gpio;

class Servo {

	const motorx = new Gpio(12, { mode: Gpio.OUTPUT });
	const motory = new Gpio(18, { mode: Gpio.OUTPUT });

	const MOTOR_X_MIN = 1000;
	const MOTOR_Y_MIN = 1200;
	const MOTOR_X_MAX = 2300;
	const MOTOR_X_MAX = 1800;
	const MAX_MASK = 2;

	let pulseWidth = 1000;
	let increment = 100;

	console.log("Turning on servo");

	setInterval(() => {
		var co_x = 
		moveTo(co_x, co_y)
	}, 500);

	moveTo((x_arg, y_arg) =>{
		var x = x_arg;
		var y = y_arg;
		x +=1;
		var out = x * motorx_max

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

	});
}