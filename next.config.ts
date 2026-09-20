import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Next 16 blocks cross-origin dev resources by default, which silently kills
  // the HMR socket and leaves the page un-hydrated when opened on 127.0.0.1.
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  // Static export: the whole site compiles to plain files in out/, so it can be
  // served by Netlify (or any CDN) with no Node runtime.
  output: "export",
  trailingSlash: true,
  images: {
    // next/image optimisation needs a server; on a static export we ship the
    // originals and control size with explicit width/height + sizes.
    unoptimized: true,
  },
};

export default nextConfig;
