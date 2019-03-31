const problems = require('./index');

const solutionOne = 1.29;
const solutionTwo = 43;

test('Solve Storm Spotting Problem', () => {
  expect(problems.partOne()).toBe(solutionOne);
  expect(problems.partTwo(solutionOne)).toBe(solutionTwo);
});
