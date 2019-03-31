const problems = require('./index');

const solutionOne = 471;
const solutionTwo = 235500000;
const solutionThree = 94;

test('Solve Cloud Computing Problem', () => {
  expect(problems.partOne()).toBe(solutionOne);
  expect(problems.partTwo(solutionOne)).toBe(solutionTwo);
  expect(problems.partThree(solutionTwo)).toBe(solutionThree);
});
