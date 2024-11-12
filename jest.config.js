module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/__tests__/**/*.test.ts'],
    moduleNameMapper: {
        '^@core/(.*)$': '<rootDir>/src/core/$1'
    },
    collectCoverage: true,
    coverageDirectory: 'coverage',
    transform: {
        '^.+\\.tsx?$': ['ts-jest', {
            tsconfig: 'tsconfig.json'
        }]
    }
};