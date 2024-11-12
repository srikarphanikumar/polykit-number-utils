# @poly-kit/number-utils

A comprehensive number utilities package for JavaScript, TypeScript, React, and Angular applications.

## 📦 Installation

```bash
npm install @poly-kit/number-utils
# or
yarn add @poly-kit/number-utils
# or
pnpm add @poly-kit/number-utils
```

## 🔨 Usage

The package provides utilities for:
- Core number formatting and manipulation
- React number components and hooks
- Angular number services and components

### Core Package
```typescript
import { formatNumber, formatCurrency } from '@poly-kit/number-utils';

// Format a number with thousand separators
const formatted = formatNumber(1234567.89); // "1,234,567.89"

// Format as currency
const currency = formatCurrency(1234.56); // "$1,234.56"
```

### React Components
```typescript
import { NumberInput } from '@poly-kit/number-utils/react';

function App() {
  return (
    <NumberInput
      value={1234.56}
      onChange={value => console.log(value)}
      format="currency"
    />
  );
}
```

### Angular Components
```typescript
import { NumberInputModule } from '@poly-kit/number-utils/angular';

@NgModule({
  imports: [NumberInputModule],
  // ...
})
export class AppModule {}
```

## 📚 Documentation

- [Core Utilities Documentation](./docs/CORE.md)
- [React Components Documentation](./docs/REACT.md)
- [Angular Components Documentation](./docs/ANGULAR.md)

## 🌟 Features

- 📊 Comprehensive number formatting
- 💱 Currency formatting with locale support
- 📈 Statistical operations
- 🔢 Number parsing and validation
- ⚛️ React components
- 🅰️ Angular components
- 🌍 Internationalization support
- 💪 TypeScript support
- 🧪 Thoroughly tested

## 📖 API Overview

### Core Functions

#### Formatting Functions
- `formatNumber()` - Format numbers with separators
- `formatCurrency()` - Format as currency
- `formatPercentage()` - Format as percentage
- `formatWithUnit()` - Format with unit prefixes
- `formatOrdinal()` - Format as ordinal numbers

#### Math Operations
- `clamp()` - Restrict number to range
- `roundToPrecision()` - Round with precision
- `interpolate()` - Linear interpolation
- `normalize()` - Normalize to range

#### Statistical Functions
- `average()` - Calculate average
- `median()` - Calculate median
- `mode()` - Calculate mode
- `sum()` - Calculate sum

#### Utility Functions
- `parseNumber()` - Parse string to number
- `random()` - Generate random numbers
- `maskNumber()` - Mask sensitive numbers
- `compareNumbers()` - Compare numbers
- And more...

See detailed documentation for each package:
- [Core Utilities](./docs/CORE.md)
- [React Components](./docs/REACT.md)
- [Angular Components](./docs/ANGULAR.md)

## 📝 License

MIT © [Your Name]