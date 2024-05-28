<script>
  import { currentProject } from "../state";

  const defaultConfig = {
    projectName: "",
    targetImageFormat: "webp",
    targetAudioFormat: "ogg",
  };

  function selectProject() {}
</script>

<div class="p-4 text-lg">
  {#if $currentProject}
    Editing Configuration of Project: {$currentProject}
  {:else}
    No project opened at the moment. Click the button below to select a project in which you want to edit or create a
    configuration files.<br />
    <button class="bg-rose-500 hover:bg-rose-600 transition rounded-md py-1 px-4 mt-2">Select Project</button>
  {/if}
</div>
