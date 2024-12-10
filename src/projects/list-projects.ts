import { api } from "../utils/axios.ts";
import { axiosResponseToToolResult } from "../mcp-utils/tools.ts";

export function listProjects() {
  return axiosResponseToToolResult(api.get(`/projects`));
}
