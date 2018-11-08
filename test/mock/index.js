const cameraMount = require('./cameraMount.test');
const compass = require('./compass.test');
const rotary = require('./rotary.test');
const servo = require('./servo.test');
const ultrasonic = require('./ultrasonic.test');

const normalize = require('./helpers/normalize.test');

describe('Mock', () => {
  describe('cameraMount', cameraMount);
  describe('compass', compass);
  describe('rotary', rotary);
  describe('servo', servo);
  describe('ultrasonic', ultrasonic);

  describe('helpers', () => {
    describe('normalize', normalize);
  });
});
