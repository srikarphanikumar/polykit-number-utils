import { TestBed } from '@angular/core/testing';
import {
    PolyNumberUtilService,
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
} from './index';

describe('Angular Number Utils', () => {
    // Service Tests
    describe('PolyNumberUtilService', () => {
        let service: PolyNumberUtilService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                providers: [PolyNumberUtilService]
            });
            service = TestBed.inject(PolyNumberUtilService);
        });

        it('should be created', () => {
            expect(service).toBeTruthy();
        });

        describe('clamp', () => {
            it('should clamp numbers within range', () => {
                expect(service.clamp(5, 0, 10)).toBe(5);
                expect(service.clamp(-5, 0, 10)).toBe(0);
                expect(service.clamp(15, 0, 10)).toBe(10);
            });

            it('should throw error for invalid inputs', () => {
                expect(() => service.clamp(NaN, 0, 10)).toThrow();
            });
        });

        describe('statistical functions', () => {
            const numbers = [1, 2, 3, 4, 5];

            it('should calculate sum correctly', () => {
                expect(service.sum(numbers)).toBe(15);
            });

            it('should calculate average correctly', () => {
                expect(service.average(numbers)).toBe(3);
            });

            it('should calculate median correctly', () => {
                expect(service.median(numbers)).toBe(3);
            });

            it('should find mode correctly', () => {
                expect(service.mode([1, 2, 2, 3])).toEqual([2]);
            });
        });

        describe('comparison functions', () => {
            it('should compare numbers correctly', () => {
                expect(service.compareNumbers(5, 3, '>')).toBe(true);
                expect(service.compareNumbers(3, 5, '>')).toBe(false);
            });

            it('should check approximate equality', () => {
                expect(service.isApproximatelyEqual(0.1 + 0.2, 0.3, { absolute: 0.000001 })).toBe(true);
            });
        });

        describe('mathematical functions', () => {
            it('should interpolate correctly', () => {
                expect(service.interpolate(0, 100, 0.5)).toBe(50);
            });

            it('should normalize correctly', () => {
                expect(service.normalize(50, 0, 100)).toBe(0.5);
            });

            it('should get order of magnitude', () => {
                expect(service.getOrderOfMagnitude(1000)).toBe(3);
            });
        });

        describe('parseNumber', () => {
            it('should parse valid numbers', () => {
                expect(service.parseNumber('123.45')).toBe(123.45);
                expect(service.parseNumber('1,234.56', 'en-US')).toBe(1234.56);
            });

            it('should return null for invalid numbers', () => {
                expect(service.parseNumber('abc')).toBeNull();
                expect(service.parseNumber('')).toBeNull();
            });
        });
    });

    // Pipe Tests
    describe('Number Formatting Pipes', () => {
        // Format Number Pipe
        describe('PolyFormatNumberPipe', () => {
            let pipe: PolyFormatNumberPipe;

            beforeEach(() => {
                pipe = new PolyFormatNumberPipe();
            });

            it('should format numbers correctly', () => {
                expect(pipe.transform(1234.567)).toBe('1,234.57');
                expect(pipe.transform(1234.567, { decimals: 3 })).toBe('1,234.567');
            });

            it('should handle null/undefined', () => {
                expect(pipe.transform(null)).toBe('');
                expect(pipe.transform(undefined)).toBe('');
            });

            it('should use fallback for invalid numbers', () => {
                expect(pipe.transform(NaN, { fallback: 'Invalid' })).toBe('Invalid');
            });
        });

        // Currency Pipe
        describe('PolyFormatCurrencyPipe', () => {
            let pipe: PolyFormatCurrencyPipe;

            beforeEach(() => {
                pipe = new PolyFormatCurrencyPipe();
            });

            it('should format currency correctly', () => {
                expect(pipe.transform(1234.56)).toMatch(/\$1,234\.56/);
                expect(pipe.transform(1234.56, { currency: 'EUR', locale: 'de-DE' }))
                    .toMatch(/1\.234,56\s*€/);
            });

            it('should handle null/undefined', () => {
                expect(pipe.transform(null)).toBe('');
                expect(pipe.transform(undefined)).toBe('');
            });
        });

        // Percentage Pipe
        describe('PolyFormatPercentagePipe', () => {
            let pipe: PolyFormatPercentagePipe;

            beforeEach(() => {
                pipe = new PolyFormatPercentagePipe();
            });

            it('should format percentages correctly', () => {
                expect(pipe.transform(0.1234)).toBe('12.34%');
                expect(pipe.transform(0.1234, { decimals: 1 })).toBe('12.3%');
            });

            it('should handle null/undefined', () => {
                expect(pipe.transform(null)).toBe('');
                expect(pipe.transform(undefined)).toBe('');
            });
        });

        // Unit Format Pipe
        describe('PolyFormatWithUnitPipe', () => {
            let pipe: PolyFormatWithUnitPipe;

            beforeEach(() => {
                pipe = new PolyFormatWithUnitPipe();
            });

            it('should format with bytes unit', () => {
                expect(pipe.transform(1024, { unit: 'bytes' })).toMatch(/1\.00\s*KB/);
            });

            it('should format with metric unit', () => {
                expect(pipe.transform(1000000, { unit: 'metric' })).toMatch(/1\.00\s*M/);
            });
        });

        // Other Formatting Pipes
        describe('Other Formatting Pipes', () => {
            it('should format ordinal numbers', () => {
                const pipe = new PolyFormatOrdinalPipe();
                expect(pipe.transform(1)).toBe('1st');
                expect(pipe.transform(2)).toBe('2nd');
                expect(pipe.transform(3)).toBe('3rd');
                expect(pipe.transform(4)).toBe('4th');
            });

            it('should convert to exponential notation', () => {
                const pipe = new PolyToExponentialPipe();
                expect(pipe.transform(1234.567, 2)).toBe('1.23e+3');
            });

            it('should convert numbers to words', () => {
                const pipe = new PolyToWordsPipe();
                expect(pipe.transform(42)).toMatch(/forty.*two/i);
            });

            it('should mask numbers correctly', () => {
                const pipe = new PolyMaskNumberPipe();
                expect(pipe.transform(1234567)).toMatch(/\*{5}67/);
            });

            it('should pad numbers correctly', () => {
                const pipe = new PolyPadNumberPipe();
                expect(pipe.transform(5, 2)).toBe('05');
                expect(pipe.transform(5.2, 2, 2)).toBe('05.20');
            });

            it('should handle significant digits', () => {
                const pipe = new PolyToSignificantDigitsPipe();
                expect(pipe.transform(1234.567, 3)).toBe(1230);
            });
        });
    });
});
