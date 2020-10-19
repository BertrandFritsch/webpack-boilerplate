export const noop = () => undefined;

export function ANNU<T>(value: T | null | undefined): asserts value is T {
  if (value === null || value === undefined) {
    const message = 'Assertion error! Expected not null or undefined!';

    console.error(message);
    throw new Error(message);
  }
}

export function NNU<T>(value: T | null | undefined): T {
  ANNU(value);
  return value;
}

export function formatLocaleNumber(value: number, maximumFractionDigits = 20, locale = 'en-US') {
  return value.toLocaleString(locale, { maximumFractionDigits });
}
