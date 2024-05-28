<script lang="ts">
  import type { Image } from "../state";

  export let asset: Image;
  export let selected: boolean;
</script>

<button
  on:click
  class={`border border-neutral-800 p-2 m-2 transition rounded-md${selected ? " bg-neutral-800 shadow-lg" : ""}`}
>
  <img src={asset.assetUrl} alt={asset.fileName} class="w-full aspect-square object-contain rounded-md" />
  <p class="text-sm text-neutral-400">{asset.fileName}</p>
</button>
