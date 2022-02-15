export const isNumber = (value: unknown): value is number =>
  typeof value === 'number';
export const isString = (value: unknown): value is string =>
  typeof value === 'string';
export const isUnion =
  (unionChecks: ((value: unknown) => boolean)[]) =>
  (value: unknown): boolean =>
    unionChecks.reduce((s: boolean, isT) => s || isT(value), false);
export const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

export function hasOwnProperty<
  X extends Record<string, unknown>,
  Y extends PropertyKey
>(obj: X, prop: Y): obj is X & Record<Y, unknown> {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}
