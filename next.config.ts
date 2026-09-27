import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Remote placeholder image sources. Trim/replace these once the NGO's
    // real photo library and official mascot artwork are available.
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
      { protocol: "https", hostname: "picsum.photos", pathname: "/**" },
      { protocol: "https", hostname: "fastly.picsum.photos", pathname: "/**" },
    ],
  },
};

export default nextConfig;
