# Svelte Desktop

An experimental Open Web Desktop host using Svelte 5 and Vite. Open About to try a store driven window with drag, resize and close interactions.

```sh
cd template
pnpm install
pnpm dev
```

Use `pnpm build` for static output. The starter uses the published core and a local source snapshot of the [Svelte adapter](https://github.com/owdproject/svelte/tree/ae7ec528d55945baba6c4ec62ab2a79e78c05980). The snapshot keeps installation independent of the upstream Git package build. Replace it with a registry dependency when the adapter is released.

The `template/` folder is self-contained. This experiment runs with project scripts. It has no control panel integration yet.
