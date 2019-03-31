const liquidWaterContent = 500000;
const volumeOfOlympicSwimmingPool = 2500;
const densityOfWater = 1000;

module.exports = {
  partOne: () => {
    const cloudDiameter = 10;
    const cloudHeight = 16 - cloudDiameter;

    // volume of a cylinder is PI * radius^2 * height
    const cloudVolume = Math.floor(Math.PI * Math.pow(cloudDiameter / 2, 2) * cloudHeight);

    return cloudVolume;
  },
  partTwo: (cloudVolume) => {
    if (!cloudVolume) {
      return false;
    }

    return cloudVolume * liquidWaterContent;
  },
  partThree: (massOfWaterInCloud) => {
    if (!massOfWaterInCloud) {
      return false;
    }

    return Math.floor(massOfWaterInCloud / densityOfWater / volumeOfOlympicSwimmingPool);
  }
};
