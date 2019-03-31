const oldStormSize = {
  width: 24700,
  height: 13300,
};

const newStormSize = {
  width: 16500,
  height: 11400,
};

const earthRadius = 6378;

// area of an ellipse is PI * width * height
const calculateStormArea = ({ width, height }) => {
  return Math.PI * width * height;
}

module.exports = {
  partOne: () => {
    const earthDiameter = earthRadius * 2;

    return parseFloat((newStormSize.width / earthDiameter).toFixed(2));
  },
  partTwo: () => {
    const oldArea = calculateStormArea(oldStormSize);
    const newArea = calculateStormArea(newStormSize);

    const percentage = newArea / oldArea;

    return 100 - Math.floor(percentage * 100);
  },
};
