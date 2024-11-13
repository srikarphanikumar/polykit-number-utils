// Export the module
export { PolyNumberModule } from './number-utils.module';

// Export the service
export { PolyNumberUtilService } from './number-utils.service';

// Export all pipes
export {
    PolyFormatNumberPipe,
    PolyFormatCurrencyPipe,
    PolyFormatPercentagePipe,
    PolyFormatWithUnitPipe,
    PolyFormatOrdinalPipe,
    PolyToExponentialPipe,
    PolyToWordsPipe,
    PolyMaskNumberPipe,
    PolyPadNumberPipe,
    PolyToSignificantDigitsPipe,
    POLY_NUMBER_PIPES
} from './pipes';

// Re-export types from core that might be needed by consumers
export type {
    NumberFormatOptions,
    CurrencyFormatOptions,
    PercentageFormatOptions,
    NumberUnitOptions,
    NumberMaskOptions,
    NumberRangeOptions,
    NumberPrecision,
    StatisticsOptions,
    ComparisonOperator,
    RoundingMode
} from '../core';

// Re-export NumberFormatError for error handling
export { NumberFormatError } from '../core';