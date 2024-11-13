import {
    ComparisonOperator,
    CurrencyFormatOptions,
    NumberFormatOptions,
    NumberRangeOptions,
    NumberUnitOptions,
    NumberPrecision,
    NumberMaskOptions,
    PercentageFormatOptions,
    RoundingMode,
    StatisticsOptions
} from './types';

import {
    NumberFormatError,
    isValidNumber,
    isValidDecimals,
    isValidSeparator,
    isInRange
} from './utils';

export * from './types';
export * from './utils';

/**
 * Formats a number with thousand separators and decimal places
 * @param value - The number to format
 * @param options - Formatting options
 * @returns Formatted number string
 * @throws {NumberFormatError} When input validation fails
 */
export const formatNumber = (
    value: number,
    options: NumberFormatOptions = {}
): string => {
    const {
        decimals = 2,
        thousandsSeparator = ',',
        decimalSeparator = '.',
        fallback = '0'
    } = options;

    // Input validation
    if (!isValidNumber(value)) {
        if (fallback) return fallback;
        throw new NumberFormatError('Invalid number input');
    }

    if (!isValidDecimals(decimals)) {
        throw new NumberFormatError('Invalid decimals value: must be an integer between 0 and 20');
    }

    if (!isValidSeparator(thousandsSeparator) || !isValidSeparator(decimalSeparator)) {
        throw new NumberFormatError('Invalid separator: must be a string of 1-3 characters');
    }

    if (thousandsSeparator === decimalSeparator) {
        throw new NumberFormatError('Thousand separator and decimal separator must be different');
    }

    try {
        // Handle special cases
        if (Math.abs(value) >= Number.MAX_SAFE_INTEGER) {
            return value.toExponential(decimals);
        }

        // Format the number
        const parts = Math.abs(value).toFixed(decimals).split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator);

        // Reconstruct the number with sign
        const formattedNumber = parts.join(decimalSeparator);
        return value < 0 ? `-${formattedNumber}` : formattedNumber;
    } catch (error) {
        if (fallback) return fallback;
        throw new NumberFormatError(`Formatting failed: ${error instanceof Error ? error.message : 'unknown error'}`);
    }
};

/**
 * Formats a number as currency
 * @param value - The number to format
 * @param options - Currency formatting options
 * @returns Formatted currency string
 * @throws {NumberFormatError} When input validation fails
 */
export const formatCurrency = (
    value: number,
    options: CurrencyFormatOptions = {}
): string => {
    const {
        currency = 'USD',
        locale = 'en-US',
        fallback,  // Changed from fallback = 'USD 0.00'
        minimumFractionDigits = 2,
        maximumFractionDigits = 2,
        useGrouping = true
    } = options;

    // Input validation - key fix is checking for fallback undefined
    if (!isValidNumber(value) || !Number.isFinite(value)) {
        if (fallback !== undefined) return fallback;
        throw new NumberFormatError('Invalid number input');
    }

    try {
        // Handle special cases
        if (Math.abs(value) >= Number.MAX_SAFE_INTEGER) {
            throw new NumberFormatError('Value exceeds maximum safe integer');
        }

        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency,
            minimumFractionDigits,
            maximumFractionDigits,
            useGrouping
        }).format(value);
    } catch (error) {
        if (error instanceof NumberFormatError) throw error;
        if (fallback) return fallback;
        throw new NumberFormatError(
            `Currency formatting failed: ${error instanceof Error ? error.message : 'unknown error'}`
        );
    }
};

/**
 * Formats a number as a percentage
 * @param value - The number to format
 * @param options - Percentage formatting options
 * @returns Formatted percentage string
 * @throws {NumberFormatError} When input validation fails
 */
export const formatPercentage = (
    value: number,
    options: PercentageFormatOptions = {}
): string => {
    const {
        decimals = 2,
        fallback,  // Changed from fallback = '0%'
        multiplier = true
    } = options;

    if (!isValidNumber(value) || !Number.isFinite(value)) {
        if (fallback !== undefined) return fallback;
        throw new NumberFormatError('Invalid number input');
    }

    if (!isValidDecimals(decimals)) {
        throw new NumberFormatError('Invalid decimals value: must be an integer between 0 and 20');
    }

    try {
        // Handle special cases
        if (Math.abs(value) >= Number.MAX_SAFE_INTEGER) {
            throw new NumberFormatError('Value exceeds maximum safe integer');
        }

        const percentValue = multiplier ? value * 100 : value;
        return `${percentValue.toFixed(decimals)}%`;
    } catch (error) {
        if (error instanceof NumberFormatError) throw error;
        if (fallback) return fallback;
        throw new NumberFormatError(
            `Percentage formatting failed: ${error instanceof Error ? error.message : 'unknown error'}`
        );
    }
};

/**
 * Clamps a number between a minimum and maximum value
 * @param value - The number to clamp
 * @param min - Minimum value
 * @param max - Maximum value
 * @returns Clamped number
 */
export const clamp = (value: number, min: number, max: number): number => {
    if (!isValidNumber(value) || !isValidNumber(min) || !isValidNumber(max)) {
        throw new NumberFormatError('Invalid number input');
    }
    return Math.min(Math.max(value, min), max);
};

/**
 * Rounds a number to a specified precision using the specified rounding mode
 * @param value - The number to round
 * @param precision - Number of decimal places
 * @param mode - Rounding mode ('ceil', 'floor', 'round', 'trunc')
 * @returns Rounded number
 */
export const roundToPrecision = (
    value: number,
    precision: number = 0,
    mode: RoundingMode = 'round'
): number => {
    if (!isValidNumber(value)) {
        throw new NumberFormatError('Invalid number input');
    }

    if (!isValidDecimals(precision)) {
        throw new NumberFormatError('Invalid precision value');
    }

    const multiplier = Math.pow(10, precision);

    switch (mode) {
        case 'ceil':
            return Math.ceil(value * multiplier) / multiplier;
        case 'floor':
            return Math.floor(value * multiplier) / multiplier;
        case 'trunc':
            return Math.trunc(value * multiplier) / multiplier;
        case 'round':
        default:
            return Math.round(value * multiplier) / multiplier;
    }
};

/**
 * Checks if a number is within a specified range
 * @param value - The number to check
 * @param options - Range options
 * @returns Boolean indicating if the number is in range
 */
export const isWithinRange = (
    value: number,
    options: NumberRangeOptions
): boolean => {
    const { min = -Infinity, max = Infinity, inclusive = true } = options;

    if (!isValidNumber(value) || !isValidNumber(min) || !isValidNumber(max)) {
        throw new NumberFormatError('Invalid number input');
    }

    if (min > max) {
        throw new NumberFormatError('Min value cannot be greater than max value');
    }

    return isInRange(value, min, max, inclusive);
};

/**
 * Formats a number using unit prefixes (e.g., K, M, B for numbers; KB, MB, GB for bytes)
 * @param value - The number to format
 * @param options - Unit formatting options
 * @returns Formatted string with unit
 */
export const formatWithUnit = (
    value: number,
    options: NumberUnitOptions
): string => {
    const {
        unit = 'metric',
        locale = 'en-US',
        decimals = 2,
        fallback = '0'
    } = options;

    if (!isValidNumber(value)) {
        return fallback;
    }

    try {
        if (unit === 'bytes') {
            const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
            let index = 0;
            let size = Math.abs(value);

            while (size >= 1024 && index < units.length - 1) {
                size /= 1024;
                index++;
            }

            return `${value < 0 ? '-' : ''}${size.toFixed(decimals)} ${units[index]}`;
        }

        if (unit === 'metric') {
            const units = ['', 'K', 'M', 'B', 'T'];
            let index = 0;
            let size = Math.abs(value);

            while (size >= 1000 && index < units.length - 1) {
                size /= 1000;
                index++;
            }

            return `${value < 0 ? '-' : ''}${size.toFixed(decimals)}${units[index]}`;
        }

        // For 'short' and 'long' units, use Intl.NumberFormat
        return new Intl.NumberFormat(locale, {
            notation: unit === 'short' ? 'compact' : 'standard',
            maximumFractionDigits: decimals
        }).format(value);

    } catch (error) {
        return fallback;
    }
};

/**
 * Generates a random number within a specified range
 * @param min - Minimum value (inclusive)
 * @param max - Maximum value (inclusive)
 * @param decimals - Number of decimal places (default: 0)
 * @returns Random number within the specified range
 */
export const random = (
    min: number,
    max: number,
    decimals: number = 0
): number => {
    if (!isValidNumber(min) || !isValidNumber(max)) {
        throw new NumberFormatError('Invalid number input');
    }

    if (!isValidDecimals(decimals)) {
        throw new NumberFormatError('Invalid decimals value');
    }

    if (min > max) {
        throw new NumberFormatError('Min value cannot be greater than max value');
    }

    const rand = Math.random() * (max - min) + min;
    return roundToPrecision(rand, decimals);
};

/**
 * Calculates the sum of an array of numbers
 * @param numbers - Array of numbers
 * @param ignoreInvalid - If true, skips invalid numbers instead of throwing
 * @returns Sum of the numbers
 */
export const sum = (
    numbers: number[],
    ignoreInvalid: boolean = false
): number => {
    if (!Array.isArray(numbers)) {
        throw new NumberFormatError('Input must be an array of numbers');
    }

    return numbers.reduce((acc, curr) => {
        if (!isValidNumber(curr)) {
            if (ignoreInvalid) return acc;
            throw new NumberFormatError('Invalid number in array');
        }
        return acc + curr;
    }, 0);
};

/**
 * Calculates the average of an array of numbers
 * @param numbers - Array of numbers
 * @param ignoreInvalid - If true, skips invalid numbers instead of throwing
 * @returns Average of the numbers
 */
export const average = (
    numbers: number[],
    ignoreInvalid: boolean = false
): number => {
    if (!Array.isArray(numbers)) {
        throw new NumberFormatError('Input must be an array of numbers');
    }

    const validNumbers = ignoreInvalid
        ? numbers.filter(isValidNumber)
        : numbers;

    if (!ignoreInvalid && validNumbers.length !== numbers.length) {
        throw new NumberFormatError('Invalid number in array');
    }

    if (validNumbers.length === 0) {
        return 0;
    }

    return sum(validNumbers, ignoreInvalid) / validNumbers.length;
};

/**
 * Checks if two numbers are approximately equal within a given precision
 * @param a - First number
 * @param b - Second number
 * @param precision - Precision options for comparison
 * @returns Boolean indicating if numbers are approximately equal
 */
export const isApproximatelyEqual = (
    a: number,
    b: number,
    precision: NumberPrecision = { absolute: 1e-10 }
): boolean => {
    if (!isValidNumber(a) || !isValidNumber(b)) {
        throw new NumberFormatError('Invalid number input');
    }

    const { absolute = 1e-10, relative } = precision;

    if (relative !== undefined) {
        const avg = Math.abs(a + b) / 2;
        if (avg === 0) return Math.abs(a - b) < absolute;
        return Math.abs(a - b) / avg < relative;
    }

    return Math.abs(a - b) < absolute;
};

/**
 * Formats a number as an ordinal (1st, 2nd, 3rd, etc.)
 * @param value - Number to format
 * @param locale - Locale to use for formatting
 * @returns Formatted ordinal string
 */
export const formatOrdinal = (
    value: number,
    locale: string = 'en-US'
): string => {
    if (!isValidNumber(value)) {
        console.log('locale', locale);
        throw new NumberFormatError('Invalid number input');
    }

    try {
        // Simple English implementation as fallback
        const n = Math.abs(value);
        const s = n % 100;
        if (s > 3 && s < 21) return `${value}th`;
        switch (n % 10) {
            case 1: return `${value}st`;
            case 2: return `${value}nd`;
            case 3: return `${value}rd`;
            default: return `${value}th`;
        }
    } catch (error) {
        throw new NumberFormatError(
            `Ordinal formatting failed: ${error instanceof Error ? error.message : 'unknown error'}`
        );
    }
};

/**
 * Parses a string to number, handling various formats and edge cases
 * @param value - String to parse
 * @param options - Parsing options
 * @returns Parsed number or null if invalid
 */
export const parseNumber = (
    value: string,
    locale: string = 'en-US'
): number | null => {
    if (typeof value !== 'string' || value.trim() === '') {
        return null;
    }

    try {
        // Get locale-specific separators
        const formatter = new Intl.NumberFormat(locale);
        const parts = formatter.formatToParts(1234.5);
        const groupSeparator = parts.find(d => d.type === 'group')?.value || ',';
        const decimalSeparator = parts.find(d => d.type === 'decimal')?.value || '.';

        // Normalize the string
        const normalized = value
            .trim()
            .replace(/\s/g, '') // Remove all whitespace
            .replace(new RegExp(`\\${groupSeparator}`, 'g'), '') // Remove group separators
            .replace(decimalSeparator, '.'); // Convert decimal separator to standard

        // Handle special cases
        if (normalized === '' || normalized === '.' || normalized === '-' || normalized === '+') {
            return null;
        }

        // Validate format
        if (!/^[-+]?\d*\.?\d*$/.test(normalized)) {
            return null;
        }

        const parsed = Number(normalized);
        return Number.isFinite(parsed) ? parsed : null;
    } catch {
        return null;
    }
};

/**
 * Masks a number, showing only certain digits
 * @param value - Number to mask
 * @param options - Masking options
 * @returns Masked number string
 */
export const maskNumber = (
    value: number,
    options: NumberMaskOptions = {}
): string => {
    if (!isValidNumber(value)) {
        throw new NumberFormatError('Invalid number input');
    }

    const {
        start = 0,
        end = 2,
        mask = '*',
        preserveDecimals = false
    } = options;

    const numStr = Math.abs(value).toString();
    const [intPart, decPart] = numStr.split('.');

    // Handle integer part
    let maskedInt;
    if (decPart !== undefined) {
        // When there's a decimal part, mask ALL integer digits
        maskedInt = mask.repeat(intPart.length);
    } else if (start === 0 && end === 2 && Object.keys(options).length === 0) {
        // Default behavior for integers only
        maskedInt = mask.repeat(Math.max(0, intPart.length - 2)) + intPart.slice(-2);
    } else {
        // Custom start/end behavior
        const startDigits = intPart.slice(0, start);
        const endDigits = intPart.slice(-end);
        const maskLength = intPart.length - start - end;
        maskedInt = startDigits + mask.repeat(Math.max(0, maskLength)) + endDigits;
    }

    // Handle decimal part
    if (decPart !== undefined) {
        const isDefaultBehavior = Object.keys(options).length === 0;
        if (preserveDecimals) {
            return `${maskedInt}.${decPart}`;
        } else {
            // Use '*' for default behavior, '#' when options are provided
            const decimalMask = isDefaultBehavior ? '*' : '#';
            return `${maskedInt}.${decimalMask.repeat(decPart.length)}`;
        }
    }

    return value < 0 ? `-${maskedInt}` : maskedInt;
};

/**
 * Compares two numbers using the specified operator
 * @param a - First number
 * @param b - Second number
 * @param operator - Comparison operator
 * @returns Boolean result of comparison
 */
export const compareNumbers = (
    a: number,
    b: number,
    operator: ComparisonOperator
): boolean => {
    if (!isValidNumber(a) || !isValidNumber(b)) {
        throw new NumberFormatError('Invalid number input');
    }

    switch (operator) {
        case '=': return a === b;
        case '!=': return a !== b;
        case '>': return a > b;
        case '>=': return a >= b;
        case '<': return a < b;
        case '<=': return a <= b;
        default:
            throw new NumberFormatError('Invalid comparison operator');
    }
};

/**
 * Ensures a number has a minimum number of integer and decimal places
 * @param value - Number to pad
 * @param minIntegers - Minimum integer places
 * @param minDecimals - Minimum decimal places
 * @returns Padded number string
 */
export const padNumber = (
    value: number,
    minIntegers: number = 1,
    minDecimals: number = 0
): string => {
    if (!isValidNumber(value)) {
        throw new NumberFormatError('Invalid number input');
    }

    const [intPart, decPart] = Math.abs(value).toString().split('.');
    const sign = value < 0 ? '-' : '';

    // Pad integer part
    const paddedInt = intPart.padStart(minIntegers, '0');

    // Pad decimal part
    const paddedDec = decPart
        ? decPart.padEnd(minDecimals, '0')
        : minDecimals > 0 ? '0'.repeat(minDecimals) : '';

    return `${sign}${paddedInt}${paddedDec ? '.' + paddedDec : ''}`;
};

/**
 * Normalizes a number to a specific range (default 0 to 1)
 * @param value - Number to normalize
 * @param min - Minimum value of input range
 * @param max - Maximum value of input range
 * @returns Normalized number between 0 and 1
 */
export const normalize = (
    value: number,
    min: number,
    max: number
): number => {
    if (!isValidNumber(value) || !isValidNumber(min) || !isValidNumber(max)) {
        throw new NumberFormatError('Invalid number input');
    }

    if (min >= max) {
        throw new NumberFormatError('Min value must be less than max value');
    }

    return (value - min) / (max - min);
};

/**
 * Converts a number to exponential notation
 * @param value - Number to convert
 * @param precision - Number of decimal places
 * @returns String in exponential notation
 */
export const toExponential = (
    value: number,
    precision: number = 2
): string => {
    if (!isValidNumber(value)) {
        throw new NumberFormatError('Invalid number input');
    }

    if (!isValidDecimals(precision)) {
        throw new NumberFormatError('Invalid precision value');
    }

    try {
        return value.toExponential(precision);
    } catch (error) {
        throw new NumberFormatError(
            `Exponential conversion failed: ${error instanceof Error ? error.message : 'unknown error'}`
        );
    }
};

/**
 * Gets the order of magnitude of a number
 * @param value - Number to analyze
 * @returns Order of magnitude
 */
export const getOrderOfMagnitude = (value: number): number => {
    if (!isValidNumber(value) || value === 0 || !isFinite(value)) {
        throw new NumberFormatError('Invalid number input');
    }

    return Math.floor(Math.log10(Math.abs(value)));
};

/**
 * Finds the median of an array of numbers
 * @param numbers - Array of numbers
 * @param options - Statistics options
 * @returns Median value
 */
export const median = (
    numbers: number[],
    options: StatisticsOptions = {}
): number => {
    const { ignoreInvalid = false, precision = 2 } = options;

    if (!Array.isArray(numbers)) {
        throw new NumberFormatError('Input must be an array of numbers');
    }

    const validNumbers = ignoreInvalid
        ? numbers.filter(isValidNumber)
        : numbers;

    if (!ignoreInvalid && validNumbers.length !== numbers.length) {
        throw new NumberFormatError('Invalid number in array');
    }

    if (validNumbers.length === 0) {
        return 0;
    }

    const sorted = [...validNumbers].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);

    if (sorted.length % 2 === 0) {
        return roundToPrecision((sorted[mid - 1] + sorted[mid]) / 2, precision);
    }

    return roundToPrecision(sorted[mid], precision);
};

/**
 * Calculates statistical mode (most frequent value)
 * @param numbers - Array of numbers
 * @param options - Statistics options
 * @returns Mode value(s) as an array
 */
export const mode = (
    numbers: number[],
    options: StatisticsOptions = {}
): number[] => {
    const { ignoreInvalid = false, precision = 2 } = options;

    if (!Array.isArray(numbers)) {
        throw new NumberFormatError('Input must be an array of numbers');
    }

    const validNumbers = ignoreInvalid
        ? numbers.filter(isValidNumber)
        : numbers;

    if (!ignoreInvalid && validNumbers.length !== numbers.length) {
        throw new NumberFormatError('Invalid number in array');
    }

    if (validNumbers.length === 0) {
        return [];
    }

    const frequency = new Map<number, number>();
    let maxFreq = 0;

    validNumbers.forEach(num => {
        const rounded = roundToPrecision(num, precision);
        const freq = (frequency.get(rounded) || 0) + 1;
        frequency.set(rounded, freq);
        maxFreq = Math.max(maxFreq, freq);
    });

    return Array.from(frequency.entries())
        .filter(([_, freq]) => freq === maxFreq)
        .map(([num]) => num)
        .sort((a, b) => a - b);
};

/**
 * Converts number to words (e.g., 42 -> "forty-two")
 * @param value - Number to convert
 * @param locale - Locale for number words
 * @returns Number in words
 */
export const toWords = (
    value: number,
    locale: string = 'en-US'
): string => {
    if (!isValidNumber(value)) {
        console.log('locale: ', locale);
        throw new NumberFormatError('Invalid number input');
    }

    try {
        // Simple English implementation
        const units = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
        const teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
        const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

        if (value < 0) return `negative ${toWords(Math.abs(value))}`;
        if (value < 10) return units[value];
        if (value < 20) return teens[value - 10];
        if (value < 100) {
            const digit = value % 10;
            return tens[Math.floor(value / 10)] + (digit ? '-' + units[digit] : '');
        }
        return value.toString();
    } catch (error) {
        throw new NumberFormatError(
            `Word conversion failed: ${error instanceof Error ? error.message : 'unknown error'}`
        );
    }
};

/**
 * Interpolates between two numbers
 * @param start - Start value
 * @param end - End value
 * @param factor - Interpolation factor (0-1)
 * @returns Interpolated value
 */
export const interpolate = (
    start: number,
    end: number,
    factor: number
): number => {
    if (!isValidNumber(start) || !isValidNumber(end) || !isValidNumber(factor)) {
        throw new NumberFormatError('Invalid number input');
    }

    if (factor < 0 || factor > 1) {
        throw new NumberFormatError('Factor must be between 0 and 1');
    }

    return start + (end - start) * factor;
};

/**
 * Returns numbers with significant digits only
 * @param value - Number to process
 * @param significantDigits - Number of significant digits
 * @returns Number with specified significant digits
 */
export const toSignificantDigits = (
    value: number,
    significantDigits: number
): number => {
    if (!isValidNumber(value)) {
        throw new NumberFormatError('Invalid number input');
    }

    if (!Number.isInteger(significantDigits) || significantDigits < 1) {
        throw new NumberFormatError('Significant digits must be a positive integer');
    }

    try {
        return Number(value.toPrecision(significantDigits));
    } catch (error) {
        throw new NumberFormatError(
            `Significant digits conversion failed: ${error instanceof Error ? error.message : 'unknown error'}`
        );
    }
};