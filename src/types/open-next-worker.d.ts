// OpenNext creates this ignored module during a build. Keep the custom entry
// point type-checkable before generation as well as after it.
declare module '*.open-next/worker.js' {
  const handler: {
    fetch(request: Request, env: CloudflareEnv, context: ExecutionContext): Promise<Response>;
  };
  export default handler;
}
