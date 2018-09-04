import {
  generateCheckers,
  getRemaining,
  isRepeatedArray,
  mapToNumbers
} from './helpers';

/**
 * Check if value is a valid CPF.
 * @example ```js
 * CPF.validate('676.711.521-53')
 * //=> true
 * CPF.validate('472.239.983-76')
 * //=> false
 * ```
 * @param value - A string containing a CPF.
 */
export const validate = (
  value: string,
): boolean => {
  const numbers = mapToNumbers(value);
  if (numbers.length !== 11 || isRepeatedArray(numbers))
    return false;
  const validators = [ 11, 10, 9, 8, 7, 6, 5, 4, 3, 2 ];
  const checkers = generateCheckers(numbers, validators);
  return (
    numbers[12] === getRemaining(checkers[0], 11, 2) &&
    numbers[13] === getRemaining(checkers[1], 11, 2)
  );
};

/**
 * Formats step-by-step a `string` value into a CPF.
 * @example ```js
 * CPF.format('00000000000')
 * //=> '000.000.000-00'
 * CPF.format('12345678')
 * //=> '123.456.78'
 * CPF.format('Abacaxi')
 * //=> ''
 * ```
 * @param value - A `string` value of a CPF.
 */
export const format = (
  value: string,
): string => (
  value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
);