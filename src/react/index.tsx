import React, { useMemo, useCallback } from 'react';
import {
    // Core formatting functions
    formatNumber,
    formatCurrency,
    formatPercentage,
    formatWithUnit,
    formatOrdinal,
    toExponential,
    toWords,
    maskNumber,
    padNumber,
    toSignificantDigits,

    // Math operations
    clamp,
    roundToPrecision,
    interpolate,
    normalize,
    random,

    // Statistical functions
    sum,
    average,
    median,
    mode,

    // Utility functions
    compareNumbers,
    isApproximatelyEqual,
    isWithinRange,
    parseNumber,
    getOrderOfMagnitude,

    // Types
    NumberFormatOptions,
    CurrencyFormatOptions,
    PercentageFormatOptions,
    NumberUnitOptions,
    NumberMaskOptions,
    NumberRangeOptions,
    StatisticsOptions,
    ComparisonOperator,
    RoundingMode,
    NumberPrecision,

    // Error
    NumberFormatError
} from '../core';

// === Formatting Hooks ===

/**
 * Hook for formatting ordinal numbers
 * @example
 * ```tsx
 * const formatted = useOrdinalFormat(1); // "1st"
 * ```
 */
export const useOrdinalFormat = (
    value: number | null | undefined,
    locale?: string
) => {
    return useMemo(() => {
        if (value === null || value === undefined) return '';
        try {
            return formatOrdinal(value, locale);
        } catch {
            return value.toString();
        }
    }, [value, locale]);
};

/**
 * Hook for converting numbers to exponential notation
 * @example
 * ```tsx
 * const formatted = useExponentialFormat(1234.567, 2); // "1.23e+3"
 * ```
 */
export const useExponentialFormat = (
    value: number | null | undefined,
    precision?: number
) => {
    return useMemo(() => {
        if (value === null || value === undefined) return '';
        try {
            return toExponential(value, precision);
        } catch {
            return value.toString();
        }
    }, [value, precision]);
};

/**
 * Hook for checking approximate equality between numbers
 * @example
 * ```tsx
 * const isEqual = useApproximatelyEqual(0.1 + 0.2, 0.3, { absolute: 0.0001 }); // true
 * ```
 */
export const useApproximatelyEqual = (
    a: number | null | undefined,
    b: number | null | undefined,
    precision?: NumberPrecision
) => {
    return useMemo(() => {
        if (a === null || a === undefined || b === null || b === undefined) {
            return false;
        }
        try {
            return isApproximatelyEqual(a, b, precision);
        } catch {
            return false;
        }
    }, [a, b, JSON.stringify(precision)]);
};

/**
 * Hook for parsing string to number with locale support
 * @example
 * ```tsx
 * const number = useParseNumber('1,234.56', 'en-US'); // 1234.56
 * ```
 */
export const useParseNumber = (
    value: string | null | undefined,
    locale?: string
) => {
    return useMemo(() => {
        if (!value) return null;
        try {
            return parseNumber(value, locale);
        } catch {
            return null;
        }
    }, [value, locale]);
};

/**
 * Hook for getting the order of magnitude of a number
 * @example
 * ```tsx
 * const magnitude = useOrderOfMagnitude(1000); // 3
 * ```
 */
export const useOrderOfMagnitude = (
    value: number | null | undefined
) => {
    return useMemo(() => {
        if (value === null || value === undefined) return null;
        try {
            return getOrderOfMagnitude(value);
        } catch {
            return null;
        }
    }, [value]);
};

/**
 * Hook for converting numbers to words
 * @example
 * ```tsx
 * const words = useNumberToWords(42); // "forty-two"
 * ```
 */
export const useNumberToWords = (
    value: number | null | undefined,
    locale?: string
) => {
    return useMemo(() => {
        if (value === null || value === undefined) return '';
        try {
            return toWords(value, locale);
        } catch {
            return value.toString();
        }
    }, [value, locale]);
};

/**
 * Hook for masking numbers
 * @example
 * ```tsx
 * const masked = useMaskNumber(1234567); // "*****67"
 * ```
 */
export const useMaskNumber = (
    value: number | null | undefined,
    options?: NumberMaskOptions
) => {
    return useMemo(() => {
        if (value === null || value === undefined) return '';
        try {
            return maskNumber(value, options);
        } catch {
            return value.toString();
        }
    }, [value, JSON.stringify(options)]);
};

/**
 * Hook for padding numbers
 * @example
 * ```tsx
 * const padded = usePadNumber(5, 2); // "05"
 * ```
 */
export const usePadNumber = (
    value: number | null | undefined,
    minIntegers?: number,
    minDecimals?: number
) => {
    return useMemo(() => {
        if (value === null || value === undefined) return '';
        try {
            return padNumber(value, minIntegers, minDecimals);
        } catch {
            return value.toString();
        }
    }, [value, minIntegers, minDecimals]);
};

/**
 * Hook for converting numbers to significant digits
 * @example
 * ```tsx
 * const significant = useSignificantDigits(1234.567, 3); // 1230
 * ```
 */
export const useSignificantDigits = (
    value: number | null | undefined,
    significantDigits: number
) => {
    return useMemo(() => {
        if (value === null || value === undefined) return null;
        try {
            return toSignificantDigits(value, significantDigits);
        } catch {
            return value;
        }
    }, [value, significantDigits]);
};

/**
 * Hook for normalizing numbers to a range
 * @example
 * ```tsx
 * const normalized = useNormalize(50, 0, 100); // 0.5
 * ```
 */
export const useNormalize = (
    value: number,
    min: number,
    max: number
) => {
    return useMemo(() => {
        try {
            return normalize(value, min, max);
        } catch {
            return value;
        }
    }, [value, min, max]);
};

/**
 * Hook for generating random numbers
 * @example
 * ```tsx
 * const randomNum = useRandom(1, 100, 2);
 * ```
 */
export const useRandom = (
    min: number,
    max: number,
    decimals?: number
) => {
    return useCallback(() => {
        try {
            return random(min, max, decimals);
        } catch {
            return min;
        }
    }, [min, max, decimals]);
};

/**
 * Hook for formatting numbers with thousand separators and decimal places
 * @example
 * ```tsx
 * const formatted = useNumberFormat(1234.56, { decimals: 2 }); // "1,234.56"
 * ```
 */
export const useNumberFormat = (
    value: number | null | undefined,
    options?: NumberFormatOptions
) => {
    return useMemo(() => {
        if (value === null || value === undefined) return options?.fallback ?? '';
        try {
            return formatNumber(value, options);
        } catch (error) {
            return options?.fallback ?? '';
        }
    }, [value, JSON.stringify(options)]);
};

/**
 * Hook for formatting currency values
 * @example
 * ```tsx
 * const formatted = useCurrencyFormat(1234.56, { currency: 'EUR' }); // "€1,234.56"
 * ```
 */
export const useCurrencyFormat = (
    value: number | null | undefined,
    options?: CurrencyFormatOptions
) => {
    return useMemo(() => {
        if (value === null || value === undefined) return options?.fallback ?? '';
        try {
            return formatCurrency(value, options);
        } catch (error) {
            return options?.fallback ?? '';
        }
    }, [value, JSON.stringify(options)]);
};

/**
 * Hook for formatting percentage values
 * @example
 * ```tsx
 * const formatted = usePercentageFormat(0.1234, { decimals: 1 }); // "12.3%"
 * ```
 */
export const usePercentageFormat = (
    value: number | null | undefined,
    options?: PercentageFormatOptions
) => {
    return useMemo(() => {
        if (value === null || value === undefined) return options?.fallback ?? '';
        try {
            return formatPercentage(value, options);
        } catch (error) {
            return options?.fallback ?? '';
        }
    }, [value, JSON.stringify(options)]);
};

// === Mathematical Operation Hooks ===

/**
 * Hook for clamping a number between min and max values
 * @example
 * ```tsx
 * const clamped = useClamp(value, 0, 100);
 * ```
 */
export const useClamp = (
    value: number,
    min: number,
    max: number
) => {
    return useMemo(() => {
        try {
            return clamp(value, min, max);
        } catch {
            return value;
        }
    }, [value, min, max]);
};

/**
 * Hook for rounding numbers with specific precision
 * @example
 * ```tsx
 * const rounded = useRoundToPrecision(3.14159, 2); // 3.14
 * ```
 */
export const useRoundToPrecision = (
    value: number,
    precision?: number,
    mode?: RoundingMode
) => {
    return useMemo(() => {
        try {
            return roundToPrecision(value, precision, mode);
        } catch {
            return value;
        }
    }, [value, precision, mode]);
};

/**
 * Hook for linear interpolation between numbers
 * @example
 * ```tsx
 * const interpolated = useInterpolate(0, 100, 0.5); // 50
 * ```
 */
export const useInterpolate = (
    start: number,
    end: number,
    factor: number
) => {
    return useMemo(() => {
        try {
            return interpolate(start, end, factor);
        } catch {
            return start;
        }
    }, [start, end, factor]);
};

// === Statistical Hooks ===

/**
 * Hook for calculating statistical values from an array of numbers
 * @example
 * ```tsx
 * const { total, avg, med, modes } = useStatistics([1, 2, 2, 3, 4]);
 * ```
 */
export const useStatistics = (
    numbers: number[],
    options?: StatisticsOptions
) => {
    return useMemo(() => {
        try {
            return {
                total: sum(numbers),
                average: average(numbers),
                median: median(numbers, options),
                modes: mode(numbers, options)
            };
        } catch {
            return {
                total: 0,
                average: 0,
                median: 0,
                modes: []
            };
        }
    }, [numbers, JSON.stringify(options)]);
};

// === Utility Hooks ===

/**
 * Hook for comparing numbers
 * @example
 * ```tsx
 * const isGreater = useCompareNumbers(5, 3, '>'); // true
 * ```
 */
export const useCompareNumbers = (
    a: number,
    b: number,
    operator: ComparisonOperator
) => {
    return useMemo(() => {
        try {
            return compareNumbers(a, b, operator);
        } catch {
            return false;
        }
    }, [a, b, operator]);
};

/**
 * Hook for checking if a number is within range
 * @example
 * ```tsx
 * const inRange = useIsWithinRange(5, { min: 0, max: 10 }); // true
 * ```
 */
export const useIsWithinRange = (
    value: number,
    options: NumberRangeOptions
) => {
    return useMemo(() => {
        try {
            return isWithinRange(value, options);
        } catch {
            return false;
        }
    }, [value, JSON.stringify(options)]);
};

// === Display Components ===

interface PolymorphicProps<T extends React.ElementType> {
    as?: T;
    children?: React.ReactNode;
}

export type PropsWithPolymorphicRef<
    T extends React.ElementType,
    P = object
    > = P & PolymorphicProps<T> & Omit<React.ComponentPropsWithRef<T>, keyof (P & PolymorphicProps<T>)>;

/**
 * Hook for unit-based formatting (bytes, metric, etc.)
 * @example
 * ```tsx
 * const formatted = useUnitFormat(1024, { unit: 'bytes' }); // "1 KB"
 * ```
 */
export const useUnitFormat = (
    value: number | null | undefined,
    options?: NumberUnitOptions
) => {
    return useMemo(() => {
        if (value === null || value === undefined) return options?.fallback ?? '';
        try {
            return formatWithUnit(value, options || { unit: 'metric' }); // Provide default options
        } catch (error) {
            return options?.fallback ?? '';
        }
    }, [value, JSON.stringify(options)]);
};

type AsProp<C extends React.ElementType> = {
    as?: C;
};

type PropsToOmit<C extends React.ElementType, P> = keyof (AsProp<C> & P);

type PolymorphicComponentProp<C extends React.ElementType, Props = object> =
    React.PropsWithChildren<Props & AsProp<C>> &
    Omit<React.ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;

// === Components ===

/**
 * Component for displaying formatted numbers
 */
export const FormattedNumber = <C extends React.ElementType = 'span'>(
    props: PolymorphicComponentProp<C, {
        value: number | null | undefined;
        options?: NumberFormatOptions;
    }>
) => {
    const { value, options, as, ...rest } = props;
    const formatted = useNumberFormat(value, options);
    const Component = (as ?? 'span') as React.ElementType;

    return React.createElement(Component, rest, formatted);
};

/**
 * Component for displaying formatted currency
 */
export const FormattedCurrency = <C extends React.ElementType = 'span'>(
    props: PolymorphicComponentProp<C, {
        value: number | null | undefined;
        options?: CurrencyFormatOptions;
    }>
) => {
    const { value, options, as, ...rest } = props;
    const formatted = useCurrencyFormat(value, options);
    const Component = (as ?? 'span') as React.ElementType;

    return React.createElement(Component, rest, formatted);
};

/**
 * Component for displaying formatted percentages
 */
export const FormattedPercentage = <C extends React.ElementType = 'span'>(
    props: PolymorphicComponentProp<C, {
        value: number | null | undefined;
        options?: PercentageFormatOptions;
    }>
) => {
    const { value, options, as, ...rest } = props;
    const formatted = usePercentageFormat(value, options);
    const Component = (as ?? 'span') as React.ElementType;

    return React.createElement(Component, rest, formatted);
};

/**
 * Component for displaying numbers with units
 */
export const FormattedUnit = <C extends React.ElementType = 'span'>(
    props: PolymorphicComponentProp<C, {
        value: number | null | undefined;
        options?: NumberUnitOptions;
    }>
) => {
    const { value, options, as, ...rest } = props;
    const formatted = useUnitFormat(value, options);
    const Component = (as ?? 'span') as React.ElementType;

    return React.createElement(Component, rest, formatted);
};
/**
 * Component for displaying ordinal numbers
 */
export const FormattedOrdinal = <C extends React.ElementType = 'span'>(
    props: PolymorphicComponentProp<C, {
        value: number | null | undefined;
        locale?: string;
    }>
) => {
    const { value, locale, as, ...rest } = props;
    const formatted = useOrdinalFormat(value, locale);
    const Component = (as ?? 'span') as React.ElementType;

    return React.createElement(Component, rest, formatted);
};

/**
 * Component for displaying masked numbers
 */
export const MaskedNumber = <C extends React.ElementType = 'span'>(
    props: PolymorphicComponentProp<C, {
        value: number | null | undefined;
        options?: NumberMaskOptions;
    }>
) => {
    const { value, options, as, ...rest } = props;
    const masked = useMaskNumber(value, options);
    const Component = (as ?? 'span') as React.ElementType;

    return React.createElement(Component, rest, masked);
};

/**
 * Component for displaying padded numbers
 */
export const PaddedNumber = <C extends React.ElementType = 'span'>(
    props: PolymorphicComponentProp<C, {
        value: number | null | undefined;
        minIntegers?: number;
        minDecimals?: number;
    }>
) => {
    const { value, minIntegers, minDecimals, as, ...rest } = props;
    const padded = usePadNumber(value, minIntegers, minDecimals);
    const Component = (as ?? 'span') as React.ElementType;

    return React.createElement(Component, rest, padded);
};

/**
 * Component for displaying comparing two numbers
 */
export const NumberComparison = <C extends React.ElementType = 'span'>(
    props: PolymorphicComponentProp<C, {
        a: number;
        b: number;
        operator: ComparisonOperator;
        trueText?: string;
        falseText?: string;
    }>
) => {
    const { a, b, operator, trueText = 'true', falseText = 'false', as, ...rest } = props;
    const result = useMemo(() => {
        try {
            return compareNumbers(a, b, operator);
        } catch {
            return false;
        }
    }, [a, b, operator]);

    const Component = (as ?? 'span') as React.ElementType;
    return React.createElement(Component, rest, result ? trueText : falseText);
};

/**
 * Component for displaying approximate equality between numbers
 */
export const ApproximateEquality = <C extends React.ElementType = 'span'>(
    props: PolymorphicComponentProp<C, {
        a: number;
        b: number;
        precision?: NumberPrecision;
        trueText?: string;
        falseText?: string;
    }>
) => {
    const { a, b, precision, trueText = 'equal', falseText = 'not equal', as, ...rest } = props;
    const isEqual = useApproximatelyEqual(a, b, precision);

    const Component = (as ?? 'span') as React.ElementType;
    return React.createElement(Component, rest, isEqual ? trueText : falseText);
};

/**
 * Component for displaying parsed numbers
 */
export const ParsedNumber = <C extends React.ElementType = 'span'>(
    props: PolymorphicComponentProp<C, {
        value: string;
        locale?: string;
        fallback?: string;
    }>
) => {
    const { value, locale, fallback = '', as, ...rest } = props;
    const parsed = useParseNumber(value, locale);

    const Component = (as ?? 'span') as React.ElementType;
    return React.createElement(Component, rest, parsed !== null ? parsed.toString() : fallback);
};

/**
 * Component for displaying order of magnitude
 */
export const OrderOfMagnitude = <C extends React.ElementType = 'span'>(
    props: PolymorphicComponentProp<C, {
        value: number;
        fallback?: string;
    }>
) => {
    const { value, fallback = '', as, ...rest } = props;
    const magnitude = useOrderOfMagnitude(value);

    const Component = (as ?? 'span') as React.ElementType;
    return React.createElement(Component, rest, magnitude !== null ? magnitude.toString() : fallback);
};

export type {
    AsProp,
    PolymorphicComponentProp,
    NumberFormatOptions,
    CurrencyFormatOptions,
    PercentageFormatOptions,
    NumberUnitOptions,
    NumberMaskOptions,
    NumberRangeOptions,
    StatisticsOptions,
    ComparisonOperator,
    RoundingMode,
    NumberPrecision,
    NumberFormatError
};