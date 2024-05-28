import { message, open } from "@tauri-apps/api/dialog";
import { readDir } from "@tauri-apps/api/fs";
import { validateProject } from "./validateProject";
import { currentProject } from "../state";
import { loadProjectData } from "./loadProjectData";

export async function openProject() {
  const dir = (await open({
    directory: true,
    multiple: false,
    recursive: true,
    title: "Open a Ren'Py project directory",
  })) as string;

  const validation = await validateProject(dir);

  if (!validation.success) return;
  const dirContents = validation.dirContents;

  /*
  if (!dirContents.some((file) => file.name === "assetmanager.json"))
    return message(
      "This project seems to be lacking a Ren'Py Asset Manager configuration file. Please set one up using the Configuration Assistant on the Home Page.",
      {
        type: "error",
      },
    );
  */
  currentProject.set({
    path: dir,
    name: dir.split("/").pop() || "Untitled Project",
  });

  await loadProjectData(dir);
}
