import { message } from "@tauri-apps/api/dialog";
import { readDir } from "@tauri-apps/api/fs";

export async function validateProject(dir: string) {
  if (dir.split("/").pop() === "game") {
    message('Please select the directory above the "game" directory', {
      type: "error",
    });
    return { success: false };
  }

  const dirContents = await readDir(dir as string);
  if (!dirContents.some((file) => file.name === "game")) {
    message(
      "This directory doesn't seem to be a valid Ren'Py project directory because it lacks a \"game\" subfolder.",
      {
        type: "error",
      },
    );
    return { success: false };
  }

  return { success: true, dirContents };
}
