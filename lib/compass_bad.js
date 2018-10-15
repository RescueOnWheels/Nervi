const Raspi = require('raspi-io');
var five = require("johnny-five");
var board = new five.Board({
 io: new Raspi()
});

board.on("ready", function() {

 let compass = new five.Compass({
  controller: "HMC5883L"
 });

 compass.on("change", function() {
  console.log("change");
  console.log("  heading:  ", Math.floor(this.heading));
  console.log("  bearing:  ", this.bearing.name);
  console.log("------------------------------");
 });
});