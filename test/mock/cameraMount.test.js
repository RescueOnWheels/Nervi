/* Packages */
const chai = require('chai');

/* Test target */
const Nervi = require('./../../');
const CameraMount = require('./../../lib/cameraMount');

chai.should();

module.exports = () => {
  // Arrange
  beforeEach(() => {
    Nervi.cameraMount = new CameraMount();
  });

  it('should set the horizontal servo at 90° the input equals (0, 0).', () => {
    // Act
    Nervi.cameraMount.moveTo(0, 0);

    // Assert
    Nervi.cameraMount.servoHorizontal.servo.pulseWidth.should.equal(1500);
    Nervi.cameraMount.servoHorizontal.servo.degrees.should.equal(90);
  });
};
