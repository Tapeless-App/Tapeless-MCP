import { Server } from "npm:@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "npm:@modelcontextprotocol/sdk/server/stdio.js";
import { activateTools } from "./mcp-utils/tools.ts";
import { authTools } from "./auth/auth.tools.ts";
import { projectsTools } from "./projects/projects.tools.ts";
import { reposTools } from "./repos/repos.tools.ts";
import { timeTools } from "./time/time.tools.ts";

const server = new Server(
  {
    name: "tapeless",
    version: "0.0.1",
  },
  {
    capabilities: {
      resources: {},
      tools: {},
    },
  }
);

activateTools(server, [
  ...authTools,
  ...projectsTools,
  ...reposTools,
  ...timeTools,
]);

const transport = new StdioServerTransport();
await server.connect(transport);

// printActivateTools(tools);
