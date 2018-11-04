/* Packages */
const chai = require('chai');

/* Test target */
const normalize = require('./../../../lib/helpers/normalize');

chai.should();

module.exports = () => {
  let value;

  // Arrange
  beforeEach(() => {
    value = undefined;
  });

  describe('Output', () => {
    it('should return a number', () => {
      // Act
      value = normalize(Math.PI, 0, 10);

      // Assert
      value.should.be.a('number');
    });
  });

  describe('Test cases', () => {
    it('should return Math.PI if round is false.', () => {
      // Act
      value = normalize(Math.PI, 0, 10);

      // Assert
      value.should.equal(Math.PI);
    });

    it('should return3 if round is true.', () => {
      // Act
      value = normalize(Math.PI, 0, 10, true);

      // Assert
      value.should.equal(3);
    });
  });
};
