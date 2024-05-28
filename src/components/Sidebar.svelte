<script>
  import { slide } from "svelte/transition";
  import { sidebar } from "../state";
</script>

{#if $sidebar}
  <div transition:slide={{ axis: "x" }} class="w-[30rem] border-l border-neutral-800 py-2 px-4 text-lg">
    <slot />
  </div>
{/if}
