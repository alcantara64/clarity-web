import type {Config} from '@jest/types';
 const config:Config.InitialOptions = {
    collectCoverageFrom: [
      '**/*.{js,jsx}',
      '!**/*.d.ts',
      '!**/node_modules/**',
      '!**/tests/**',
      '!**/coverage/**',
      '!jest.config.js',
    ],
    setupFilesAfterEnv: ['<rootDir>/tests/Setup.js'],
    testPathIgnorePatterns: ['/node_modules/', '/public/'],
    transform: {
      // '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
      "^.+\\.(js|jsx)$": "babel-jest",
      '^.+\\.css$': '<rootDir>/config/jest/cssTransform.js',
    },
    transformIgnorePatterns: [
      '/node_modules/',
      '^.+\\.module\\.(css|sass|scss)$',
    ],
    moduleNameMapper: {
      '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
      '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
        '<rootDir>/__mocks__/fileMock.js',
      '\\.(css|sass|less)$': '<rootDir>/__mocks__/styleMock.js',
    },
    moduleDirectories: ["node_modules", "utils"],
    coverageProvider: "v8", 
    testEnvironment: "jest-environment-jsdom-sixteen",
  }
  export default config