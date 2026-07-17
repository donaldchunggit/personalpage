import type { NextConfig } from "next";
import { BASE_PATH } from "./base-path";

const nextConfig: NextConfig = {
  /* GitHub Pages serves static files only — it runs no Next.js server — so the
     build emits a plain HTML/CSS/JS tree into out/ instead of a server bundle. */
  output: "export",

  basePath: BASE_PATH,

  /* next/image's default loader optimizes on demand from a server Pages doesn't
     run. Serve the files as authored instead. */
  images: { unoptimized: true },

  /* Emit /about/index.html rather than /about.html, so Pages resolves a bare
     directory URL without the trailing-slash redirect it can't perform. */
  trailingSlash: true,
};

export default nextConfig;
