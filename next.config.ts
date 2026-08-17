import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next 16 narrowed the default to [75]; the portfolio photography is
    // displayed large and upscaled, so it is served at 90 instead.
    qualities: [75, 90],
  },
};

export default nextConfig;
