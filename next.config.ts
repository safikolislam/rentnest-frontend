import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  images: {
    remotePatterns: [
      { protocol: "http", hostname: "**" },
      { protocol: "https", hostname: "**" },
    ],
  },
 
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://rentnest-backend-chi.vercel.app/api/:path*",
      },
    ];
  },
};

export default nextConfig;
