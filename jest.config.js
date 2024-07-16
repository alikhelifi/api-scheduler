module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    globalSetup: '<rootDir>/jest/globalSetup.ts',
    globalTeardown: '<rootDir>/jest/globalTeardown.ts',
    setupFilesAfterEnv: ['<rootDir>/jest/setupFiles.ts'],
    cacheDirectory: '<rootDir>/.cache/jest',
    globals: {
        'ts-jest': {
            tsconfig: './tsconfig-test.json',
        },
    },
};
