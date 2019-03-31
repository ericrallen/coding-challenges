
// peak fluence is pulse / (PI * radius^2 / 2)
// pulse needs to be in J
// radius needs to be in cm
const getPeakFluence = (pulse, radius) => {
  return pulse / (Math.PI * Math.pow(radius, 2) / 2);
};

module.exports = {
  partOne: () => {
    const pulseEnergy = 0.30; // millijoules (mJ)
    const laserRadius = 125.0; // micrometers (μm)

    const peak = getPeakFluence(pulseEnergy / 1000, laserRadius / 10000);

    return parseFloat(peak.toFixed(1));
  },
  partTwo: (peakFluence) => {
    if (!peakFluence) {
      return false;
    }

    const requiredPeakFluence = 1.0; // J/cm^2

    const powerReduction = 0.27;

    return peakFluence * (1 - powerReduction) >= requiredPeakFluence;
  },
};
