<div align="center">

# Ren'Py Asset Manager

<img src="./.branding/logo.png" height="50px" alt="Logo">

This is a tool to easily manage assets in Ren'Py projects.

</div>

## Features

- **Asset Viewer:** View all assets in your project through a grid view. Filter by tags or attributes. This lets you e.g. easily see all sprites for a specific character, or all sprites for a specific mood.
- **Naming Tool**: _(soon)_ Easily rename large quantities of assets through an excel-like interface, keyboard-only navigation, and previews, so you know what to name which asset.
- **Scripts:** _(soon)_ Easily run sh, bat, Python, or NodeJS scripts in your project to automate tasks. This can be used to e.g. convert all images to a different format, organize all images by their tag, programmatically generate variants of assets, etc.
  - **Script Marketplace:** _(soon)_ Install various pre-made scripts into your project.

## Current State

The project is currently in a very very early state and is nothing more than a proof of concept.

The current todo list is as follows:

- [x] Fix various issues rendering the app unusable when using an actual build as opposed to the development mode
- [ ] Store recently opened projects
- [ ] Automatically open the last opened project on startup
- [x] Asset Viewer
  - [ ] Clean up code
  - [ ] Turn more things into reusable components
  - [ ] Make action buttons usable
  - [ ] Add copy button to file name & path
  - [ ] Add support for audio
  - [ ] Add support for movies
- [ ] Naming Tool
- [ ] Scripts
  - [ ] Scripts Marketplace
- [ ] Make sidebar resizable

If this list is complete, Ren'Py Asset Manager will fully release in version 1.0.0.

## Installation

### Prebuilt Binaries

Currently, there are no prebuilt binaries available. You can build the project yourself by following the instructions below.

### Building from Source

Before you start, please ensure you have the following installed:

- NodeJS
- Rust
- pnpm (install with `npm i -g pnpm`)

1. Clone the repository
2. Run `pnpm install` in the root directory
3. Run `pnpm tauri build` in the root directory

## Contributing

For now, before contributing, please open an issue to discuss what you want to change.

### Development

To get a local development build running, please follow these steps:

1. Fork the repository and clone it
2. Run `pnpm install` in the root directory
3. Run `pnpm tauri dev` in the root directory
