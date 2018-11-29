/* Packages */
const chai = require('chai');

/* Test target */
const Nervi = require('./../../');
const Rotary = require('./../../lib/rotary');

const should = chai.should();

module.exports = () => {
  // Arrange
  beforeEach(() => {
    Nervi.rightRotary = new Rotary();
  });

  it('should send its data to the `data` event.', (done) => {
    // Assert
    Nervi.rightRotary.on('data', () => {
      clearInterval(Nervi.rightRotary.interval);
      done();
    });
  });

  it('should send 0 m/s to the `data` event, if there were no interrupts.', (done) => {
    // Assert
    Nervi.rightRotary.on('data', ({ speed }) => {
      clearInterval(Nervi.rightRotary.interval);

      speed.should.equal(0);
      done();
    });
  });

  it('should send 0 m/s to the `data` event, if there were no interrupts.', (done) => {
    // Assert
    Nervi.rightRotary.on('data', ({ speed }) => {
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

  it('enable should set the headingInterval property.', () => {
    // Act
    Nervi.rightRotary.enable();

    // Assert
    Nervi.rightRotary.interval.should.not.equal(null);
  });

  it('disable should nullify the headingInterval property.', () => {
    // Act
    Nervi.rightRotary.disable();

    // Assert
    should.not.exist(Nervi.rightRotary.interval);
  });
};
