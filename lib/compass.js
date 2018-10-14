/**
  * Dependencies
  */

const Raspi = require('raspi-io');
const five = require('johnny-five');

/**
  * Initialize board with raspiberry pi IO plugin
  */

const board = new five.Board({
  io = new Raspi()
});

board.on("ready", () => {
 
 let compass = new five.Compass({
  controller: "HMC5883L"
 });

  
}); 