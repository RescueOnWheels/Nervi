let toMockOrNotToMockThatIsTheQuestion;

/* istanbul ignore else */
if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'CI') {
  // eslint-disable-next-line no-console
  console.warn('Nervi: Using the mock PIGPIO package!');

  toMockOrNotToMockThatIsTheQuestion = ('./pigpio.mock');
} else {
  toMockOrNotToMockThatIsTheQuestion = ('pigpio');
}

// eslint-disable-next-line import/no-dynamic-require
module.exports = require(toMockOrNotToMockThatIsTheQuestion).Gpio;
