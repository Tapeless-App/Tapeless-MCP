import { exec } from "node:child_process";
import { promisify } from "node:util";

const execAsync = promisify(exec);

// This relies on the local file system, so can only be run locally via the CLI

export async function syncProjects() {
  const result = await execAsync("tapeless sync -a");

  return {
    toolResult: result.stdout,
    isError: result.stderr.length > 0,
    error: result.stderr,
  };
}
