export function registerProvider(program) {
  program
    .command("provider [subcommand]")
    .description("Manage provider connections (use 'providers' for the full interface)")
    .allowUnknownOption()
    .allowExcessArguments()
    .action(() => {
      console.log(`
  Use \`goatapi providers\` for the full provider management interface:

    goatapi providers available   — show provider catalog
    goatapi providers list        — list configured connections
    goatapi providers test <name> — test a provider connection
    goatapi providers test-all    — test all active connections
    goatapi providers validate    — validate local configuration
    goatapi providers add <id>    — add an API-key connection
    goatapi providers auth <id>   — start an existing OAuth flow
    goatapi providers remove <id> — remove a connection (requires confirmation)
`);
    });
}
