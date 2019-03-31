const calderaDiameter = 70;
const marsDiameter = 6794;

module.exports = () => {
  // area of a circle is PI * radius^2
  const areaOfCaldera = Math.floor(Math.PI * Math.pow(calderaDiameter / 2, 2));

  // surface area of a sphere is 4 * PI * radius^2
  const surfaceAreaOfMars = Math.floor(4 * (Math.PI * Math.pow(marsDiameter / 2, 2)));

  const coveredSurfaceArea = surfaceAreaOfMars - areaOfCaldera;

  const coveredPercentage = coveredSurfaceArea / surfaceAreaOfMars;

  return parseFloat((coveredPercentage * 100).toFixed(3));
};
