let toMockOrNotToMockThatIsTheQuestion;
if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'CI') {
  console.warn('Nervi: Using the mock PIGPIO package!'); // eslint-disable-line no-console
  toMockOrNotToMockThatIsTheQuestion = ('./pigpio.mock');
} else {
  toMockOrNotToMockThatIsTheQuestion = ('pigpio');
}

// eslint-disable-next-line import/no-dynamic-require
module.exports = require(toMockOrNotToMockThatIsTheQuestion).Gpio;
