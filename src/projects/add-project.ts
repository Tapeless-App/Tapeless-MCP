import { api } from "../utils/axios.ts";
import { axiosResponseToToolResult } from "../mcp-utils/tools.ts";

type Params = {
  projectStart: string;
  projectEnd?: string;
  name: string;
};

export const addProject = (params: Params) => {
  return axiosResponseToToolResult(api.post(`/projects`, params));
};
