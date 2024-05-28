<script lang="ts">
  import { ArrowClockwise, SquareHalf } from "phosphor-svelte";
  import Home from "../pages/Home.svelte";
  import AssetViewer from "../pages/AssetViewer.svelte";
  import { activePage, currentProject, loadingProjectContents, sidebar } from "../state";
  import { loadProjectData } from "$lib/loadProjectData";
  import NamingTool from "../pages/NamingTool.svelte";
  import Scripts from "../pages/Scripts.svelte";

  const pages = [
    { slug: "home", name: "Home", component: Home, shownAsTab: true, requiredProjectLoaded: false },
    { slug: "viewer", name: "Asset Viewer", component: AssetViewer, shownAsTab: true, requiredProjectLoaded: true },
    { slug: "naming", name: "Naming Tool", component: NamingTool, shownAsTab: true, requiredProjectLoaded: true },
    { slug: "scripts", name: "Scripts", component: Scripts, shownAsTab: true, requiredProjectLoaded: true },
  ];
</script>

<div class="bg-neutral-900 text-white h-screen flex flex-col select-none cursor-default">
  <div class="border-b border-neutral-800 flex py-2 px-4 justify-between items-center">
    <div class="flex space-x-2">
      {#each pages as page}
        {#if page.shownAsTab && (!page.requiredProjectLoaded || $currentProject)}
          <button
            on:click={() => activePage.set(page.slug)}
            data-active={page.slug === $activePage}
            class="px-5 text-xl py-2 rounded-md cursor-pointer hover:bg-white/5 data-[active='true']:bg-rose-500 transition"
          >
            {page.name}
          </button>
        {/if}
      {/each}
    </div>
    <div class="flex space-x-2 items-center">
      {#if $loadingProjectContents}
        <span>Reloading Project contents...</span>
      {/if}
      {#if $currentProject}
        <button
          on:click={loadProjectData($currentProject.path)}
          class="transition hover:bg-white/5 rounded-md h-10 w-10 flex items-center justify-center"
        >
          <span class={`inline-flex${$loadingProjectContents ? " animate-spin" : ""}`}>
            <ArrowClockwise size="1.5em" weight="bold" />
          </span>
        </button>
      {/if}
      {#if $activePage === "viewer"}
        <button
          on:click={() => sidebar.set(!$sidebar)}
          class={`transition rounded-md h-10 w-10 flex items-center justify-center ${$sidebar ? "bg-white/5 hover:bg-white/10" : "hover:bg-white/5"}`}
        >
          <SquareHalf size="1.5em" weight="fill" />
        </button>
      {/if}
    </div>
  </div>
  {#if pages.find((p) => p.slug === $activePage)?.component}
    <svelte:component this={pages.find((p) => p.slug === $activePage)?.component} />
  {/if}
</div>
