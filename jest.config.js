module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  // 只抓 .test.ts 或 .spec.ts
  testMatch: ['**/?(*.)+(spec|test).ts'],
  // 只去 src 裡面找測試檔
  roots: ['<rootDir>/src'],
  // 忽略 clients 資料夾所有檔案
  modulePathIgnorePatterns: ['<rootDir>/clients/'],
  // 或者用 testPathIgnorePatterns 也可以：
  // testPathIgnorePatterns: ['<rootDir>/clients/'],
};