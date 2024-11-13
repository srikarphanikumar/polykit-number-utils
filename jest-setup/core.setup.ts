// For Node < 16, use util. For Node ≥ 16, these are already globally available
if (typeof TextDecoder === 'undefined') {
    const util = require('util');
    global.TextDecoder = util.TextDecoder;
    global.TextEncoder = util.TextEncoder;
}

beforeEach(() => {
    jest.clearAllMocks();
});

// Mock console methods
const originalConsole = { ...console };
global.console = {
    ...console,
    log: jest.fn(),
    info: jest.fn(),
    debug: jest.fn(),
    error: originalConsole.error,
    warn: originalConsole.warn,
};