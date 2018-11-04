const rotary = require('./rotary.test');
const servo = require('./servo.test');
const ultrasonic = require('./ultrasonic.test');

const normalize = require('./helpers/normalize.test');

describe('Mock', () => {
  describe('rotary', rotary);
  describe('servo', servo);
  describe('ultrasonic', ultrasonic);

  describe('helpers', () => {
    describe('normalize', normalize);
  });
});
