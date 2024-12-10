# Setup Instructions

1. Clone the repo
2. Ensure Deno v2 is installed
3. Note down the absolute path to the `src/main.ts` file
4. Update the `claude_desktop_config.json` file, located in `~/Library/Application Support/Claude`

```
{
  "mcpServers": {
    "tapeless": {
      "command": "deno",
      "args": [
        "-A",
        "/Users/douglasreiser/Dev/Tapeless/Tapeless-MCP/src/main.ts"
      ]
    }
  }
}
```

5. Ensure the `tapeless-cli` is installed and at the latest version
6. Start Claude with developer mode enabled
