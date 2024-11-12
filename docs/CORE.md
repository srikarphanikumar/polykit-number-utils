# Core Number Utilities

Comprehensive documentation for the core number utilities package.

## Table of Contents

- [Formatting Functions](#formatting-functions)
- [Math Operations](#math-operations)
- [Statistical Functions](#statistical-functions)
- [Utility Functions](#utility-functions)
- [Comparison Functions](#comparison-functions)
- [Conversion Functions](#conversion-functions)

## Formatting Functions

### formatNumber

Formats a number with thousand separators and decimal places.

```typescript
import { formatNumber } from '@poly-kit/number-utils';

// Basic usage
formatNumber(1234567.89);
// "1,234,567.89"

// Custom separators
formatNumber(1234567.89, {
  thousandsSeparator: '.',
  decimalSeparator: ','
});
// "1.234.567,89"

// Custom decimals
formatNumber(1234.5678, { decimals: 3 });
// "1,234.568"

// With fallback
formatNumber(NaN, { fallback: 'Invalid' });
// "Invalid"
```

### formatCurrency

Formats a number as currency with locale support.

```typescript
import { formatCurrency } from '@poly-kit/number-utils';

// Basic usage (USD)
formatCurrency(1234.56);
// "$1,234.56"

// Different currency and locale
formatCurrency(1234.56, {
  currency: 'EUR',
  locale: 'de-DE'
});
// "1.234,56 €"

// Custom fraction digits
formatCurrency(1234.56, {
  minimumFractionDigits: 0,
  maximumFractionDigits: 0
});
// "$1,235"

// Without grouping
formatCurrency(1234567.89, { useGrouping: false });
// "$1234567.89"
```

### formatPercentage

Formats a number as a percentage.

```typescript
import { formatPercentage } from '@poly-kit/number-utils';

// Basic usage
formatPercentage(0.1234);
// "12.34%"

// Without multiplier
formatPercentage(12.34, { multiplier: false });
// "12.34%"

// Custom decimals
formatPercentage(0.12345, { decimals: 3 });
// "12.345%"

// With fallback
formatPercentage(NaN, { fallback: 'N/A' });
// "N/A"
```

### formatWithUnit

Formats a number with unit prefixes (bytes, metric, or compact notation).

```typescript
import { formatWithUnit } from '@poly-kit/number-utils';

// Bytes format
formatWithUnit(1024 * 1024, { unit: 'bytes' });
// "1.00 MB"

// Metric format
formatWithUnit(1000000, { unit: 'metric' });
// "1.00M"

// Short format
formatWithUnit(1234567, { unit: 'short', locale: 'en-US' });
// "1.23M"

// Custom decimals
formatWithUnit(1234567890, { unit: 'metric', decimals: 1 });
// "1.2B"
```

### formatOrdinal

Formats a number as an ordinal string.

```typescript
import { formatOrdinal } from '@poly-kit/number-utils';

// Basic usage
formatOrdinal(1);    // "1st"
formatOrdinal(2);    // "2nd"
formatOrdinal(3);    // "3rd"
formatOrdinal(4);    // "4th"
formatOrdinal(11);   // "11th"
formatOrdinal(21);   // "21st"

// With locale
formatOrdinal(1, 'fr-FR');  // "1er"
formatOrdinal(2, 'fr-FR');  // "2e"
```

## Math Operations

### clamp

Restricts a number to a specified range.

```typescript
import { clamp } from '@poly-kit/number-utils';

// Basic usage
clamp(5, 0, 10);     // 5
clamp(-5, 0, 10);    // 0
clamp(15, 0, 10);    // 10

// With decimals
clamp(3.14, 2.5, 3.5);  // 3.14
```

### roundToPrecision

Rounds a number to a specified precision using different rounding modes.

```typescript
import { roundToPrecision } from '@poly-kit/number-utils';

// Basic usage
roundToPrecision(3.14159, 2);              // 3.14
roundToPrecision(3.14159, 2, 'ceil');      // 3.15
roundToPrecision(3.14159, 2, 'floor');     // 3.14
roundToPrecision(3.14159, 2, 'trunc');     // 3.14

// Different precisions
roundToPrecision(123.456, 1);              // 123.5
roundToPrecision(123.456, 0);              // 123
```

### normalize

Normalizes a number to a specific range (typically 0 to 1).

```typescript
import { normalize } from '@poly-kit/number-utils';

// Basic usage
normalize(50, 0, 100);     // 0.5
normalize(75, 0, 100);     // 0.75
normalize(-5, -10, 10);    // 0.25

// Custom ranges
normalize(500, 0, 1000);   // 0.5
```

### interpolate

Interpolates between two numbers.

```typescript
import { interpolate } from '@poly-kit/number-utils';

// Basic usage
interpolate(0, 100, 0.5);    // 50
interpolate(0, 10, 0.1);     // 1
interpolate(50, 100, 0.25);  // 62.5

// Animation example
interpolate(0, 360, 0.5);    // 180 (useful for rotations)
```

## Statistical Functions

### sum

Calculates the sum of an array of numbers.

```typescript
import { sum } from '@poly-kit/number-utils';

// Basic usage
sum([1, 2, 3, 4, 5]);                  // 15
sum([1.1, 2.2, 3.3]);                  // 6.6

// Ignore invalid numbers
sum([1, 2, NaN, 4], true);             // 7
sum([1, 2, undefined, 4], true);       // 7

// Error handling
sum([1, 2, NaN, 4]);                   // Throws NumberFormatError
```

### average

Calculates the arithmetic mean of an array of numbers.

```typescript
import { average } from '@poly-kit/number-utils';

// Basic usage
average([1, 2, 3, 4, 5]);              // 3
average([1.5, 2.5, 3.5]);              // 2.5

// Ignore invalid numbers
average([1, 2, NaN, 4], true);         // 2.33
average([1, 2, null, 4], true);        // 2.33

// Empty array
average([]);                           // 0
```

### median

Calculates the median value of an array of numbers.

```typescript
import { median } from '@poly-kit/number-utils';

// Basic usage
median([1, 2, 3, 4, 5]);              // 3
median([1, 3, 3, 6, 7, 8, 9]);        // 6

// Even number of values
median([1, 2, 3, 4]);                 // 2.5

// With precision
median([1.1, 2.2, 3.3], { precision: 1 }); // 2.2
```

### mode

Finds the most frequent value(s) in an array of numbers.

```typescript
import { mode } from '@poly-kit/number-utils';

// Single mode
mode([1, 2, 2, 3]);                   // [2]

// Multiple modes
mode([1, 1, 2, 2, 3]);               // [1, 2]

// With precision
mode([1.11, 1.12, 1.11], { precision: 1 }); // [1.1]
```

## Utility Functions

### parseNumber

Parses a string to number, handling various formats and locales.

```typescript
import { parseNumber } from '@poly-kit/number-utils';

// Basic usage
parseNumber('1234.56');               // 1234.56
parseNumber('1,234.56');              // 1234.56

// Different locales
parseNumber('1.234,56', 'de-DE');     // 1234.56
parseNumber('1 234,56', 'fr-FR');     // 1234.56

// Invalid inputs
parseNumber('abc');                   // null
parseNumber('');                      // null
```

### maskNumber

Masks a number, useful for sensitive data display.

```typescript
import { maskNumber } from '@poly-kit/number-utils';

// Basic usage
maskNumber(1234567);                  // "*****67"
maskNumber(1234.56);                  // "****.**"

// Custom options
maskNumber(1234567, { start: 2, end: 2 });  // "12***67"
maskNumber(1234.56, { mask: '#' });         // "####.##"
maskNumber(1234.56, { preserveDecimals: true }); // "****.56"
```

### compareNumbers

Compares two numbers using various operators.

```typescript
import { compareNumbers } from '@poly-kit/number-utils';

// Basic comparisons
compareNumbers(5, 3, '>');            // true
compareNumbers(5, 5, '=');            // true
compareNumbers(3, 5, '<=');           // true

// Equal/Not Equal
compareNumbers(5, 5, '=');            // true
compareNumbers(5, 3, '!=');           // true
```

### padNumber

Ensures a number has a minimum number of integer and decimal places.

```typescript
import { padNumber } from '@poly-kit/number-utils';

// Basic padding
padNumber(5, 2);                      // "05"
padNumber(5.2, 2, 2);                 // "05.20"

// Negative numbers
padNumber(-5, 3);                     // "-005"
padNumber(-5.2, 3, 2);               // "-005.20"
```

## Conversion Functions

### toExponential

Converts a number to exponential notation.

```typescript
import { toExponential } from '@poly-kit/number-utils';

// Basic usage
toExponential(1234.567);              // "1.23e+3"
toExponential(0.0001234);             // "1.23e-4"

// Custom precision
toExponential(1234.567, 4);           // "1.2346e+3"
```

### toSignificantDigits

Returns numbers with significant digits only.

```typescript
import { toSignificantDigits } from '@poly-kit/number-utils';

// Basic usage
toSignificantDigits(1234.567, 3);     // 1230
toSignificantDigits(0.0001234, 3);    // 0.000123

// Different precisions
toSignificantDigits(1234.567, 4);     // 1235
toSignificantDigits(1234.567, 2);     // 1200
```

### toWords

Converts numbers to words.

```typescript
import { toWords } from '@poly-kit/number-utils';

// Basic usage
toWords(42);                          // "forty-two"
toWords(1234);                        // "one thousand two hundred thirty-four"

// Different locales
toWords(42, 'fr-FR');                // "quarante-deux"
toWords(42, 'es-ES');                // "cuarenta y dos"
```

### getOrderOfMagnitude

Gets the order of magnitude of a number.

```typescript
import { getOrderOfMagnitude } from '@poly-kit/number-utils';

// Basic usage
getOrderOfMagnitude(1234);            // 3
getOrderOfMagnitude(0.001234);        // -3
getOrderOfMagnitude(1000000);         // 6
```

## Error Handling

All functions throw `NumberFormatError` for invalid inputs. You can handle errors like this:

```typescript
import { formatNumber, NumberFormatError } from '@poly-kit/number-utils';

try {
  const result = formatNumber(invalidNumber);
} catch (error) {
  if (error instanceof NumberFormatError) {
    console.error('Invalid number format:', error.message);
  } else {
    throw error;
  }
}
```

## TypeScript Support

All functions include full TypeScript type definitions. You can import types directly:

```typescript
import type {
  NumberFormatOptions,
  CurrencyFormatOptions,
  NumberRangeOptions
} from '@poly-kit/number-utils';
```