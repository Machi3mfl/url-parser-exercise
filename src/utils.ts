/**
 * Check if string is a positive integer
 * @param value
 * @returns boolean
 */
function isPositiveInteger(value: string) {
  const num = Number(value);
  return Number.isInteger(num) && Math.sign(num) === 1;
}

/**
 * Check if string is a positive float
 * @param value
 * @returns
 */
function isPositiveFloat(value: any) {
  return !isNaN(value) && Number(value) > 0;
}

export { isPositiveFloat, isPositiveInteger }