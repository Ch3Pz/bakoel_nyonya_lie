import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The catalogue is deliberately static so it can be deployed directly to Netlify.
  output: "export",
  trailingSlash: true,
};

export default nextConfig;
