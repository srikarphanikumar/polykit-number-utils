import { Injectable } from '@angular/core';
import {
    clamp,
    roundToPrecision,
    isWithinRange,
    random,
    sum,
    average,
    median,
    mode,
    interpolate,
    normalize,
    getOrderOfMagnitude,
    isApproximatelyEqual,
    compareNumbers,
    parseNumber,
    ComparisonOperator,
    NumberRangeOptions,
    NumberPrecision,
    RoundingMode,
    StatisticsOptions
} from '../core';

/**
 * Angular service providing utility functions for number manipulation and analysis.
 * All methods are stateless and can be safely used across the application.
 */
@Injectable({
    providedIn: 'root'
})
export class PolyNumberUtilService {
    /**
     * Clamps a number between minimum and maximum values
     * @param value The number to clamp
     * @param min Minimum allowed value
     * @param max Maximum allowed value
     * @returns The clamped number
     * @throws {NumberFormatError} If inputs are invalid
     */
    clamp(value: number, min: number, max: number): number {
        return clamp(value, min, max);
    }

    /**
     * Rounds a number to specified precision using given rounding mode
     * @param value The number to round
     * @param precision Number of decimal places (default: 0)
     * @param mode Rounding mode (default: 'round')
     * @returns Rounded number
     * @throws {NumberFormatError} If inputs are invalid
     */
    roundToPrecision(value: number, precision?: number, mode?: RoundingMode): number {
        return roundToPrecision(value, precision, mode);
    }

    /**
     * Checks if a number is within specified range
     * @param value Number to check
     * @param options Range options including min, max, and inclusivity
     * @returns Boolean indicating if number is in range
     * @throws {NumberFormatError} If inputs are invalid
     */
    isWithinRange(value: number, options: NumberRangeOptions): boolean {
        return isWithinRange(value, options);
    }

    /**
     * Generates a random number within specified range
     * @param min Minimum value (inclusive)
     * @param max Maximum value (inclusive)
     * @param decimals Number of decimal places (default: 0)
     * @returns Random number within range
     * @throws {NumberFormatError} If inputs are invalid
     */
    random(min: number, max: number, decimals?: number): number {
        return random(min, max, decimals);
    }

    /**
     * Calculates sum of numbers in array
     * @param numbers Array of numbers
     * @param ignoreInvalid If true, skips invalid numbers
     * @returns Sum of numbers
     * @throws {NumberFormatError} If array contains invalid numbers and ignoreInvalid is false
     */
    sum(numbers: number[], ignoreInvalid?: boolean): number {
        return sum(numbers, ignoreInvalid);
    }

    /**
     * Calculates average of numbers in array
     * @param numbers Array of numbers
     * @param ignoreInvalid If true, skips invalid numbers
     * @returns Average of numbers
     * @throws {NumberFormatError} If array contains invalid numbers and ignoreInvalid is false
     */
    average(numbers: number[], ignoreInvalid?: boolean): number {
        return average(numbers, ignoreInvalid);
    }

    /**
     * Calculates median of numbers in array
     * @param numbers Array of numbers
     * @param options Statistics options
     * @returns Median value
     * @throws {NumberFormatError} If array contains invalid numbers
     */
    median(numbers: number[], options?: StatisticsOptions): number {
        return median(numbers, options);
    }

    /**
     * Finds mode (most frequent values) in array of numbers
     * @param numbers Array of numbers
     * @param options Statistics options
     * @returns Array of mode values
     * @throws {NumberFormatError} If array contains invalid numbers
     */
    mode(numbers: number[], options?: StatisticsOptions): number[] {
        return mode(numbers, options);
    }

    /**
     * Linearly interpolates between two numbers
     * @param start Start value
     * @param end End value
     * @param factor Interpolation factor (0-1)
     * @returns Interpolated value
     * @throws {NumberFormatError} If inputs are invalid
     */
    interpolate(start: number, end: number, factor: number): number {
        return interpolate(start, end, factor);
    }

    /**
     * Normalizes a number to a specific range
     * @param value Number to normalize
     * @param min Minimum value of input range
     * @param max Maximum value of input range
     * @returns Normalized number (0-1)
     * @throws {NumberFormatError} If inputs are invalid
     */
    normalize(value: number, min: number, max: number): number {
        return normalize(value, min, max);
    }

    /**
     * Gets order of magnitude of a number
     * @param value Number to analyze
     * @returns Order of magnitude
     * @throws {NumberFormatError} If input is invalid
     */
    getOrderOfMagnitude(value: number): number {
        return getOrderOfMagnitude(value);
    }

    /**
     * Checks if two numbers are approximately equal
     * @param a First number
     * @param b Second number
     * @param precision Precision options for comparison
     * @returns Boolean indicating if numbers are approximately equal
     * @throws {NumberFormatError} If inputs are invalid
     */
    isApproximatelyEqual(a: number, b: number, precision?: NumberPrecision): boolean {
        return isApproximatelyEqual(a, b, precision);
    }

    /**
     * Compares two numbers using specified operator
     * @param a First number
     * @param b Second number
     * @param operator Comparison operator
     * @returns Boolean result of comparison
     * @throws {NumberFormatError} If inputs are invalid
     */
    compareNumbers(a: number, b: number, operator: ComparisonOperator): boolean {
        return compareNumbers(a, b, operator);
    }

    /**
     * Parses string to number using specified locale
     * @param value String to parse
     * @param locale Locale for parsing (default: 'en-US')
     * @returns Parsed number or null if invalid
     */
    parseNumber(value: string, locale?: string): number | null {
        return parseNumber(value, locale);
    }
}