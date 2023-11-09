import { readdir } from "node:fs/promises";
import { join } from "node:path";

export async function getFiles(directoryPath: string) {
  try {
    const fileNames = await readdir(directoryPath);
    const filePaths = fileNames.map((fn) => join(directoryPath, fn));
    return filePaths;
  } catch (err) {
    console.error(err);
  }
}