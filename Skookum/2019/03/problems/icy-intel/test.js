const problems = require('./index');

const solutionOne = 1.2;
const solutionTwo = false;

test('Solve Icy Intel Problem', () => {
  expect(problems.partOne()).toBe(solutionOne);
  expect(problems.partTwo()).toBe(solutionTwo);
});
