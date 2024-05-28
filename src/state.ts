import { writable } from "svelte/store";

type ProjectState = {
  path: string;
  name: string;
};

export type ProjectContentsState = {
  images: Image[];
  tags: Tag[];
  attributes: string[];
};

export type Image = {
  fileName: string;
  path: string;
  tag: string;
  attributes: string[];
  assetUrl: string;
};

export type Tag = {
  name: string;
  associatedAttributes: string[];
};

export const activePage = writable<string>("home");
export const currentProject = writable<ProjectState | null>(null);
export const projectContents = writable<ProjectContentsState | null>(null);
export const loadingProjectContents = writable<boolean>(false);
export const sidebar = writable<boolean>(true);
