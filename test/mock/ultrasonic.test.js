/* Packages */
const chai = require('chai');

/* Test target */
const Ultrasonic = require('./../../lib/ultrasonic');

const should = chai.should();

module.exports = () => {
  let ultrasonic;

  // Arrange
  beforeEach(() => {
    ultrasonic = new Ultrasonic(1, 2);
  });

  describe('Expected Errors (constructor)', () => {
    it('should throw an error if there are no parameters', () => {
      try {
        // Act
        ultrasonic = new Ultrasonic();

        // Assert
        should.fail('Expected an error to be thrown!');
      } catch (err) {
        // Assert
        err.should.be.an.instanceOf(Error);
      }
    });

    it('should throw an error if `pinTrigger` is equal to 0.', () => {
      try {
        // Act
        ultrasonic = new Ultrasonic(0);

        // Assert
        should.fail('Expected an error to be thrown!');
      } catch (err) {
        // Assert
        err.should.be.an.instanceOf(Error);
        err.should.have.property('message', 'Trigger pin must be specified!');
      }
    });

    it('should throw an error if `pinEcho` is equal to 0.', () => {
      try {
        // Act
        ultrasonic = new Ultrasonic(1, 0);

        // Assert
        should.fail('Expected an error to be thrown!');
      } catch (err) {
        // Assert
        err.should.be.an.instanceOf(Error);
        err.should.have.property('message', 'Echo pin must be specified!');
      }
    });
  });

  describe('Test Cases', () => {
    it('should emit the `data` event', (done) => {
      ultrasonic.on('data', () => {
        done();
      });

      ultrasonic.echo.triggerEvent('alert', 1, Date.now() * 1000);
      ultrasonic.echo.triggerEvent('alert', 0, Date.now() * 1000);
    });

    it('should emit the `data` event with value `-1` if the distance is below 0.05m.', (done) => {
      ultrasonic.on('data', (distance) => {
        distance.should.equal(-1);
        done();
      });

      ultrasonic.echo.triggerEvent('alert', 1, Date.now() * 1000);
      ultrasonic.echo.triggerEvent('alert', 0, Date.now() * 1000);
    });

    it('should emit the `data` event with value `-1` if the distance is above 2.55m.', (done) => {
      ultrasonic.on('data', (distance) => {
        distance.should.equal(-1);
        done();
      });

      ultrasonic.echo.triggerEvent('alert', 1, (Date.now() - 10) * 1000);
      ultrasonic.echo.triggerEvent('alert', 0, (Date.now() + 10) * 1000);
    });

    it('should emit the `data` event with value `2.00` if the diff in time is 11655 microseconds.', (done) => {
      ultrasonic.on('data', (distance) => {
        distance.should.equal(2.00);
        done();
      });

      ultrasonic.echo.triggerEvent('alert', 1, 0);
      ultrasonic.echo.triggerEvent('alert', 0, 11655);
    });
  });
};
