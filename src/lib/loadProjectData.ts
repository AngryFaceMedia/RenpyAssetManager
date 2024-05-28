import { readDir, type FileEntry } from "@tauri-apps/api/fs";
import { currentProject, loadingProjectContents, projectContents, type ProjectContentsState, type Tag } from "../state";
import { join } from "@tauri-apps/api/path";
import { convertFileSrc } from "@tauri-apps/api/tauri";

export async function loadProjectData(dir: string) {
  loadingProjectContents.set(true);
  const newProjectContents: ProjectContentsState = {
    images: [],
    tags: [],
    attributes: [],
  };

  const imagesPath = await join(dir, "game", "images");

  const files = await readDir(imagesPath, {
    recursive: true,
  });
  const flattenedFiles = flattenFileTree(files);

  flattenedFiles.forEach((file) => {
    if (!file.name?.match(/^.*\.(jpg|jpeg|png|webp|avif)$/i)) return;

    const nameArray = file.name.toLowerCase().split(".")[0].split(" ");

    if (nameArray.length === 0) return;

    // tag is the first item in the name array, attributes are the rest
    const tag = nameArray.shift();
    const attributes = nameArray;

    if (!tag) return;

    const assetUrl = convertFileSrc(file.path);

    newProjectContents.images.push({
      fileName: file.name,
      tag,
      attributes: attributes || [],
      path: file.path,
      assetUrl,
    });

    // Push tag to the tags array if it doesn't already exist
    if (!newProjectContents.tags.some((t) => t.name === tag)) {
      newProjectContents.tags.push({
        name: tag,
        associatedAttributes: attributes,
      });
    } else {
      // If the tag already exists, push attributes to the associatedAttributes array if they don't already exist
      const foundTag = newProjectContents.tags.find((t) => t.name === tag);
      if (!foundTag) return;

      attributes.forEach((attribute) => {
        if (!foundTag.associatedAttributes.includes(attribute)) {
          foundTag.associatedAttributes.push(attribute);
        }
      });
    }

    // Push attributes to the attributes array if they don't already exist
    attributes.forEach((attribute) => {
      if (!newProjectContents.attributes.includes(attribute)) {
        newProjectContents.attributes.push(attribute);
      }
    });
  });

  // Delay finishing by 0.5s so that the user doesn't think nothing happened
  // when loading is extremely fast (which is usually is)
  setTimeout(() => {
    projectContents.set(newProjectContents);
    loadingProjectContents.set(false);
  }, 500);
}

function flattenFileTree(fileTree: FileEntry[]) {
  const flattened: FileEntry[] = [];

  // Flatteh recursively
  function flatten(tree: FileEntry[]) {
    for (const item of tree) {
      flattened.push(item);
      if (item.children) {
        flatten(item.children);
      }
    }
  }

  flatten(fileTree);

  return flattened;
}
