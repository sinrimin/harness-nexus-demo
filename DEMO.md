# harness-nexus-demo — the public demo overlay

This repo runs **<https://demo.harness-nexus.com>**. It is a mirror of
[sinrimin/harness-nexus](https://github.com/sinrimin/harness-nexus) whose
`main` tracks upstream; everything the demo changes lives on the **`demo`**
branch, and [demo-images.yml](.github/workflows/demo-images.yml) builds it
into `ghcr.io/sinrimin/harness-nexus-demo-{server,web}`.

The overlay is deliberately tiny — to see exactly what differs from upstream,
compare the branches: `main...demo` (or on GitHub, compare `main` … `demo`).

## What the overlay does

- **`DEMO_MODE=true`** (server env) — `packages/server/src/demo-seed.ts`
  claims the admin seat at boot with one **disabled** account, so no
  registrant can ever bootstrap into admin; everyone registers as a plain
  user.
- **`STORAGE_DRIVER=memory`** — nothing is written to disk. A daily restart
  wipes every trace (accounts, tokens, resources, credentials).
- **The web build bakes `VITE_DEMO_MODE=1`** plus this repo's URL and the
  exact commit SHA — `apps/web/src/components/demo-banner.tsx` renders the
  first-visit notice and the always-on strip, and every link leads back to
  the commit the site is running.

## Staying current

```bash
git fetch upstream
git checkout main && git merge --ff-only upstream/main && git push origin main
git checkout demo && git merge main && git push origin demo   # CI rebuilds
```
