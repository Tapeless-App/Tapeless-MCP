import { z } from "npm:zod";
import { defineTool, Tool } from "../mcp-utils/tools.ts";
import { syncProjects } from "./git-sync.ts";

const syncTools: Tool<any>[] = [];

syncTools.push(
  defineTool({
    name: "sync_projects",
    description: "Sync your local git commits to Tapeless to track your time",
    schema: z.object({}),
    handler: syncProjects,
  })
);

export { syncTools };
