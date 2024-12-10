import { exec } from "node:child_process";
import { getToken } from "../utils/auth.ts";
import { updateAxiosToken } from "../utils/axios.ts";

// This relies on the local file system, so can only be run locally via the CLI

export const login = async () => {
  const token = await getToken();
  if (token) {
    updateAxiosToken(token);
    return {
      toolResult: "You are already logged in",
    };
  }

  // Execute `tapeless login` in the console
  exec("tapeless login", (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing tapeless login: ${error.message}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  });

  return {
    toolResult:
      "Login in progress - please use browser to complete the process",
  };
};
