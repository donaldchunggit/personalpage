/* GitHub Pages serves this repo as a project page at
   donaldchunggit.github.io/personalpage, so every route and asset sits under a
   sub-path rather than the domain root.

   next/link and the router prefix themselves from next.config's basePath, but
   next/image `src`, plain <a href>, and metadata icons do not — those read this
   constant directly. Both the build config and the app import it so the prefix
   is stated once; a repo rename only has to change this line. */
export const BASE_PATH = "/personalpage";

export const SITE = `https://donaldchunggit.github.io${BASE_PATH}`;
