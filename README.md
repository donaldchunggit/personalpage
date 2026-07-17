# personalpage

Personal site — live at <https://www.donaldchung.dev>.

Next.js app, deployed on Vercel. The site used to be a hand-written
`index.html` served straight from this repo root; that's gone.

## Local

```bash
npm install
npm run dev      # http://localhost:3000
```

Content lives in `app/data.ts` — builds, roles, education. The "eight builds,
seven deployed" tally on the page is counted from that array, so adding a build
updates the prose automatically.

## Deploy

Push to `main`. Vercel builds and deploys automatically.

The app deliberately sits at the repo root rather than in a subdirectory.
Vercel's Next.js builder looks for `package.json` in the project's Root
Directory setting, which is unset here — so a nested app silently deploys as
static files with no build, and every route 404s. `vercel.json` cannot override
Root Directory. Keeping the app at the root means Vercel finds it with no
dashboard configuration, and `vercel.json` pins the framework so detection
never depends on a stored project setting.

`www` is canonical; the apex 307s to it. `SITE` in `app/layout.tsx` feeds
`metadataBase`, so canonical URLs and og:image resolve from it — point it at the
apex and every one becomes a redirect hop.
