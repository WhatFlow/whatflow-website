/** JSON production logs retain warnings/errors without pretty-printing stacks. */
export function payloadLoggerConfig(production: boolean, cli: boolean) {
  if (!production || cli) return undefined;
  return {options: {level: 'warn', base: null}};
}
