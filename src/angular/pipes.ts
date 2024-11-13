import { Pipe, PipeTransform } from '@angular/core';
import {
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
    NumberFormatOptions,
    CurrencyFormatOptions,
    PercentageFormatOptions,
    NumberUnitOptions,
    NumberMaskOptions
} from '../core';

/**
 * Formats a number with thousand separators and decimal places
 * Example: {{ 1234.567 | polyFormatNumber }} -> "1,234.57"
 * Example: {{ 1234.567 | polyFormatNumber:{ decimals: 3 } }} -> "1,234.567"
 */
@Pipe({
    name: 'polyFormatNumber',
    pure: true
})
export class PolyFormatNumberPipe implements PipeTransform {
    transform(value: number | null | undefined, options?: NumberFormatOptions): string {
        if (value === null || value === undefined) {
            return options?.fallback || '';
        }
        try {
            return formatNumber(Number(value), options);
        } catch {
            return options?.fallback || '';
        }
    }
}

/**
 * Formats a number as currency with locale support
 * Example: {{ 1234.56 | polyFormatCurrency }} -> "$1,234.56"
 * Example: {{ 1234.56 | polyFormatCurrency:{ currency: 'EUR', locale: 'de-DE' } }} -> "1.234,56 €"
 */
@Pipe({
    name: 'polyFormatCurrency',
    pure: true
})
export class PolyFormatCurrencyPipe implements PipeTransform {
    transform(value: number | null | undefined, options?: CurrencyFormatOptions): string {
        if (value === null || value === undefined) {
            return options?.fallback || '';
        }
        try {
            return formatCurrency(Number(value), options);
        } catch {
            return options?.fallback || '';
        }
    }
}

/**
 * Formats a number as a percentage
 * Example: {{ 0.1234 | polyFormatPercentage }} -> "12.34%"
 * Example: {{ 0.1234 | polyFormatPercentage:{ decimals: 1 } }} -> "12.3%"
 */
@Pipe({
    name: 'polyFormatPercentage',
    pure: true
})
export class PolyFormatPercentagePipe implements PipeTransform {
    transform(value: number | null | undefined, options?: PercentageFormatOptions): string {
        if (value === null || value === undefined) {
            return options?.fallback || '';
        }
        try {
            return formatPercentage(Number(value), options);
        } catch {
            return options?.fallback || '';
        }
    }
}

/**
 * Formats a number with unit prefixes (bytes, metric, or compact notation)
 * Example: {{ 1024 | polyFormatWithUnit:{ unit: 'bytes' } }} -> "1.00 KB"
 * Example: {{ 1000000 | polyFormatWithUnit:{ unit: 'metric' } }} -> "1.00M"
 */
@Pipe({
    name: 'polyFormatWithUnit',
    pure: true
})
export class PolyFormatWithUnitPipe implements PipeTransform {
    // Default options that satisfy NumberUnitOptions
    private readonly defaultOptions: Required<NumberUnitOptions> = {
        unit: 'metric',
        locale: 'en-US',
        decimals: 2,
        fallback: '0'
    };

    transform(value: number | null | undefined, options: Partial<NumberUnitOptions> = {}): string {
        // Create complete options with all required properties
        const mergedOptions: NumberUnitOptions = {
            ...this.defaultOptions,
            ...options
        };

        if (value === null || value === undefined) {
            return mergedOptions.fallback || '0';
        }

        try {
            return formatWithUnit(Number(value), mergedOptions);
        } catch {
            return mergedOptions.fallback || '0';
        }
    }
}

/**
 * Formats a number as an ordinal string
 * Example: {{ 1 | polyFormatOrdinal }} -> "1st"
 * Example: {{ 2 | polyFormatOrdinal:'fr-FR' }} -> "2e"
 */
@Pipe({
    name: 'polyFormatOrdinal',
    pure: true
})
export class PolyFormatOrdinalPipe implements PipeTransform {
    transform(value: number | null | undefined, locale?: string): string {
        if (value === null || value === undefined) {
            return '';
        }
        try {
            return formatOrdinal(Number(value), locale);
        } catch {
            return value.toString();
        }
    }
}

/**
 * Converts a number to exponential notation
 * Example: {{ 1234.567 | polyToExponential }} -> "1.23e+3"
 * Example: {{ 1234.567 | polyToExponential:4 }} -> "1.2346e+3"
 */
@Pipe({
    name: 'polyToExponential',
    pure: true
})
export class PolyToExponentialPipe implements PipeTransform {
    transform(value: number | null | undefined, precision?: number): string {
        if (value === null || value === undefined) {
            return '';
        }
        try {
            return toExponential(Number(value), precision);
        } catch {
            return value.toString();
        }
    }
}

/**
 * Converts numbers to words
 * Example: {{ 42 | polyToWords }} -> "forty-two"
 * Example: {{ 42 | polyToWords:'fr-FR' }} -> "quarante-deux"
 */
@Pipe({
    name: 'polyToWords',
    pure: true
})
export class PolyToWordsPipe implements PipeTransform {
    transform(value: number | null | undefined, locale?: string): string {
        if (value === null || value === undefined) {
            return '';
        }
        try {
            return toWords(Number(value), locale);
        } catch {
            return value.toString();
        }
    }
}

/**
 * Masks a number, useful for sensitive data display
 * Example: {{ 1234567 | polyMaskNumber }} -> "*****67"
 * Example: {{ 1234.56 | polyMaskNumber:{ preserveDecimals: true } }} -> "****.56"
 */
@Pipe({
    name: 'polyMaskNumber',
    pure: true
})
export class PolyMaskNumberPipe implements PipeTransform {
    transform(value: number | null | undefined, options?: NumberMaskOptions): string {
        if (value === null || value === undefined) {
            return '';
        }
        try {
            return maskNumber(Number(value), options);
        } catch {
            return value.toString();
        }
    }
}

/**
 * Ensures a number has a minimum number of integer and decimal places
 * Example: {{ 5 | polyPadNumber:2 }} -> "05"
 * Example: {{ 5.2 | polyPadNumber:2:2 }} -> "05.20"
 */
@Pipe({
    name: 'polyPadNumber',
    pure: true
})
export class PolyPadNumberPipe implements PipeTransform {
    transform(
        value: number | null | undefined,
        minIntegers: number = 1,
        minDecimals: number = 0
    ): string {
        if (value === null || value === undefined) {
            return '';
        }
        try {
            return padNumber(Number(value), minIntegers, minDecimals);
        } catch {
            return value.toString();
        }
    }
}

/**
 * Returns numbers with significant digits only
 * Example: {{ 1234.567 | polyToSignificantDigits:3 }} -> 1230
 * Example: {{ 0.0001234 | polyToSignificantDigits:3 }} -> 0.000123
 */
@Pipe({
    name: 'polyToSignificantDigits',
    pure: true
})
export class PolyToSignificantDigitsPipe implements PipeTransform {
    transform(value: number | null | undefined, significantDigits: number): number {
        if (value === null || value === undefined) {
            return 0;
        }
        try {
            return toSignificantDigits(Number(value), significantDigits);
        } catch {
            return Number(value);
        }
    }
}

// Export all pipes for module use
export const POLY_NUMBER_PIPES = [
    PolyFormatNumberPipe,
    PolyFormatCurrencyPipe,
    PolyFormatPercentagePipe,
    PolyFormatWithUnitPipe,
    PolyFormatOrdinalPipe,
    PolyToExponentialPipe,
    PolyToWordsPipe,
    PolyMaskNumberPipe,
    PolyPadNumberPipe,
    PolyToSignificantDigitsPipe
];