import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* This allows the build to succeed even if there are type errors */
  typescript: {
    ignoreBuildErrors: true,
  },
  /* This ignores linting errors */
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;