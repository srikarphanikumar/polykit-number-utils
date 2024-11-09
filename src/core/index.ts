// src/core/index.ts

// Basic number formatting
export const formatNumber = (
    value: number,
    options: {
        decimals?: number;
        thousandsSeparator?: string;
        decimalSeparator?: string;
    } = {}
): string => {
    const {
        decimals = 2,
        thousandsSeparator = ',',
        decimalSeparator = '.'
    } = options;

    try {
        const parts = value.toFixed(decimals).split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator);
        return parts.join(decimalSeparator);
    } catch (error) {
        return '0';
    }
};

// Currency formatting
export const formatCurrency = (
    value: number,
    options: {
        currency?: string;
        locale?: string;
    } = {}
): string => {
    const { currency = 'USD', locale = 'en-US' } = options;

    try {
        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency,
        }).format(value);
    } catch (error) {
        return `${currency} 0.00`;
    }
};

// Percentage formatting
export const formatPercentage = (
    value: number,
    decimals: number = 2
): string => {
    try {
        return `${(value * 100).toFixed(decimals)}%`;
    } catch (error) {
        return '0%';
    }
};