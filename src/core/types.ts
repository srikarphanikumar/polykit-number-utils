// Types
export type NumberFormatOptions = {
    decimals?: number;
    thousandsSeparator?: string;
    decimalSeparator?: string;
    fallback?: string;
};

export type CurrencyFormatOptions = {
    currency?: string;
    locale?: string;
    fallback?: string;
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
    useGrouping?: boolean;
};

export type PercentageFormatOptions = {
    decimals?: number;
    fallback?: string;
    multiplier?: boolean; // If true, multiplies by 100 before formatting
};

export type RoundingMode = 'ceil' | 'floor' | 'round' | 'trunc';

export type NumberRangeOptions = {
    min?: number;
    max?: number;
    inclusive?: boolean;
};

export type NumberUnitOptions = {
    unit: 'bytes' | 'metric' | 'short' | 'long';
    locale?: string;
    decimals?: number;
    fallback?: string;
};

export type ComparisonOperator = '=' | '!=' | '>' | '>=' | '<' | '<=';

export type NumberPrecision = {
    absolute?: number;  // For absolute difference comparison
    relative?: number;  // For relative difference comparison (percentage)
};

export type NumberMaskOptions = {
    start?: number;     // Number of digits to show at start
    end?: number;      // Number of digits to show at end
    mask?: string;     // Character to use for masking (default: '*')
    preserveDecimals?: boolean; // Whether to mask decimal places
};

export type NumberStringOptions = {
    locale?: string;
    notation?: 'standard' | 'scientific' | 'engineering' | 'compact';
    fallback?: string;
};

export type StatisticsOptions = {
    ignoreInvalid?: boolean;
    precision?: number;
};
