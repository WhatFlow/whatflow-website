/** Node module hook: treat .css imports as empty modules so render checks can load site components. */
export async function load(url, context, next) {
  if (url.endsWith('.css')) return { format: 'module', source: 'export default {};', shortCircuit: true };
  return next(url, context);
}
