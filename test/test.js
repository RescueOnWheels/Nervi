let toMockOrNotToMockThatIsTheQuestion;
if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'CI') {
  // eslint-disable-next-line no-console
  console.warn('Nervi: Using the mock tests!');

  toMockOrNotToMockThatIsTheQuestion = ('./mock');
} else {
  toMockOrNotToMockThatIsTheQuestion = ('./real');
}

// eslint-disable-next-line import/no-dynamic-require
module.exports = require(toMockOrNotToMockThatIsTheQuestion);