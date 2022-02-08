export function deepFreeze(object: Record<string, any>) {
  // Retrieve the property names defined on object
  const propNames = Object.getOwnPropertyNames(object);

  // Freeze properties before freezing self

  // This function would only be used during initialization for a very small
  // amount of objects. Allowing for of loop here won't result in significant
  // performance penalty.
  // eslint-disable-next-line no-restricted-syntax
  for (const name of propNames) {
    const value = object[name];

    if (value && typeof value === 'object') {
      deepFreeze(value);
    }
  }

  return Object.freeze(object);
}

export function getParamsToObj(url: string): Record<string, string> {
  const urlParams = new URLSearchParams(url.substring(url.indexOf('?') + 1));
  const params: Record<string, string> = {};
  urlParams.forEach((value, key) => {
    params[key] = value;
  });
  return params;
}
