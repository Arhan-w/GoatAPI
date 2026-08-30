// Minimal GoatAPI CLI plugin example.
// Usage:
//   1. Copy this folder to ~/.goatapi/plugins/goatapi-cmd-hello/
//   2. Run `goatapi hello`
// See docs/dev/plugins.md for the full plugin contract.

export const meta = {
  name: "goatapi-cmd-hello",
  version: "0.1.0",
  description: "Hello-world GoatAPI CLI plugin example.",
  goatapiApi: ">=3.0.0",
};

export function register(program, ctx) {
  program
    .command("hello")
    .description(meta.description)
    .option("-n, --name <name>", "name to greet", "world")
    .action(async (opts, _cmd) => {
      ctx.emit({ message: `Hello, ${opts.name}!`, plugin: meta.name }, opts);
    });
}
