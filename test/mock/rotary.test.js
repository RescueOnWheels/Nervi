/* Packages */
const chai = require('chai');

/* Test target */
const Nervi = require('./../../');
const Rotary = require('./../../lib/rotary');

chai.should();

module.exports = () => {
  // Arrange
  beforeEach(() => {
    Nervi.rightRotary = new Rotary();
  });

  it('should send its data to the `speed` event.', (done) => {
    // Assert
    Nervi.rightRotary.on('speed', () => {
      clearInterval(Nervi.rightRotary.interval);
      done();
    });
  });

  it('should send 0 m/s to the `speed` event, if there were no interrupts.', (done) => {
    // Assert
    Nervi.rightRotary.on('speed', (speed) => {
      clearInterval(Nervi.rightRotary.interval);

      speed.should.equal(0);
      done();
    });
  });

  it('should send 0 m/s to the `speed` event, if there were no interrupts.', (done) => {
    // Assert
    Nervi.rightRotary.on('speed', (speed) => {
      clearInterval(Nervi.rightRotary.interval);

      const expectedDistance = Math.round((65 / 1000) * Math.PI, 2);
      const actualSpeed = Math.round(speed, 2);

      actualSpeed.should.equal(expectedDistance);
      done();
    });

    // Act
    for (let i = 0; i < 10; i += 1) {
      Nervi.rightRotary.rotary.triggerEvent('interrupt');
    }
  });
};
