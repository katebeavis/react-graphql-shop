module.exports = {
  moduleDirectories: ['node_modules', 'src'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  testMatch: ['<rootDir>/**/**/**.test.(js|jsx|tsx|ts)'],
  collectCoverage: false,
  collectCoverageFrom: [
    '<rootDir>/**/*.{ts,tsx}',
    '!<rootDir>/**/*.{js}',
    '!**/@types/**',
    '!**/node_modules/**',
    '!**/vendor/**',
    '!**/dist/**',
    '!**/*/__tests__/**'
  ],
  setupFiles: ['<rootDir>/jest/setup.js'],
  setupFilesAfterEnv: ['<rootDir>/jest/setupAfterEnv.js'],
  testPathIgnorePatterns: [
    '<rootDir>/src/build/',
    '<rootDir>/node_modules/',
    '<rootDir>/etc/'
  ],
  transform: {
    ['^.+\\.(js|jsx|ts|tsx)$']: '<rootDir>/jest/transformer.js'
  },
  rootDir: '../',
  clearMocks: true
};
