<script lang="ts">
  import { onMount } from "svelte";
  import { openProject } from "../lib/openProject";
  import { currentProject } from "../state";
  import { getTauriVersion, getVersion } from "@tauri-apps/api/app";

  let version = "???";
  let tauriVersion = "???";

  onMount(async () => {
    version = await getVersion();
    tauriVersion = await getTauriVersion();
  });
</script>

<div class="flex flex-col items-center justify-center py-16 flex-grow">
  <h1 class="text-3xl font-bold">Ren'Py Asset Manager</h1>
  <p>by AngryFace - Version {version} (tauri-{tauriVersion})</p>

  <div class="flex flex-col items-center mt-8 text-lg w-full">
    {#if $currentProject}
      <p>Current Project: {$currentProject.name}</p>
    {:else}
      <p>No project opened at the moment</p>
    {/if}
    <div class="flex w-full mt-6">
      <div class="w-full flex justify-end pr-4 border-r border-neutral-800">
        <p class="uppercase font-bold text-base text-white/50">Recent Projects</p>
      </div>
      <div class="w-full flex justify-start pl-4">
        <div class="flex flex-col items-start">
          <p class="uppercase font-bold text-base text-white/50">Actions</p>
          <button on:click={openProject} class="text-white/75 hover:text-white transition">Open Project</button>
          <button class="text-white/75 hover:text-white transition">Close Project</button>
          <button class="text-white/75 hover:text-white transition">Manual</button>
        </div>
      </div>
    </div>
  </div>
</div>
