/* Packages */
const chai = require('chai');

/* Test target */
const Rotary = require('./../../');

chai.should();

module.exports = () => {
  let rotary;

  // Arrange
  beforeEach(() => {
    rotary = new Rotary();
  });

  it('should send its data to the `speed` event.', (done) => {
    // Assert
    rotary.on('speed', () => {
      clearInterval(rotary.interval);
      done();
    });
  });

  it('should send 0 m/s to the `speed` event, if there were no interrupts.', (done) => {
    // Assert
    rotary.on('speed', (speed) => {
      clearInterval(rotary.interval);

      speed.should.equal(0);
      done();
    });
  });

  it('should send 0 m/s to the `speed` event, if there were no interrupts.', (done) => {
    // Assert
    rotary.on('speed', (speed) => {
      clearInterval(rotary.interval);

      const expectedDistance = Math.round((65 / 1000) * Math.PI, 2);
      const actualSpeed = Math.round(speed, 2);

      actualSpeed.should.equal(expectedDistance);
      done();
    });

    // Act
    for (let i = 0; i < 10; i += 1) {
      rotary.rotary.triggerEvent('interrupt');
    }
  });
};
