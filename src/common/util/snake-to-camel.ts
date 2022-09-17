export function snakeToCamel(str: string) {
  return str.replace(/_[a-z]/g, letter => letter.charAt(1).toLocaleUpperCase());
}
export function objectKeysSnakeToCamel(obj: Object) {
  return Object.fromEntries(
    Object.entries(obj).map(([k, v]) => [snakeToCamel(k), v])
  );
}