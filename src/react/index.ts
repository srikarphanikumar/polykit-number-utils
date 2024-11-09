// src/react/index.ts
import { useMemo } from 'react';
import { formatNumber, formatCurrency, formatPercentage } from '../core';

export const useNumberFormat = (value: number, decimals?: number) => {
    return useMemo(() => formatNumber(value, { decimals }), [value, decimals]);
};

export const useCurrencyFormat = (
    value: number,
    currency?: string,
    locale?: string
) => {
    return useMemo(
        () => formatCurrency(value, { currency, locale }),
        [value, currency, locale]
    );
};

export const usePercentageFormat = (value: number, decimals?: number) => {
    return useMemo(() => formatPercentage(value, decimals), [value, decimals]);
};