// src/angular/index.ts
import { Pipe, PipeTransform } from '@angular/core';
import { formatNumber, formatCurrency, formatPercentage } from '../core';

@Pipe({ name: 'polyNumber' })
export class PolyNumberPipe implements PipeTransform {
    transform(value: number, decimals?: number): string {
        return formatNumber(value, { decimals });
    }
}

@Pipe({ name: 'polyCurrency' })
export class PolyCurrencyPipe implements PipeTransform {
    transform(
        value: number,
        currency?: string,
        locale?: string
    ): string {
        return formatCurrency(value, { currency, locale });
    }
}

@Pipe({ name: 'polyPercentage' })
export class PolyPercentagePipe implements PipeTransform {
    transform(value: number, decimals?: number): string {
        return formatPercentage(value, decimals);
    }
}

export const POLY_NUMBER_PIPES = [
    PolyNumberPipe,
    PolyCurrencyPipe,
    PolyPercentagePipe,
];