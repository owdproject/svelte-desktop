<script lang="ts">
  import { createDesktopPointer, createWindowStore, type Desktop, type WindowInstance } from '@owdproject/svelte'
  import { onMount } from 'svelte'

  let { instance, desktop, close }: {
    instance: WindowInstance
    desktop: Desktop
    close: () => void
  } = $props()

  const windowStore = $derived(createWindowStore(instance))
  const pointer = $derived(createDesktopPointer(instance, desktop))
  let closeButton: HTMLButtonElement

  onMount(() => closeButton.focus())
</script>

<section
  class="desktop-window"
  aria-label="About Svelte Desktop"
  style:left={`${$windowStore.position?.x ?? 0}px`}
  style:top={`${$windowStore.position?.y ?? 0}px`}
  style:width={`${$windowStore.size?.width ?? 420}px`}
  style:height={`${$windowStore.size?.height ?? 235}px`}
>
  <div class="titlebar">
    <span role="presentation" data-owd-drag-handle onpointerdown={pointer.onTitlebarPointerDown}>About</span>
    <button type="button" aria-label="Close About" bind:this={closeButton} onclick={close}>×</button>
  </div>
  <div class="window-content">
    <h2>A desktop in Svelte</h2>
    <p>This window reads OWD state through a Svelte store. The runtime handles its geometry and pointer interactions.</p>
  </div>
  <span class="resize-handle" role="presentation" onpointerdown={(event) => pointer.onResizePointerDown(event, 'se')}></span>
</section>
