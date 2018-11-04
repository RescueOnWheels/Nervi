/* Packages */
const chai = require('chai');

/* Test target */
const Servo = require('./../../lib/servo');

chai.should();

module.exports = () => {
  let servo;

  // Arrange
  beforeEach(() => {
    servo = new Servo();
  });

  it('should set the servo at 0° if the input is lower than 500.', () => {
    // Act
    servo.moveTo(-500);

    // Assert
    servo.servo.pulseWidth.should.equal(500);
    servo.servo.degrees.should.equal(0);
  });

  it('should set the servo at 90° if the input is 1500.', () => {
    // Act
    servo.moveTo(1500);

    // Assert
    servo.servo.pulseWidth.should.equal(1500);
    servo.servo.degrees.should.equal(90);
  });

  it('should set the servo at 180° if the input is greater than 2500.', () => {
    // Act
    servo.moveTo(3000);

    // Assert
    servo.servo.pulseWidth.should.equal(2500);
    servo.servo.degrees.should.equal(180);
  });
};
