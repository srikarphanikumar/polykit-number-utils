const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.json');

// Base config for all tests
const baseConfig = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    roots: ['<rootDir>/src'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
        '^@core/(.*)$': '<rootDir>/src/core/$1',
        '^@react/(.*)$': '<rootDir>/src/react/$1'
    },
    transform: {
        '^.+\\.(ts|tsx)$': ['ts-jest', {
            tsconfig: 'tsconfig.spec.json',
            isolatedModules: true,
            stringifyContentPathRegex: '\\.html$'
        }]
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'mjs'],
    collectCoverage: true,
    coverageDirectory: 'coverage'
};

// Framework-specific configs
const configs = {
    core: {
        ...baseConfig,
        displayName: 'Core',
        testMatch: ['<rootDir>/src/core/**/*.test.ts'],
        setupFilesAfterEnv: ['<rootDir>/jest-setup/core.setup.ts']
    },
    react: {
        ...baseConfig,
        displayName: 'React',
        testMatch: ['<rootDir>/src/react/**/*.test.tsx'],
        setupFilesAfterEnv: ['<rootDir>/jest-setup/react.setup.ts']
    },
    angular: {
        ...baseConfig,
        displayName: 'Angular',
        testMatch: ['<rootDir>/src/angular/**/*.test.ts'],
        setupFilesAfterEnv: ['<rootDir>/jest-setup/angular.setup.ts'],
        transformIgnorePatterns: [
            'node_modules/(?!(@angular|rxjs)/)'
        ],
        moduleNameMapper: {
            '^@/(.*)$': '<rootDir>/src/$1',
            '^@core/(.*)$': '<rootDir>/src/core/$1',
            '^@angular/(.*)$': '<rootDir>/node_modules/@angular/$1'
        },
        globals: {
            'ts-jest': {
                tsconfig: 'tsconfig.spec.json',
                stringifyContentPathRegex: '\\.html$',
                isolatedModules: true
            }
        }
    }
};

// Export specific config based on TEST_ENV
module.exports = configs[process.env.TEST_ENV || 'core'];