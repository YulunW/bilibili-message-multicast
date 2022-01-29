export function upsertKeyValue(
  headers: Record<string, string | string[]>,
  keyInUpper: string,
  value: string | string[]
) {
  const keyInLower = keyInUpper.toLowerCase();
  if (headers[keyInLower] !== undefined) {
    delete headers[keyInLower];
  }
  // Insert at end instead
  headers[keyInUpper] = value;
}

export function deleteKey(
  headers: Record<string, string | string[]>,
  keyInUpper: string
) {
  const keyInLower = keyInUpper.toLowerCase();
  if (headers[keyInLower] !== undefined) {
    delete headers[keyInLower];
  }
  // Insert at end instead
  if (headers[keyInUpper] !== undefined) {
    delete headers[keyInUpper];
  }
}
