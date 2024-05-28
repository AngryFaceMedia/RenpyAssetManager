<script lang="ts">
  import { Check, Folder, ImageSquare, Trash } from "phosphor-svelte";
  import ImageCard from "../components/ImageCard.svelte";
  import { projectContents, type Image } from "../state";
  import { fade } from "svelte/transition";
  import { onMount } from "svelte";
  import SidebarItem from "../components/SidebarItem.svelte";
  import Sidebar from "../components/Sidebar.svelte";

  let rows = 6;

  let sidebarItemView = false;
  let selectedAsset: null | Image = null;

  let checkedTags: string[] = [];
  let checkedAttributes: string[] = [];
  let shownAttributes: string[] = [];

  let usedTags: string[] = [];
  let usedAttributes: string[] = [];
  let filteredImages = $projectContents?.images ?? [];

  function updateData() {
    usedTags = checkedTags.length > 0 ? checkedTags : $projectContents?.tags.map((tag) => tag.name) ?? [];
    shownAttributes = [];
    $projectContents?.tags.forEach((tag) => {
      if (usedTags.includes(tag.name)) {
        tag.associatedAttributes.forEach((attr) => {
          if (!shownAttributes.includes(attr)) {
            shownAttributes.push(attr);
          }
        });
      }
    });
    usedAttributes = checkedAttributes.length > 0 ? checkedAttributes : $projectContents?.attributes ?? [];
    checkedAttributes.forEach((attr) => {
      if (!shownAttributes.includes(attr)) {
        // remove from checked attributes
        checkedAttributes = checkedAttributes.filter((a) => a !== attr);
      }
    });

    filteredImages =
      $projectContents?.images.filter((image) => {
        let hasTag = false;
        let hasAttribute = false;
        if (usedTags.includes(image.tag)) {
          hasTag = true;
        }
        image.attributes.forEach((attr) => {
          if (usedAttributes.includes(attr)) {
            hasAttribute = true;
          }
        });
        return hasTag && hasAttribute;
      }) ?? [];
  }

  function updateRows(event: Event) {
    rows = parseInt((event.target as HTMLInputElement).value);
  }

  onMount(() => {
    updateData();
  });
</script>

<div class="flex flex-col h-full flex-grow overflow-hidden">
  <div class="flex-grow flex overflow-hidden">
    <div class="w-full overflow-y-auto p-4">
      <div class="grid" style={`grid-template-columns: repeat(${rows.toString()}, minmax(0, 1fr));`}>
        {#each filteredImages ?? [] as asset}
          <ImageCard
            on:click={(e) => {
              selectedAsset = asset;
              sidebarItemView = true;
            }}
            {asset}
            selected={selectedAsset === asset}
          />
        {/each}
      </div>
    </div>
    <Sidebar>
      <div class="flex rounded-md overflow-hidden border border-neutral-800 mb-4">
        <button
          on:click={() => (sidebarItemView = false)}
          class={`w-full py-1 text-center${!sidebarItemView ? " bg-neutral-800" : ""}`}>Filters</button
        >
        <button
          on:click={() => (sidebarItemView = true)}
          class={`w-full py-1 text-center${sidebarItemView ? " bg-neutral-800" : ""}`}>Selected</button
        >
      </div>

      {#if sidebarItemView}
        {#if selectedAsset}
          <img src={selectedAsset.assetUrl} alt={selectedAsset.fileName} class="w-full rounded-md" />
          <h1 class="text-2xl font-bold">{selectedAsset.tag}</h1>
          <h2 class="text-lg text-white/75">{selectedAsset.attributes.join(" ")}</h2>
          <div class="flex flex-col space-y-4 mt-4">
            <SidebarItem heading="File Name">
              <input
                class="w-full bg-transparent rounded-md border border-neutral-800 py-0.5 px-3"
                type="text"
                readonly
                value={selectedAsset.fileName}
              />
            </SidebarItem>
            <SidebarItem heading="Path">
              <input
                class="w-full bg-transparent rounded-md border border-neutral-800 py-0.5 px-3"
                type="text"
                readonly
                value={selectedAsset.path}
              />
            </SidebarItem>
            <SidebarItem heading="Actions">
              <div class="flex flex-col space-y-2">
                <button
                  class="w-full bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 transition rounded-md py-1 px-4 flex items-center justify-center space-x-2"
                >
                  <ImageSquare size={20} weight="fill" />
                  <span>Open</span>
                </button>
                <button
                  class="w-full bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 transition rounded-md py-1 px-4 flex items-center justify-center space-x-2"
                >
                  <Folder size={20} weight="fill" />
                  <span>Open Folder</span>
                </button>
                <button
                  class="w-full bg-red-500 hover:bg-red-600 transition rounded-md py-1 px-4 flex items-center justify-center space-x-2"
                >
                  <Trash size={20} weight="fill" />
                  <span>Delete</span>
                </button>
              </div>
            </SidebarItem>
          </div>
        {:else}
          <p class="text-center text-white/75">No item selected!</p>
        {/if}
      {:else}
        <div class="flex flex-col space-y-4">
          <SidebarItem heading="Grid Size">
            <div class="flex items-center">
              <input class="w-full" type="range" min="1" max="20" value={rows} on:input={updateRows} />
              <span class="w-8 text-right">{rows}</span>
            </div>
          </SidebarItem>

          <SidebarItem heading="Types">
            <p>Currently, only images are supported.</p>
          </SidebarItem>

          <SidebarItem heading="Tags">
            {#if ($projectContents?.tags.length ?? []) === 0}
              <p>No tags found</p>
            {:else}
              <div class="flex flex-col space-y-0.5">
                {#each $projectContents?.tags ?? [] as tag}
                  <div class="flex items-center">
                    <button
                      class={`h-6 w-6 rounded-md flex items-center justify-center transition ${checkedTags.includes(tag.name) ? "bg-rose-500" : "bg-neutral-800"}`}
                      on:click={() => {
                        if (checkedTags.includes(tag.name)) {
                          checkedTags = checkedTags.filter((t) => t !== tag.name);
                        } else {
                          checkedTags = [...checkedTags, tag.name];
                        }
                        updateData();
                      }}
                    >
                      {#if checkedTags.includes(tag.name)}
                        <span transition:fade={{ duration: 150 }}>
                          <Check size={20} weight="bold" />
                        </span>
                      {/if}
                    </button>
                    <span class="ml-2">{tag.name}</span>
                  </div>
                {/each}
              </div>
            {/if}
          </SidebarItem>
          <SidebarItem heading="Attributes">
            {#each shownAttributes as attr}
              <div class="flex items-center">
                <button
                  class={`h-6 w-6 rounded-md flex items-center justify-center transition ${checkedAttributes.includes(attr) ? "bg-rose-500" : "bg-neutral-800"}`}
                  on:click={() => {
                    if (checkedAttributes.includes(attr)) {
                      checkedAttributes = checkedAttributes.filter((a) => a !== attr);
                    } else {
                      checkedAttributes = [...checkedAttributes, attr];
                    }
                    updateData();
                  }}
                >
                  {#if checkedAttributes.includes(attr)}
                    <span transition:fade={{ duration: 150 }}>
                      <Check size={20} weight="bold" />
                    </span>
                  {/if}
                </button>
                <span class="ml-2">{attr}</span>
              </div>
            {/each}
          </SidebarItem>
        </div>
      {/if}
    </Sidebar>
  </div>
  {#if false}
    <div class="border-t border-neutral-800 py-2 px-4">music player</div>
  {/if}
</div>
