<script lang="ts">
  import { createDesktopStore } from '@owdproject/svelte'
  import DesktopWindow from './DesktopWindow.svelte'

  const top = 64
  const workarea = () => ({ x: 0, y: top, width: innerWidth, height: Math.max(0, innerHeight - top) })
  const store = createDesktopStore({ workarea: workarea() })
  let launcher: HTMLButtonElement

  function openAbout() {
    if (store.desktop.windows.get('about')) {
      store.desktop.windows.focusWindow('about')
      return
    }
    const width = Math.min(420, innerWidth - 32)
    const x = Math.max(16, innerWidth - width - Math.max(16, innerWidth * 0.07))
    const y = Math.max(top + 24, Math.min(innerHeight * 0.49, innerHeight - 251))
    store.desktop.windows.createWindow({
      id: 'about',
      model: 'about',
      config: {
        title: 'About',
        size: { width, height: 235, minWidth: 240, minHeight: 175 },
        position: { x: Math.round(x), y: Math.round(y) },
        resizable: true,
      },
    })
  }

  function closeAbout() {
    store.desktop.windows.closeWindow('about')
    launcher.focus()
  }
</script>

<svelte:window onresize={() => store.desktop.workspaces.setWorkarea(workarea())} />

<header>
  <a href="https://owdproject.org">Open Web Desktop</a>
  <button type="button" bind:this={launcher} onclick={openAbout}>Open About</button>
</header>
<main aria-labelledby="workspace-title">
  <p>Svelte experiment · Open Web Desktop</p>
  <h1 id="workspace-title">Svelte Desktop</h1>
  <p>A small workspace built with Svelte and OWD stores.</p>
  {#each $store.windows as instance (instance.id)}
    <DesktopWindow {instance} desktop={store.desktop} close={closeAbout} />
  {/each}
</main>
