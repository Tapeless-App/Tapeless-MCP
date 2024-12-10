import { z } from "npm:zod";
import {
  ListToolsRequestSchema,
  CallToolRequestSchema,
} from "npm:@modelcontextprotocol/sdk/types.js";
import { zodToJsonSchema } from "npm:zod-to-json-schema";
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { AxiosResponse } from "npm:axios";

export type ToolResult = {
  toolResult: any;
  isError?: boolean;
  error?: string | null;
};

export type Tool<T extends z.ZodSchema> = {
  name: string;
  description: string;
  schema: T;
  handler: (params: z.infer<T>) => Promise<ToolResult>;
};

export function defineTool<T extends z.ZodSchema>(tool: {
  name: string;
  description: string;
  schema: T;
  handler: (params: z.infer<T>) => Promise<ToolResult>;
}): Tool<T> {
  return tool;
}

export function activateTools(server: Server, tools: Tool<any>[]) {
  server.setRequestHandler(ListToolsRequestSchema, () => ({
    tools: tools.map((tool) => {
      return {
        name: tool.name,
        description: tool.description,
        inputSchema: zodToJsonSchema(tool.schema),
      };
    }),
  }));

  server.setRequestHandler(CallToolRequestSchema, (request: any) => {
    const tool = tools.find((tool) => tool.name === request.params.name);
    if (!tool) {
      throw new Error("Tool not found");
    }
    const params = tool.schema.parse(request.params.arguments);
    return tool.handler(params);
  });
}

export function printActivateTools(tools: Tool<any>[]) {
  const list = tools.map((tool) => {
    return {
      name: tool.name,
      description: tool.description,
      inputSchema: zodToJsonSchema(tool.schema),
    };
  });

  console.log(JSON.stringify(list, null, 2));
}

export async function axiosResponseToToolResult(
  request: Promise<AxiosResponse>
) {
  try {
    const response = await request;
    return {
      toolResult: response.data,
      isError: false,
      error: null,
    };
  } catch (error) {
    return {
      toolResult: null,
      isError: true,
      error: error.message,
    };
  }
}
