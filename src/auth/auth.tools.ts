import { defineTool, Tool } from "../mcp-utils/tools.ts";
import { z } from "npm:zod";
import { login } from "./login.ts";

const authTools: Tool<any>[] = [];

authTools.push(
  defineTool({
    name: "tapeless_login",
    description: "Login to Tapeless - continue via browser",
    schema: z.object({}),
    handler: login,
  })
);

export { authTools };
