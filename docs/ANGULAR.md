# @poly-kit/number-utils/angular

Angular utilities for number formatting, manipulation, and analysis.

## 📦 Installation

```bash
npm install @poly-kit/number-utils
# or
yarn add @poly-kit/number-utils
# or
pnpm add @poly-kit/number-utils
```

## 🚀 Setup

Import the `PolyNumberModule` in your Angular module:

```typescript
import { PolyNumberModule } from '@poly-kit/number-utils/angular';

@NgModule({
  imports: [
    PolyNumberModule
    // ...
  ]
})
export class AppModule { }
```

## 📝 Features

### Pipes

All pipes are pure and optimized for performance.

#### PolyFormatNumberPipe
Formats numbers with thousand separators and decimal places.

```html
<!-- Basic usage -->
{{ 1234567.89 | polyFormatNumber }}
<!-- Output: "1,234,567.89" -->

<!-- Custom options -->
{{ 1234567.89 | polyFormatNumber:{ 
  decimals: 3,
  thousandsSeparator: '.',
  decimalSeparator: ','
} }}
<!-- Output: "1.234.567,890" -->

<!-- With fallback -->
{{ invalidNumber | polyFormatNumber:{ fallback: 'N/A' } }}
<!-- Output: "N/A" -->
```

#### PolyFormatCurrencyPipe
Formats numbers as currency with locale support.

```html
<!-- Basic usage (USD) -->
{{ 1234.56 | polyFormatCurrency }}
<!-- Output: "$1,234.56" -->

<!-- Custom currency and locale -->
{{ 1234.56 | polyFormatCurrency:{
  currency: 'EUR',
  locale: 'de-DE'
} }}
<!-- Output: "1.234,56 €" -->

<!-- Custom fraction digits -->
{{ 1234.56 | polyFormatCurrency:{
  minimumFractionDigits: 0,
  maximumFractionDigits: 0
} }}
<!-- Output: "$1,235" -->
```

#### PolyFormatPercentagePipe
Formats numbers as percentages.

```html
<!-- Basic usage -->
{{ 0.1234 | polyFormatPercentage }}
<!-- Output: "12.34%" -->

<!-- Custom decimals -->
{{ 0.1234 | polyFormatPercentage:{ decimals: 1 } }}
<!-- Output: "12.3%" -->

<!-- Without multiplier -->
{{ 12.34 | polyFormatPercentage:{ multiplier: false } }}
<!-- Output: "12.34%" -->
```

#### PolyFormatWithUnitPipe
Formats numbers with unit prefixes (bytes, metric, or compact notation).

```html
<!-- Bytes format -->
{{ 1024 | polyFormatWithUnit:{ unit: 'bytes' } }}
<!-- Output: "1.00 KB" -->

<!-- Metric format -->
{{ 1000000 | polyFormatWithUnit:{ unit: 'metric' } }}
<!-- Output: "1.00M" -->

<!-- Short format -->
{{ 1234567 | polyFormatWithUnit:{ unit: 'short' } }}
<!-- Output: "1.23M" -->
```

#### PolyFormatOrdinalPipe
Formats numbers as ordinals.

```html
<!-- Basic usage -->
{{ 1 | polyFormatOrdinal }}  <!-- "1st" -->
{{ 2 | polyFormatOrdinal }}  <!-- "2nd" -->
{{ 3 | polyFormatOrdinal }}  <!-- "3rd" -->
{{ 4 | polyFormatOrdinal }}  <!-- "4th" -->

<!-- With locale -->
{{ 1 | polyFormatOrdinal:'fr-FR' }}  <!-- "1er" -->
```

#### Additional Formatting Pipes

```html
<!-- Exponential notation -->
{{ 1234.567 | polyToExponential }}  <!-- "1.23e+3" -->
{{ 1234.567 | polyToExponential:4 }}  <!-- "1.2346e+3" -->

<!-- Numbers to words -->
{{ 42 | polyToWords }}  <!-- "forty-two" -->
{{ 42 | polyToWords:'fr-FR' }}  <!-- "quarante-deux" -->

<!-- Mask sensitive numbers -->
{{ 1234567 | polyMaskNumber }}  <!-- "*****67" -->
{{ 1234.56 | polyMaskNumber:{ preserveDecimals: true } }}  <!-- "****.56" -->

<!-- Pad numbers -->
{{ 5 | polyPadNumber:2 }}  <!-- "05" -->
{{ 5.2 | polyPadNumber:2:2 }}  <!-- "05.20" -->

<!-- Significant digits -->
{{ 1234.567 | polyToSignificantDigits:3 }}  <!-- "1230" -->
```

### Service Methods

The `PolyNumberUtilService` provides utility functions for number manipulation and analysis.

```typescript
import { PolyNumberUtilService } from '@poly-kit/number-utils/angular';

@Component({
  // ...
})
export class MyComponent {
  constructor(private numberUtils: PolyNumberUtilService) {}

  example() {
    // Clamp numbers
    this.numberUtils.clamp(5, 0, 10);  // 5
    this.numberUtils.clamp(-5, 0, 10); // 0

    // Round with precision
    this.numberUtils.roundToPrecision(3.14159, 2);              // 3.14
    this.numberUtils.roundToPrecision(3.14159, 2, 'ceil');      // 3.15

    // Statistical functions
    const numbers = [1, 2, 3, 4, 5];
    this.numberUtils.sum(numbers);              // 15
    this.numberUtils.average(numbers);          // 3
    this.numberUtils.median(numbers);           // 3
    this.numberUtils.mode([1, 2, 2, 3]);       // [2]

    // Range checks
    this.numberUtils.isWithinRange(5, { min: 0, max: 10 });  // true
    this.numberUtils.normalize(50, 0, 100);                   // 0.5

    // Comparisons
    this.numberUtils.compareNumbers(5, 3, '>');              // true
    this.numberUtils.isApproximatelyEqual(0.1 + 0.2, 0.3);  // true

    // String parsing
    this.numberUtils.parseNumber('1,234.56', 'en-US');      // 1234.56
  }
}
```

## 🔧 Types

The package includes TypeScript definitions for all options:

```typescript
interface NumberFormatOptions {
  decimals?: number;
  thousandsSeparator?: string;
  decimalSeparator?: string;
  fallback?: string;
}

interface CurrencyFormatOptions {
  currency?: string;
  locale?: string;
  fallback?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  useGrouping?: boolean;
}

// ... and more
```

## ⚠️ Error Handling

The service methods throw `NumberFormatError` for invalid inputs. Use try-catch blocks for error handling:

```typescript
try {
  const result = this.numberUtils.clamp(invalidNumber, 0, 10);
} catch (error) {
  if (error instanceof NumberFormatError) {
    console.error('Invalid number:', error.message);
  }
}
```

Pipes handle errors gracefully by returning fallback values or empty strings.

## 📚 Best Practices

1. Use pipes for template formatting
2. Use service methods for complex calculations
3. Set appropriate fallback values for handling invalid inputs
4. Consider locale support when formatting numbers
5. Use TypeScript types for better IDE support
