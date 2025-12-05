import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ykietuljwfgtxwgfqhiv.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/cabin-images/**",
      },
    ],
    qualities: [25, 50, 75, 85, 100],
  },
  // output: "export",
};

export default nextConfig;
