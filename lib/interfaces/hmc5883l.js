let toMockOrNotToMockThatIsTheQuestion;

/* istanbul ignore else */
if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'CI') {
  // eslint-disable-next-line no-console
  console.warn('Nervi: Using the mock HMC5883L package!');

  toMockOrNotToMockThatIsTheQuestion = ('./hmc5883l.mock');
} else {
  toMockOrNotToMockThatIsTheQuestion = ('compass-hmc5883l');
}

// eslint-disable-next-line import/no-dynamic-require
module.exports = require(toMockOrNotToMockThatIsTheQuestion);
