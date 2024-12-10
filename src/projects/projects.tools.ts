import { z } from "npm:zod";
import { defineTool, Tool } from "../mcp-utils/tools.ts";
import { listProjects } from "./list-projects.ts";
import { addProject } from "./add-project.ts";
import { deleteProject } from "./delete-project.ts";

const projectsTools: Tool<any>[] = [];

projectsTools.push(
  defineTool({
    name: "list_projects",
    description: "List all your freelancing projects on Tapeless",
    schema: z.object({}),
    handler: listProjects,
  }),
  defineTool({
    name: "add_project",
    description:
      "Add a new project to your freelancing projects on Tapeless. Dates are in YYYY-MM-DD Format.",
    schema: z.object({
      projectStart: z.string(),
      projectEnd: z.string().optional(),
      name: z.string(),
    }),
    handler: addProject,
  }),
  defineTool({
    name: "delete_project",
    description:
      "Delete a project from your freelancing projects on Tapeless - the project id can be acquired when listing projects",
    schema: z.object({
      projectId: z.string(),
    }),
    handler: deleteProject,
  })
);

export { projectsTools };
