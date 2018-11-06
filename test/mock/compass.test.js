/* Packages */
const chai = require('chai');

/* Test target */
const Nervi = require('./../../');
const Compass = require('./../../lib/compass');

chai.should();

module.exports = () => {
  // Arrange
  beforeEach(() => {
    Nervi.compass = new Compass();
  });

  it('degrees should be a number.', () => {
    // Assert
    Nervi.compass.degrees.should.be.a('number');
  });

  it('degrees should be 10 if there was no error.', () => {
    // Act
    Nervi.compass.setDegrees(null, 10);

    // Assert
    Nervi.compass.degrees.should.be.a('number');
    Nervi.compass.degrees.should.equal(10);
  });

  it('degrees should be -1 if there was an error.', () => {
    // Act
    Nervi.compass.setDegrees('is this an error', 0);

    // Assert
    Nervi.compass.degrees.should.be.a('number');
    Nervi.compass.degrees.should.equal(-1);
  });
};
