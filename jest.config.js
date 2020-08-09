module.exports = {
  preset: 'ts-jest',
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}',
  ],
  coverageDirectory: 'coverage',
  moduleNameMapper: {
    '^~(.*)$': '<rootDir>/src/$1',
  },
};
