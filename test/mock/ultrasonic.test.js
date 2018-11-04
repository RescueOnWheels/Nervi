/* Packages */
const chai = require('chai');

/* Test target */
const Nervi = require('./../../');
const Ultrasonic = require('./../../lib/ultrasonic');

const should = chai.should();

module.exports = () => {
  // Arrange
  beforeEach(() => {
    Nervi.ultrasonicFront = new Ultrasonic(1, 2);
  });

  describe('setInterval', () => {
    it('should call `trigger` 10 times in a second if the interval is 100ms.', (done) => {
      const time = 1000;

      let count = 0;
      let startTime = 0;
      Nervi.ultrasonicFront.trigger.trigger = () => {
        count += 1;

        if (count >= 10) {
          const timeDelta = (Date.now() - startTime);
          if (timeDelta > time * 0.95 && timeDelta < time * 1.05) {
            (true).should.equal(true);
            done();
          } else {
            should.fail(`Interval didn't function properly, time taken: ${timeDelta}`);
            done();
          }

          Nervi.ultrasonicFront.trigger.trigger = () => {};
        }
      };

      Nervi.ultrasonicFront.setInterval(100);
      startTime = Date.now();
    });

    it('should call `trigger` 16 times in a second if the interval is 10ms (changed to 60ms).', (done) => {
      const time = 1000;

      let count = 0;
      let startTime = 0;
      Nervi.ultrasonicFront.trigger.trigger = () => {
        count += 1;

        if (count >= 16) {
          const timeDelta = (Date.now() - startTime);
          if (timeDelta > time * 0.95 && timeDelta < time * 1.05) {
            (true).should.equal(true);
            done();
          } else {
            should.fail(`Interval didn't function properly, time taken: ${timeDelta}`);
            done();
          }

          Nervi.ultrasonicFront.trigger.trigger = () => {};
        }
      };

      Nervi.ultrasonicFront.setInterval(10);
      startTime = Date.now();
    });
  });

  describe('Expected Errors (constructor)', () => {
    it('should throw an error if there are no parameters', () => {
      try {
        // Act
        Nervi.ultrasonicFront = new Ultrasonic();

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
        Nervi.ultrasonicFront = new Ultrasonic(0);

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
        Nervi.ultrasonicFront = new Ultrasonic(1, 0);

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
      Nervi.ultrasonicFront.on('data', () => {
        done();
      });

      Nervi.ultrasonicFront.echo.triggerEvent('alert', 1, Date.now() * 1000);
      Nervi.ultrasonicFront.echo.triggerEvent('alert', 0, Date.now() * 1000);
    });

    it('should emit the `data` event with value `-1` if the distance is below 0.05m.', (done) => {
      Nervi.ultrasonicFront.on('data', (distance) => {
        distance.should.equal(-1);
        done();
      });

      Nervi.ultrasonicFront.echo.triggerEvent('alert', 1, Date.now() * 1000);
      Nervi.ultrasonicFront.echo.triggerEvent('alert', 0, Date.now() * 1000);
    });

    it('should emit the `data` event with value `-1` if the distance is above 2.55m.', (done) => {
      Nervi.ultrasonicFront.on('data', (distance) => {
        distance.should.equal(-1);
        done();
      });

      Nervi.ultrasonicFront.echo.triggerEvent('alert', 1, (Date.now() - 10) * 1000);
      Nervi.ultrasonicFront.echo.triggerEvent('alert', 0, (Date.now() + 10) * 1000);
    });

    it('should emit the `data` event with value `2.00` if the diff in time is 11655 microseconds.', (done) => {
      Nervi.ultrasonicFront.on('data', (distance) => {
        distance.should.equal(2.00);
        done();
      });

      Nervi.ultrasonicFront.echo.triggerEvent('alert', 1, 0);
      Nervi.ultrasonicFront.echo.triggerEvent('alert', 0, 11655);
    });
  });
};
