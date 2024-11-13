# React Number Utilities Documentation

A comprehensive collection of React hooks and components for number formatting, manipulation, and display.

## Table of Contents

- [Installation](#installation)
- [Hooks](#hooks)
  - [Formatting Hooks](#formatting-hooks)
  - [Mathematical Hooks](#mathematical-hooks)
  - [Statistical Hooks](#statistical-hooks)
  - [Utility Hooks](#utility-hooks)
- [Components](#components)
  - [Formatting Components](#formatting-components)
  - [Display Components](#display-components)
- [TypeScript Support](#typescript-support)
- [Examples](#examples)

## Installation

```bash
npm install @poly-kit/number-utils
# or
yarn add @poly-kit/number-utils
# or
pnpm add @poly-kit/number-utils
```

## Hooks

### Formatting Hooks

#### `useNumberFormat`
Formats numbers with thousand separators and decimal places.

```tsx
import { useNumberFormat } from '@poly-kit/number-utils/react';

function Example() {
  const formatted = useNumberFormat(1234.567, { 
    decimals: 2,
    thousandsSeparator: ',',
    decimalSeparator: '.'
  });
  // Result: "1,234.57"
}
```

#### `useCurrencyFormat`
Formats numbers as currency with locale support.

```tsx
import { useCurrencyFormat } from '@poly-kit/number-utils/react';

function Example() {
  const formatted = useCurrencyFormat(1234.56, {
    currency: 'EUR',
    locale: 'de-DE'
  });
  // Result: "1.234,56 €"
}
```

#### `usePercentageFormat`
Formats numbers as percentages.

```tsx
import { usePercentageFormat } from '@poly-kit/number-utils/react';

function Example() {
  const formatted = usePercentageFormat(0.1234, {
    decimals: 1,
    multiplier: true
  });
  // Result: "12.3%"
}
```

#### `useUnitFormat`
Formats numbers with unit prefixes.

```tsx
import { useUnitFormat } from '@poly-kit/number-utils/react';

function Example() {
  const bytes = useUnitFormat(1024 * 1024, { unit: 'bytes' });
  // Result: "1.00 MB"
  
  const metric = useUnitFormat(1000000, { unit: 'metric' });
  // Result: "1.00M"
}
```

#### `useOrdinalFormat`
Formats numbers as ordinals.

```tsx
import { useOrdinalFormat } from '@poly-kit/number-utils/react';

function Example() {
  const first = useOrdinalFormat(1);    // "1st"
  const second = useOrdinalFormat(2);   // "2nd"
  const third = useOrdinalFormat(3);    // "3rd"
}
```

#### `useExponentialFormat`
Converts numbers to exponential notation.

```tsx
import { useExponentialFormat } from '@poly-kit/number-utils/react';

function Example() {
  const exponential = useExponentialFormat(1234.567, 2);
  // Result: "1.23e+3"
}
```

#### `useNumberToWords`
Converts numbers to words.

```tsx
import { useNumberToWords } from '@poly-kit/number-utils/react';

function Example() {
  const words = useNumberToWords(42);
  // Result: "forty-two"
  
  const frenchWords = useNumberToWords(42, 'fr-FR');
  // Result: "quarante-deux"
}
```

### Mathematical Hooks

#### `useClamp`
Clamps a number between minimum and maximum values.

```tsx
import { useClamp } from '@poly-kit/number-utils/react';

function Example() {
  const clamped = useClamp(150, 0, 100); // Result: 100
  const valid = useClamp(50, 0, 100);    // Result: 50
}
```

#### `useRoundToPrecision`
Rounds numbers to specified precision.

```tsx
import { useRoundToPrecision } from '@poly-kit/number-utils/react';

function Example() {
  const rounded = useRoundToPrecision(3.14159, 2);         // 3.14
  const ceiling = useRoundToPrecision(3.14159, 2, 'ceil'); // 3.15
}
```

#### `useInterpolate`
Performs linear interpolation between numbers.

```tsx
import { useInterpolate } from '@poly-kit/number-utils/react';

function Example() {
  const half = useInterpolate(0, 100, 0.5);     // 50
  const quarter = useInterpolate(0, 100, 0.25);  // 25
}
```

#### `useNormalize`
Normalizes numbers to a specific range.

```tsx
import { useNormalize } from '@poly-kit/number-utils/react';

function Example() {
  const normalized = useNormalize(50, 0, 100);  // 0.5
  const scaled = useNormalize(75, 0, 100);      // 0.75
}
```

### Statistical Hooks

#### `useStatistics`
Calculates statistical values from an array of numbers.

```tsx
import { useStatistics } from '@poly-kit/number-utils/react';

function Example() {
  const numbers = [1, 2, 2, 3, 4, 5];
  const stats = useStatistics(numbers);
  
  // Result:
  // {
  //   total: 17,
  //   average: 2.83,
  //   median: 2.5,
  //   modes: [2]
  // }
}
```

### Utility Hooks

#### `useCompareNumbers`
Compares two numbers using various operators.

```tsx
import { useCompareNumbers } from '@poly-kit/number-utils/react';

function Example() {
  const isGreater = useCompareNumbers(5, 3, '>');   // true
  const isEqual = useCompareNumbers(5, 5, '=');     // true
  const isLess = useCompareNumbers(3, 5, '<');      // true
}
```

#### `useApproximatelyEqual`
Checks if two numbers are approximately equal.

```tsx
import { useApproximatelyEqual } from '@poly-kit/number-utils/react';

function Example() {
  const isEqual = useApproximatelyEqual(0.1 + 0.2, 0.3, {
    absolute: 0.0001
  });
  // Result: true
}
```

#### `useIsWithinRange`
Checks if a number is within a specified range.

```tsx
import { useIsWithinRange } from '@poly-kit/number-utils/react';

function Example() {
  const inRange = useIsWithinRange(5, {
    min: 0,
    max: 10,
    inclusive: true
  });
  // Result: true
}
```

## Components

### Formatting Components

#### `FormattedNumber`
Displays formatted numbers with separators.

```tsx
import { FormattedNumber } from '@poly-kit/number-utils/react';

function Example() {
  return (
    <FormattedNumber 
      value={1234.567}
      options={{ decimals: 2 }}
    />
    // Renders: "1,234.57"
  );
}
```

#### `FormattedCurrency`
Displays formatted currency values.

```tsx
import { FormattedCurrency } from '@poly-kit/number-utils/react';

function Example() {
  return (
    <FormattedCurrency
      value={1234.56}
      options={{
        currency: 'EUR',
        locale: 'de-DE'
      }}
    />
    // Renders: "1.234,56 €"
  );
}
```

#### `FormattedPercentage`
Displays formatted percentage values.

```tsx
import { FormattedPercentage } from '@poly-kit/number-utils/react';

function Example() {
  return (
    <FormattedPercentage
      value={0.1234}
      options={{ decimals: 1 }}
    />
    // Renders: "12.3%"
  );
}
```

#### `FormattedUnit`
Displays numbers with unit prefixes.

```tsx
import { FormattedUnit } from '@poly-kit/number-utils/react';

function Example() {
  return (
    <>
      <FormattedUnit
        value={1024 * 1024}
        options={{ unit: 'bytes' }}
      />
      {/* Renders: "1.00 MB" */}
      
      <FormattedUnit
        value={1000000}
        options={{ unit: 'metric' }}
      />
      {/* Renders: "1.00M" */}
    </>
  );
}
```

### Display Components

#### `NumberComparison`
Displays the result of number comparisons.

```tsx
import { NumberComparison } from '@poly-kit/number-utils/react';

function Example() {
  return (
    <NumberComparison
      a={5}
      b={3}
      operator=">"
      trueText="greater"
      falseText="not greater"
    />
    // Renders: "greater"
  );
}
```

#### `ApproximateEquality`
Displays whether numbers are approximately equal.

```tsx
import { ApproximateEquality } from '@poly-kit/number-utils/react';

function Example() {
  return (
    <ApproximateEquality
      a={0.1 + 0.2}
      b={0.3}
      precision={{ absolute: 0.0001 }}
      trueText="equal"
      falseText="not equal"
    />
    // Renders: "equal"
  );
}
```

#### `ParsedNumber`
Displays parsed numbers from strings.

```tsx
import { ParsedNumber } from '@poly-kit/number-utils/react';

function Example() {
  return (
    <ParsedNumber
      value="1,234.56"
      locale="en-US"
      fallback="Invalid number"
    />
    // Renders: "1234.56"
  );
}
```

## TypeScript Support

All components and hooks include full TypeScript support. Import types directly:

```tsx
import type {
  NumberFormatOptions,
  CurrencyFormatOptions,
  PercentageFormatOptions,
  NumberUnitOptions,
  NumberMaskOptions,
  NumberRangeOptions,
  StatisticsOptions,
  ComparisonOperator,
  RoundingMode,
  NumberPrecision
} from '@poly-kit/number-utils/react';
```

## Advanced Examples

### Creating a Statistics Dashboard

```tsx
import {
  useStatistics,
  FormattedNumber,
  FormattedPercentage
} from '@poly-kit/number-utils/react';

function StatsDashboard({ data }: { data: number[] }) {
  const stats = useStatistics(data);
  
  return (
    <div>
      <h2>Statistics Dashboard</h2>
      <dl>
        <dt>Total</dt>
        <dd>
          <FormattedNumber value={stats.total} options={{ decimals: 2 }} />
        </dd>
        
        <dt>Average</dt>
        <dd>
          <FormattedNumber value={stats.average} options={{ decimals: 2 }} />
        </dd>
        
        <dt>Median</dt>
        <dd>
          <FormattedNumber value={stats.median} options={{ decimals: 2 }} />
        </dd>
        
        <dt>Modes</dt>
        <dd>
          {stats.modes.map((mode, index) => (
            <FormattedNumber
              key={index}
              value={mode}
              options={{ decimals: 2 }}
            />
          ))}
        </dd>
      </dl>
    </div>
  );
}
```

### Creating a Number Input with Formatting

```tsx
import {
  useNumberFormat,
  useParseNumber,
  type NumberFormatOptions
} from '@poly-kit/number-utils/react';

function FormattedInput({
  value,
  onChange,
  options
}: {
  value: number;
  onChange: (value: number) => void;
  options?: NumberFormatOptions;
}) {
  const formatted = useNumberFormat(value, options);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parsed = useParseNumber(e.target.value);
    if (parsed !== null) {
      onChange(parsed);
    }
  };
  
  return (
    <input
      type="text"
      value={formatted}
      onChange={handleChange}
      aria-label="Formatted number input"
    />
  );
}
```

### Creating a Price Comparison Component

```tsx
import {
  FormattedCurrency,
  NumberComparison
} from '@poly-kit/number-utils/react';

function PriceComparison({
  price1,
  price2,
  currency = 'USD'
}: {
  price1: number;
  price2: number;
  currency?: string;
}) {
  return (
    <div>
      <FormattedCurrency
        value={price1}
        options={{ currency }}
      />
      {' vs '}
      <FormattedCurrency
        value={price2}
        options={{ currency }}
      />
      {': '}
      <NumberComparison
        a={price1}
        b={price2}
        operator="<"
        trueText="cheaper"
        falseText="more expensive"
      />
    </div>
  );
}
```

This documentation covers all hooks and components in the library, with practical examples for each. For additional information or specific use cases, please refer to the API documentation or raise an issue on our GitHub repository.