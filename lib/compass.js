/* Dependencies */
const HMC5883L = require('./interfaces/hmc5883l');

class Compass {
  constructor() {
    this.compass = new HMC5883L(1, {
      calibrate: {
        offset: { x: 83.94999999999999, y: -438.72999999999996, z: -94.535 },
        scale: {
          x: 1.3961295418641393,
          y: 1.4535361842105265,
          z: 1.6785375118708452,
        },
      },
    });

    this.degrees = -1;

    const self = this;
    this.headingInterval = setInterval(() => self.compass.getHeadingDegrees('y', 'z', self.setDegrees.bind(self)), 10);
  }

  setDegrees(err, data) {
    this.degrees = Math.round(err ? -1 : data);
  }
}

module.exports = Compass;
