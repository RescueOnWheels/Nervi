const Raspi = require('raspi-io');
const five = require('johnny-five');

const board = new five.Board({
  io: new Raspi(),
});

board.on('ready', () => {
  const compass = new five.Compass({
    controller: 'HMC5883L',
  });

  compass.on('change', function () {
    console.log('change');
    console.log('  heading:  ', Math.floor(this.heading));
    console.log('  bearing:  ', this.bearing.name);
    console.log('------------------------------');
  });
});
