import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
