// Error class for number formatting
export class NumberFormatError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'NumberFormatError';
    }
}

// Validation functions
export const isValidNumber = (value: unknown): value is number => {
    return typeof value === 'number' && !Number.isNaN(value) && Number.isFinite(value);
};

export const isValidDecimals = (decimals: number): boolean => {
    return Number.isInteger(decimals) && decimals >= 0 && decimals <= 20;
};

export const isValidSeparator = (separator: string): boolean => {
    return typeof separator === 'string' && separator.length <= 3;
};

export const isInRange = (value: number, min: number, max: number, inclusive: boolean): boolean => {
    return inclusive ? value >= min && value <= max : value > min && value < max;
};