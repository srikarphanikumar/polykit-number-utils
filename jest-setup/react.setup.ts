import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';

beforeEach(() => {
    jest.clearAllMocks();
});

afterEach(() => {
    cleanup();
});

// Mock window methods for React
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })),
});
