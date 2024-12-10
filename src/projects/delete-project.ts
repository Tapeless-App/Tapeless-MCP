import { api } from "../utils/axios.ts";
import { axiosResponseToToolResult } from "../mcp-utils/tools.ts";

type Params = {
  projectId: string;
};

export const deleteProject = (params: Params) => {
  return axiosResponseToToolResult(api.delete(`/projects/${params.projectId}`));
};
