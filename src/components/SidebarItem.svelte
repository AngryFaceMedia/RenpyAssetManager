<script lang="ts">
  export let heading: string;
</script>

<div>
  <p class="text-base uppercase text-white/50 font-bold">{heading}</p>
  <slot />
</div>
